// SPDX-License-Identifier: UNLICENSED 
pragma solidity ^0.8.13;

import "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import '@openzeppelin/contracts-upgradeable/access/AccessControlEnumerableUpgradeable.sol';
import '@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol';
import '@openzeppelin/contracts/token/ERC721/IERC721.sol';
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import '@openzeppelin/contracts/token/ERC20/IERC20.sol';

import "hardhat/console.sol";
import "./interfaces/IAntimatter.sol";
import "./library/AddressString.sol";


contract SpaceStaking is Initializable, ReentrancyGuardUpgradeable, OwnableUpgradeable, AccessControlEnumerableUpgradeable {
    mapping(address=>uint32) public stakedNftsCount;
    mapping(address=>uint256) public stakedEffectiveTime;
    mapping(address=>uint256[]) public stakedNftsEntries;
    mapping(uint256=>address) public stakedBy;
    uint256 public rewardPerDay;
    uint256 public rewardStartTime;
    address public signerAddress;
    IERC721 public nftContract;
    IAntimatter public tokenContract;

    event Stake(address indexed staker, uint256[] tokensIds);
    event Unstake(address indexed staker, uint256[] tokensIds);
    event Claim(address indexed staker, uint256 amount);


    function initialize()
    initializer
    public
    {
        __Ownable_init();
        __ReentrancyGuard_init();
        __AccessControlEnumerable_init();
        // deployer + self administration
        _setupRole(DEFAULT_ADMIN_ROLE, address(this));
        _setupRole(DEFAULT_ADMIN_ROLE, _msgSender());
        rewardStartTime = block.timestamp;
        rewardPerDay = 100e18; // 100 tokens per day (for twince tokens)
    }

    function version()
    public 
    pure 
    returns (string memory)
    {
        return "1.0.0";
    }

    function rewardPerSecond()
    view
    public
    returns (uint256)
    {
        return rewardPerDay / 86400;
    }

    function sudoUpdateSigner(address signer_)
    public
    onlyRole(DEFAULT_ADMIN_ROLE)
    {
        require(signer_ != address(0x0), "ERR_ADDRESS");
        signerAddress = address(signer_);
    }

    function sudoUpdateToken(address token_)
    public
    onlyRole(DEFAULT_ADMIN_ROLE)
    {
        require(token_ != address(0x0), "ERR_ADDRESS");
        tokenContract = IAntimatter(token_);
        require(tokenContract.balanceOf(address(this)) > 0,
                "should has positive balance");
    }

    function sudoUpdateNFT(address nft_)
    public
    onlyRole(DEFAULT_ADMIN_ROLE)
    {
        require(nft_ != address(0x0), "ERR_ADDRESS");
        nftContract = IERC721(nft_);
    }

    function stake(uint256[] memory tokenIds)
    public 
    {
        address sender = _msgSender();

        require(
            address(nftContract) != address(0x0) && address(tokenContract) != address(0x0),
            "ERR_SETUP"
        );
        require(
            nftContract.isApprovedForAll(sender, address(this)),
            "ERR_APPROVE"
        );
        uint32 length = uint32(tokenIds.length);
        require(length>0, "ERR_EMPTY");
        uint32 count = stakedNftsCount[sender];
        for(uint32 idx=0;idx<length;idx++) {
            uint256 tokenId = tokenIds[idx];
            nftContract.safeTransferFrom(sender, address(this), tokenId);
            count += 1;
            stakedNftsEntries[sender].push(tokenId);
            stakedBy[tokenId] = sender;
        }

        if (stakedEffectiveTime[sender] == 0) {
            stakedEffectiveTime[sender] = block.timestamp;
        } else {
            uint256 elapsedTime = block.timestamp - stakedEffectiveTime[sender];
            stakedEffectiveTime[sender] += elapsedTime * stakedNftsCount[sender] / count;
        }
        stakedNftsCount[sender] = count;

        emit Stake(sender, tokenIds);
    }

    function unstake(
        uint256[] memory tokenIds,
        uint256[] memory signedTokenIds,
        uint256 nonce,
        bytes memory signature
    )
    public
    nonReentrant 
    {
        address recipient = _msgSender();
        uint32 length = uint32(tokenIds.length);
        require(length > 0, "ERR_EMPTY");
        require(stakedNftsCount[recipient] >= length, "ERR_TOO_MUCH");

        _claim(recipient, signedTokenIds, nonce, signature);

        for(uint32 idx=0;idx<length;idx++) {
            uint256 tokenId = tokenIds[idx];
            nftContract.safeTransferFrom(address(this), recipient, tokenId);
            stakedNftsCount[recipient] -= 1;
            removeStakenNftEntries(recipient, tokenId);
            delete stakedBy[tokenId];
        }

        emit Unstake(recipient, tokenIds);
    }

    function removeStakenNftEntries(address staker, uint256 tokenId) internal {
        uint256[] storage stakedTokenIds = stakedNftsEntries[staker];
        uint32 length = uint32(stakedTokenIds.length);
        for(uint32 idx=0; idx<length;idx++) {
            if(stakedTokenIds[idx] == tokenId) {
                stakedTokenIds[idx] = stakedTokenIds[length - 1];
                stakedTokenIds.pop();
                return;
            }
        }
        revert("ERR_NOT_FOUND");
    }

    function claim(uint256[] memory signedTokenIds, uint256 nonce, bytes memory signature) 
    public
    nonReentrant
    {
        _claim(_msgSender(), signedTokenIds, nonce, signature);
    }

    function _claim(address sender, uint256[] memory signedTokenIds, uint256 nonce, bytes memory signature)
    internal
    {
        bytes memory data = abi.encodePacked(
            AddressString.toAsciiString(msg.sender),
            nonce,
            signedTokenIds
        );
        bytes32 hash = ECDSA.toEthSignedMessageHash(data);
        address signer = ECDSA.recover(hash, signature);
        require(signer == signerAddress, "ERR_WRONG_SIG");
        (uint256 amount, uint256 effectiveTime, ,) = claimable(sender, signedTokenIds);
        stakedEffectiveTime[sender] = effectiveTime;
        require(tokenContract.transfer(sender, amount), "ERR_CLAIM_FAIL");

        emit Claim(sender, amount);
    }

    function claimable(address sender, uint256[] memory signedTokenIds)
    view
    public
    returns(uint256 amount, uint256 effectiveTime, uint32 pairs, uint32 singles) 
    {
        require(address(tokenContract) != address(0x0), "ERR_SETUP");
        uint256 actualBalance = tokenContract.balanceOf(address(this));
        uint256 elapsedTime = (block.timestamp - stakedEffectiveTime[sender]);
        uint32 length = uint32(signedTokenIds.length);
        for(uint32 idx=0; idx < length; idx++) {
            uint256 signedTokenId = signedTokenIds[idx];
            require(stakedBy[signedTokenId] == sender, "ERR_NOT_STAKED");
            pairs+=1;
        }

        singles = stakedNftsCount[sender] - pairs;
        uint256 pairsAmount = elapsedTime * pairs * rewardPerSecond();
        uint256 singlesAmount = elapsedTime * singles * rewardPerSecond() / 2;
        amount = pairsAmount + singlesAmount;
        if(actualBalance < amount) {
            uint32 sharesPairs = uint32(pairsAmount / (amount / 10000));
            uint32 sharesSingles = uint32(singlesAmount / (amount / 10000));
            amount = actualBalance / 10000 * sharesSingles + actualBalance / 10000 * sharesPairs;
            effectiveTime = stakedEffectiveTime[sender] + elapsedTime / 10000 * (actualBalance / (amount / 10000));
        } else {
            effectiveTime = block.timestamp;
        }
    }

    function onERC721Received(
        address,
        address from,
        uint256,
        bytes calldata
    )
    external
    pure
    returns (bytes4)
    {
        require(from != address(0x0), "ERR_DIRECT_MINT");
        return IERC721Receiver.onERC721Received.selector;
    }

    /**
     * @dev This empty reserved space is put in place to allow future versions to add new
     * variables without shifting down storage in the inheritance chain.
     * See https://docs.openzeppelin.com/contracts/4.x/upgradeable#storage_gaps
     */
    uint256[50] private __gap;
}
