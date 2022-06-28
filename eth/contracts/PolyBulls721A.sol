// SPDX-License-Identifier: UNLICENSED 
pragma solidity ^0.8.13;

import 'erc721a-upgradeable/contracts/ERC721AUpgradeable.sol';
import 'erc721a-upgradeable/contracts/extensions/ERC721ABurnableUpgradeable.sol';
import 'erc721a-upgradeable/contracts/extensions/ERC721AQueryableUpgradeable.sol';
import '@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol';


contract PolyBulls is OwnableUpgradeable, ERC721AUpgradeable, ERC721AQueryableUpgradeable, ERC721ABurnableUpgradeable {
    // metadata URI
    string private _baseTokenURI;

    function initialize(string memory name_, string memory symbol_)
    initializerERC721A
    initializer
    public
    {
        __ERC721A_init(name_, symbol_);
        __ERC721ABurnable_init();
        __ERC721AQueryable_init();
        __Ownable_init();
    }

    function version()
    public 
    pure 
    returns (string memory)
    {
        return "1.0.0";
    }

    function sudoMint(address to, uint256 quantity)
    external
    payable
    onlyOwner 
    {
        _mint(to, quantity);
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
