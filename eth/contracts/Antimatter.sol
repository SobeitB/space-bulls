// SPDX-License-Identifier: UNLICENSED 
pragma solidity ^0.8.13;

import '@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol';
import '@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20PausableUpgradeable.sol';
import '@openzeppelin/contracts-upgradeable/access/AccessControlEnumerableUpgradeable.sol';
import '@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol';


contract Antimatter is Initializable, OwnableUpgradeable, AccessControlEnumerableUpgradeable, ERC20PausableUpgradeable {
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");
    bytes32 public constant TRANSFERER_ROLE = keccak256("TRANSFERER_ROLE");

    function initialize(
        string memory name_,
        string memory symbol_
    )
    initializer
    public
    {
        __ERC20_init(name_, symbol_);
        __Pausable_init();
        __Ownable_init();
        __AccessControlEnumerable_init();
        __ERC20Pausable_init();
        _pause();
        _setRoleAdmin(MINTER_ROLE, DEFAULT_ADMIN_ROLE);
        _setRoleAdmin(PAUSER_ROLE, DEFAULT_ADMIN_ROLE);
        _setRoleAdmin(TRANSFERER_ROLE, DEFAULT_ADMIN_ROLE);

        // deployer + self administration
        _setupRole(DEFAULT_ADMIN_ROLE, address(this));
        _setupRole(DEFAULT_ADMIN_ROLE, _msgSender());
        _setupRole(MINTER_ROLE, _msgSender());
        _setupRole(PAUSER_ROLE, _msgSender());
        _setupRole(TRANSFERER_ROLE, _msgSender());
    }

    /*
     * @dev Contract version
     */
    function version()
    public 
    pure 
    returns (string memory)
    {
        return "1.0.0";
    }

    /**
     * @dev See {ERC20-_beforeTokenTransfer}.
     *
     * Requirements:
     *
     * - the contract must not be paused.
     */
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 amount
    )
    internal 
    virtual 
    override 
    {
        if(hasRole(TRANSFERER_ROLE, from) || hasRole(TRANSFERER_ROLE, to)) {
            return;
        }

        require(!paused(), "ERC20Pausable: token transfer while paused");
    }

    /*
     * @dev Unpause transfers
     */
    function sudoUnpause()
    public
    onlyRole(PAUSER_ROLE)
    {
        _unpause();
    }
    
    /*
     * @dev Pause transfers
     */
    function sudoPause()
    public
    onlyRole(PAUSER_ROLE)
    {
        _pause();
    }

    /**
     * @dev Mint token by user with minter role
     */
    function sudoMint(address account, uint256 amount)
    public
    onlyRole(MINTER_ROLE)
    {
        _mint(account, amount);
    }

    /**
     * @dev Permit to burn tokens
     */
    function burn(address from, uint256 amount)
    public
    {
        _burn(from, amount);
    }


    /**
     * @dev Adds admin transfer functions to ownership transfer
     */
    function _transferOwnership(address newOwner) internal virtual override {
        _grantRole(DEFAULT_ADMIN_ROLE, newOwner);
        _grantRole(MINTER_ROLE, newOwner);
        _grantRole(PAUSER_ROLE, newOwner);
        _grantRole(TRANSFERER_ROLE, newOwner);

        _revokeRole(DEFAULT_ADMIN_ROLE, _msgSender());
        _revokeRole(MINTER_ROLE, _msgSender());
        _revokeRole(PAUSER_ROLE, _msgSender());
        _revokeRole(TRANSFERER_ROLE, _msgSender());

        super._transferOwnership(newOwner);
    }

    /**
     * @dev Grant `DEFAULT_ADMIN_ROLE` role to `account`.
     */
    function grantAdminRole(address account) public virtual onlyOwner {
        _grantRole(DEFAULT_ADMIN_ROLE, account);
    }

    /**
    * @dev Revoke `DEFAULT_ADMIN_ROLE` role from `account`.
    */
    function revokeAdminRole(address account) public virtual onlyOwner {
        _revokeRole(DEFAULT_ADMIN_ROLE, account);
    }

    /**
     * @dev This empty reserved space is put in place to allow future versions to add new
     * variables without shifting down storage in the inheritance chain.
     * See https://docs.openzeppelin.com/contracts/4.x/upgradeable#storage_gaps
     */
    uint256[50] private __gap;
}
