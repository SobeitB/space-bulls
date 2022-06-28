// SPDX-License-Identifier: UNLICENSED 
pragma solidity ^0.8.13;

import 'erc721a-upgradeable/contracts/ERC721AUpgradeable.sol';
import 'erc721a-upgradeable/contracts/extensions/ERC721ABurnableUpgradeable.sol';
import 'erc721a-upgradeable/contracts/extensions/ERC721AQueryableUpgradeable.sol';
import "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";
import '@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol';

import "./interfaces/IAntimatter.sol";


contract SpaceBags is OwnableUpgradeable, ReentrancyGuardUpgradeable, ERC721AUpgradeable, ERC721AQueryableUpgradeable, ERC721ABurnableUpgradeable {
    // metadata URI
    string private _baseTokenURI;
    IAntimatter public tokenContract;
    mapping(uint256=>uint256) public bagsAmount;

    event Pack(address indexed staker, uint256 amount, uint256 tokenId);
    event Unpack(address indexed staker, uint256 amount, uint256 tokenId);

    function initialize(string memory name_, string memory symbol_)
    initializerERC721A
    initializer
    public
    {
        __ERC721A_init(name_, symbol_);
        __ERC721ABurnable_init();
        __ERC721AQueryable_init();
        __Ownable_init();
        __ReentrancyGuard_init();
    }

    function version()
    public 
    pure 
    returns (string memory)
    {
        return "1.0.0";
    }

    function sudoUpdateToken(address token_)
    public
    onlyOwner
    {
        require(token_ != address(0x0), "ERR_ADDRESS");
        tokenContract = IAntimatter(token_);
    }

    function pack(uint256 amount)
    public
    nonReentrant
    {
       address sender = _msgSender();
       require(tokenContract.transferFrom(sender, address(this), amount),
               "ERR_NOT_ENOUGH");
       uint256 tokenId = _nextTokenId();
       _mint(sender, 1);
       bagsAmount[tokenId] = amount;
       require(tokenClass(tokenId) != 0, "ERR_WRONG_AMOUNT");
    }

    function unpack(uint256 tokenId)
    public
    nonReentrant
    {
        address sender = _msgSender();
        require(ownerOf(tokenId) == sender, "ERR_WRONG_OWNER");
        uint256 amount = bagsAmount[tokenId];
        require(amount > 0, "ERR_NOT_FOUND");
        require(tokenContract.transfer(sender, amount), "ERR_NOT_ENOUGH");
        _burn(1);
        delete bagsAmount[tokenId];
    }

    function tokenClass(uint256 tokenId)
    view
    public
    returns (uint256)
    {
        uint256 amount = bagsAmount[tokenId];
        if(amount == 5000e18) {
            return 1;
        }
        if(amount == 2000e18) {
            return 2;
        }
        if(amount == 1000e18) {
            return 3;
        }
        return 0;
    }


    function _baseURI()
    internal
    view
    virtual
    override
    returns (string memory)
    {
        return _baseTokenURI;
    }

    /**
     * @dev See {IERC721Metadata-tokenURI}.
     */
    function tokenURI(uint256 tokenId) public view virtual override(ERC721AUpgradeable, IERC721AUpgradeable) returns (string memory) {
        if (!_exists(tokenId)) revert URIQueryForNonexistentToken();

        string memory baseURI = _baseURI();
        return bytes(baseURI).length != 0 ? string(abi.encodePacked(baseURI, _toString(tokenClass(tokenId)), ".json")) : '';
    }

    function setBaseURI(string calldata baseURI)
    external
    onlyOwner
    {
        _baseTokenURI = baseURI;
    }

    function _startTokenId()
    internal
    override
    view
    virtual
    returns (uint256)
    {
        return 1;
    }
  
    function numberMinted(address owner)
    public
    view
    returns (uint256)
    {
        return _numberMinted(owner);
    }

    function getOwnershipData(uint256 tokenId)
    external
    view
    returns (TokenOwnership memory)
    {
        return _ownershipOf(tokenId);
    }

    function totalMinted()
    public
    view
    returns (uint256)
    {
        return _totalMinted();
    }

    /**
     * @dev This empty reserved space is put in place to allow future versions to add new
     * variables without shifting down storage in the inheritance chain.
     * See https://docs.openzeppelin.com/contracts/4.x/upgradeable#storage_gaps
     */
    uint256[50] private __gap;
}
