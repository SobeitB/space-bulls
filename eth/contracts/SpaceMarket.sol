// SPDX-License-Identifier: UNLICENSED 
pragma solidity ^0.8.13;

import "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";
import '@openzeppelin/contracts-upgradeable/access/AccessControlEnumerableUpgradeable.sol';
import '@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol';
import '@openzeppelin/contracts/token/ERC721/IERC721.sol';
import '@openzeppelin/contracts/token/ERC20/IERC20.sol';

import "./interfaces/IAntimatter.sol";


contract SpaceMarket is Initializable, ReentrancyGuardUpgradeable, OwnableUpgradeable, AccessControlEnumerableUpgradeable {
    enum ItemStatus {
        Open,
        Canceled,
        Error,
        Executed
    }
    struct ItemInfo {
        IERC721 nftContract;
        uint256 tokenId;
        uint256 price;
        address owner;
        address recipient;
        uint32 at;
        ItemStatus status;
    }
    mapping(uint256=>ItemInfo) public itemsInfo;
    uint256[] public itemsIds;
    uint256 public nextItemId;
    mapping(address=>uint256[]) public itemsBy;
    mapping(IERC721=>mapping(uint256=>uint256)) public nftTokensToItemId;
    IAntimatter public tokenContract;

    event Create(address indexed seller, address indexed nftContract, uint256 indexed tokenId, uint256 price);
    event Execute(address indexed buyer, address indexed nftContract, uint256 indexed tokenId, uint256 price);
    event Cancel(address indexed seller, address indexed nftContract, uint256 indexed tokenId, uint256 price);

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
        nextItemId = 1;
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
    onlyRole(DEFAULT_ADMIN_ROLE)
    {
        require(token_ != address(0x0), "ERR_ADDRESS");
        tokenContract = IAntimatter(token_);
    }

    function create(IERC721 nftContract, uint256 tokenId, address recipient, uint256 price)
    public
    nonReentrant
    returns (uint256 itemId)
    {
        address sender = _msgSender();

        require(address(nftContract) != address(0x0), "ERR_NFT");
        require(address(tokenContract) != address(0x0), "ERR_SETUP");
        require(
            nftContract.getApproved(tokenId) == address(this),
            "ERR_APPROVE"
        );
        require(
            nftTokensToItemId[nftContract][tokenId] == 0,
            "ERR_ALREADY_EXISTS"
        );

        ItemInfo memory item = ItemInfo({
            nftContract: nftContract,
            tokenId: tokenId,
            price: price,
            owner: sender,
            recipient: recipient,
            at: uint32(block.timestamp),
            status: ItemStatus.Open
        });
        itemId = nextItemId;

        itemsInfo[itemId] = item;
        itemsIds.push(itemId);
        itemsBy[sender].push(itemId);
        nftTokensToItemId[nftContract][tokenId] = itemId;
        nextItemId += 1;
        emit Create(item.owner, address(item.nftContract), item.tokenId, item.price); 
    }

    function execute(IERC721 nftContract, uint256 tokenId)
    public
    nonReentrant
    {
        address sender = _msgSender();

        require(address(nftContract) != address(0x0), "ERR_NFT");
        require(address(tokenContract) != address(0x0), "ERR_SETUP");
        require(
            nftContract.getApproved(tokenId) == address(this),
            "ERR_APPROVE"
        );
        uint256 itemId = nftTokensToItemId[nftContract][tokenId];
        ItemInfo memory itemInfo = itemsInfo[itemId];
        require(
            itemId != 0,
            "ERR_NOT_FOUND"
        );
        require(
            itemInfo.status == ItemStatus.Open,
            "ERR_NOT_OPEN"
        );

        require(
            tokenContract.transferFrom(sender, address(this), itemInfo.price),
            "ERR_NOT_ENOUGH"
        );
        tokenContract.transfer(itemInfo.recipient, itemInfo.price);

        itemInfo.nftContract.safeTransferFrom(itemInfo.owner, sender, itemInfo.tokenId);
        itemInfo.status = ItemStatus.Executed;
        itemsInfo[itemId] = itemInfo;
        delete nftTokensToItemId[nftContract][tokenId];

        emit Execute(sender, address(itemInfo.nftContract), itemInfo.tokenId, itemInfo.price); 
    }

    function cancel(IERC721 nftContract, uint256 tokenId)
    public 
    nonReentrant
    {
        address sender = _msgSender();

        require(address(nftContract) != address(0x0), "ERR_NFT");
        require(address(tokenContract) != address(0x0), "ERR_SETUP");
        require(
            nftContract.getApproved(tokenId) == address(this),
            "ERR_APPROVE"
        );
        uint256 itemId = nftTokensToItemId[nftContract][tokenId];
        ItemInfo memory itemInfo = itemsInfo[itemId];
        require(
            itemId != 0,
            "ERR_NOT_FOUND"
        );
        require(
            itemInfo.status == ItemStatus.Open,
            "ERR_NOT_OPEN"
        );
        require(
            itemInfo.owner == sender,
            "ERR_NOT_OWNER"
        );


        itemInfo.status = ItemStatus.Canceled;
        itemsInfo[itemId] = itemInfo;
        delete nftTokensToItemId[nftContract][tokenId];
        emit Cancel(itemInfo.owner, address(itemInfo.nftContract), itemInfo.tokenId, itemInfo.price); 
    }

    function _retrieve(uint256[] memory lookupItemsIds, uint256 offset, uint256 limit)
    internal 
    view
    returns( ItemInfo[] memory items, uint256 left)
    {
        if(offset + limit < lookupItemsIds.length) {
            limit = lookupItemsIds.length - offset;
        }
        items = new ItemInfo[](limit);
        for(uint256 idx=offset; idx <= offset + limit;idx++) {
            items[idx-offset] = itemsInfo[idx];
        }

        left = lookupItemsIds.length - offset - limit;
    }

    function retrieve(uint256 offset, uint256 limit)
    public 
    view
    returns( ItemInfo[] memory items, uint256 left)
    {
        (items, left) = _retrieve(itemsIds, offset, limit);
    }
    
    function retrieveBy(address owner, uint256 offset, uint256 limit)
    public 
    view
    returns( ItemInfo[] memory items, uint256 left)
    {
        uint256[] memory itemsIdsBy = itemsBy[owner];
        (items, left) = _retrieve(itemsIdsBy, offset, limit);
    }

    /**
     * @dev This empty reserved space is put in place to allow future versions to add new
     * variables without shifting down storage in the inheritance chain.
     * See https://docs.openzeppelin.com/contracts/4.x/upgradeable#storage_gaps
     */
    uint256[50] private __gap;
}
