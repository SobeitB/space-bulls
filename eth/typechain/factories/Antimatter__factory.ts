/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { Antimatter, AntimatterInterface } from "../Antimatter";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint8",
        name: "version",
        type: "uint8",
      },
    ],
    name: "Initialized",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "Paused",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "previousAdminRole",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "newAdminRole",
        type: "bytes32",
      },
    ],
    name: "RoleAdminChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleGranted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleRevoked",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "Unpaused",
    type: "event",
  },
  {
    inputs: [],
    name: "DEFAULT_ADMIN_ROLE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "MINTER_ROLE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "PAUSER_ROLE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "TRANSFERER_ROLE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "burn",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "subtractedValue",
        type: "uint256",
      },
    ],
    name: "decreaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
    ],
    name: "getRoleAdmin",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "getRoleMember",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
    ],
    name: "getRoleMemberCount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "grantAdminRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "grantRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "hasRole",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "addedValue",
        type: "uint256",
      },
    ],
    name: "increaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "name_",
        type: "string",
      },
      {
        internalType: "string",
        name: "symbol_",
        type: "string",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "paused",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "renounceRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "revokeAdminRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "revokeRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "sudoMint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "sudoPause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "sudoUnpause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "version",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50612822806100206000396000f3fe608060405234801561001057600080fd5b50600436106102415760003560e01c80638da5cb5b11610145578063bfd62196116100bd578063d547741f1161008c578063e63ab1e911610071578063e63ab1e91461055d578063f2fde38b14610584578063f9addce41461059757600080fd5b8063d547741f14610511578063dd62ed3e1461052457600080fd5b8063bfd62196146104bc578063c634b78e146104c4578063ca15c873146104d7578063d5391393146104ea57600080fd5b80639a19c7b011610114578063a217fddf116100f9578063a217fddf1461048e578063a457c2d714610496578063a9059cbb146104a957600080fd5b80639a19c7b0146104685780639dc29fac1461047b57600080fd5b80638da5cb5b146103ef5780639010d07c1461041457806391d148541461042757806395d89b411461046057600080fd5b80632f2ff15d116101d85780634cd88b76116101a75780635c975abb1161018c5780635c975abb146103b257806370a08231146103be578063715018a6146103e757600080fd5b80634cd88b761461036657806354fd4d501461037957600080fd5b80632f2ff15d1461031e578063313ce5671461033157806336568abe14610340578063395093511461035357600080fd5b806318160ddd1161021457806318160ddd146102cb57806323b872dd146102d3578063248a9ca3146102e65780632d688ca81461030957600080fd5b806301ffc9a71461024657806306fdde031461026e578063095ea7b3146102835780630ade7dc114610296575b600080fd5b6102596102543660046122ab565b61059f565b60405190151581526020015b60405180910390f35b6102766105fb565b6040516102659190612319565b610259610291366004612363565b61068d565b6102bd7f4f95d38bdf1c10f97389d9165d78fbae18ad4454e53a8ce330a76ca571454f8581565b604051908152602001610265565b60fd546102bd565b6102596102e136600461238d565b6106a5565b6102bd6102f43660046123c9565b60009081526097602052604090206001015490565b61031c610317366004612363565b6106c9565b005b61031c61032c3660046123e2565b610702565b60405160128152602001610265565b61031c61034e3660046123e2565b610727565b610259610361366004612363565b6107b8565b61031c6103743660046124b1565b6107f7565b60408051808201909152600581527f312e302e300000000000000000000000000000000000000000000000000000006020820152610276565b61012d5460ff16610259565b6102bd6103cc366004612515565b6001600160a01b0316600090815260fb602052604090205490565b61031c6109ac565b6033546001600160a01b03165b6040516001600160a01b039091168152602001610265565b6103fc610422366004612530565b610a12565b6102596104353660046123e2565b60009182526097602090815260408084206001600160a01b0393909316845291905290205460ff1690565b610276610a31565b61031c610476366004612515565b610a40565b61031c610489366004612363565b610aa8565b6102bd600081565b6102596104a4366004612363565b610ab2565b6102596104b7366004612363565b610b5c565b61031c610b6a565b61031c6104d2366004612515565b610b9c565b6102bd6104e53660046123c9565b610c01565b6102bd7f9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a681565b61031c61051f3660046123e2565b610c18565b6102bd610532366004612552565b6001600160a01b03918216600090815260fc6020908152604080832093909416825291909152205490565b6102bd7f65d7a28e3265b37a6474929f336521b332c1681b933f6cb9f3376673440d862a81565b61031c610592366004612515565b610c3d565b61031c610d1c565b60007fffffffff0000000000000000000000000000000000000000000000000000000082167f5a05180f0000000000000000000000000000000000000000000000000000000014806105f557506105f582610d4e565b92915050565b606060fe805461060a9061257c565b80601f01602080910402602001604051908101604052809291908181526020018280546106369061257c565b80156106835780601f1061065857610100808354040283529160200191610683565b820191906000526020600020905b81548152906001019060200180831161066657829003601f168201915b5050505050905090565b60003361069b818585610de5565b5060019392505050565b6000336106b3858285610f3d565b6106be858585610fcf565b506001949350505050565b7f9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a66106f3816111f1565b6106fd83836111fb565b505050565b60008281526097602052604090206001015461071d816111f1565b6106fd83836112e6565b6001600160a01b03811633146107aa5760405162461bcd60e51b815260206004820152602f60248201527f416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636560448201527f20726f6c657320666f722073656c66000000000000000000000000000000000060648201526084015b60405180910390fd5b6107b48282611308565b5050565b33600081815260fc602090815260408083206001600160a01b038716845290915281205490919061069b90829086906107f29087906125cc565b610de5565b6000610803600161132a565b9050801561081b576000805461ff0019166101001790555b6108258383611463565b61082d6114d8565b61083561154b565b61083d6115be565b6108456114d8565b61084d611629565b6108787f9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a660006116d0565b6108a37f65d7a28e3265b37a6474929f336521b332c1681b933f6cb9f3376673440d862a60006116d0565b6108ce7f4f95d38bdf1c10f97389d9165d78fbae18ad4454e53a8ce330a76ca571454f8560006116d0565b6108d960003061171b565b6108e460003361171b565b61090e7f9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a63361171b565b6109387f65d7a28e3265b37a6474929f336521b332c1681b933f6cb9f3376673440d862a3361171b565b6109627f4f95d38bdf1c10f97389d9165d78fbae18ad4454e53a8ce330a76ca571454f853361171b565b80156106fd576000805461ff0019169055604051600181527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a1505050565b6033546001600160a01b03163314610a065760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064016107a1565b610a106000611725565b565b600082815260c960205260408120610a2a9083611840565b9392505050565b606060ff805461060a9061257c565b6033546001600160a01b03163314610a9a5760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064016107a1565b610aa5600082611308565b50565b6107b4828261184c565b33600081815260fc602090815260408083206001600160a01b038716845290915281205490919083811015610b4f5760405162461bcd60e51b815260206004820152602560248201527f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f7760448201527f207a65726f00000000000000000000000000000000000000000000000000000060648201526084016107a1565b6106be8286868403610de5565b60003361069b818585610fcf565b7f65d7a28e3265b37a6474929f336521b332c1681b933f6cb9f3376673440d862a610b94816111f1565b610aa56119dd565b6033546001600160a01b03163314610bf65760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064016107a1565b610aa56000826112e6565b600081815260c9602052604081206105f590611a62565b600082815260976020526040902060010154610c33816111f1565b6106fd8383611308565b6033546001600160a01b03163314610c975760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064016107a1565b6001600160a01b038116610d135760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201527f646472657373000000000000000000000000000000000000000000000000000060648201526084016107a1565b610aa581611725565b7f65d7a28e3265b37a6474929f336521b332c1681b933f6cb9f3376673440d862a610d46816111f1565b610aa5611629565b60007fffffffff0000000000000000000000000000000000000000000000000000000082167f7965db0b0000000000000000000000000000000000000000000000000000000014806105f557507f01ffc9a7000000000000000000000000000000000000000000000000000000007fffffffff000000000000000000000000000000000000000000000000000000008316146105f5565b6001600160a01b038316610e605760405162461bcd60e51b8152602060048201526024808201527f45524332303a20617070726f76652066726f6d20746865207a65726f2061646460448201527f726573730000000000000000000000000000000000000000000000000000000060648201526084016107a1565b6001600160a01b038216610edc5760405162461bcd60e51b815260206004820152602260248201527f45524332303a20617070726f766520746f20746865207a65726f20616464726560448201527f737300000000000000000000000000000000000000000000000000000000000060648201526084016107a1565b6001600160a01b03838116600081815260fc602090815260408083209487168084529482529182902085905590518481527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925910160405180910390a3505050565b6001600160a01b03838116600090815260fc60209081526040808320938616835292905220546000198114610fc95781811015610fbc5760405162461bcd60e51b815260206004820152601d60248201527f45524332303a20696e73756666696369656e7420616c6c6f77616e636500000060448201526064016107a1565b610fc98484848403610de5565b50505050565b6001600160a01b03831661104b5760405162461bcd60e51b815260206004820152602560248201527f45524332303a207472616e736665722066726f6d20746865207a65726f20616460448201527f647265737300000000000000000000000000000000000000000000000000000060648201526084016107a1565b6001600160a01b0382166110c75760405162461bcd60e51b815260206004820152602360248201527f45524332303a207472616e7366657220746f20746865207a65726f206164647260448201527f657373000000000000000000000000000000000000000000000000000000000060648201526084016107a1565b6110d2838383611a6c565b6001600160a01b038316600090815260fb6020526040902054818110156111615760405162461bcd60e51b815260206004820152602660248201527f45524332303a207472616e7366657220616d6f756e742065786365656473206260448201527f616c616e6365000000000000000000000000000000000000000000000000000060648201526084016107a1565b6001600160a01b03808516600090815260fb60205260408082208585039055918516815290812080548492906111989084906125cc565b92505081905550826001600160a01b0316846001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040516111e491815260200190565b60405180910390a3610fc9565b610aa58133611b6d565b6001600160a01b0382166112515760405162461bcd60e51b815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f20616464726573730060448201526064016107a1565b61125d60008383611a6c565b8060fd600082825461126f91906125cc565b90915550506001600160a01b038216600090815260fb60205260408120805483929061129c9084906125cc565b90915550506040518181526001600160a01b038316906000907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9060200160405180910390a35050565b6112f08282611bed565b600082815260c9602052604090206106fd9082611c8f565b6113128282611ca4565b600082815260c9602052604090206106fd9082611d27565b60008054610100900460ff16156113c7578160ff16600114801561134d5750303b155b6113bf5760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201527f647920696e697469616c697a656400000000000000000000000000000000000060648201526084016107a1565b506000919050565b60005460ff8084169116106114445760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201527f647920696e697469616c697a656400000000000000000000000000000000000060648201526084016107a1565b506000805460ff191660ff92909216919091179055600190565b919050565b600054610100900460ff166114ce5760405162461bcd60e51b815260206004820152602b60248201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960448201526a6e697469616c697a696e6760a81b60648201526084016107a1565b6107b48282611d3c565b600054610100900460ff166115435760405162461bcd60e51b815260206004820152602b60248201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960448201526a6e697469616c697a696e6760a81b60648201526084016107a1565b610a10611dc0565b600054610100900460ff166115b65760405162461bcd60e51b815260206004820152602b60248201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960448201526a6e697469616c697a696e6760a81b60648201526084016107a1565b610a10611e38565b600054610100900460ff16610a105760405162461bcd60e51b815260206004820152602b60248201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960448201526a6e697469616c697a696e6760a81b60648201526084016107a1565b61012d5460ff161561167d5760405162461bcd60e51b815260206004820152601060248201527f5061757361626c653a207061757365640000000000000000000000000000000060448201526064016107a1565b61012d805460ff191660011790557f62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a2586116b33390565b6040516001600160a01b03909116815260200160405180910390a1565b600082815260976020526040808220600101805490849055905190918391839186917fbd79b86ffe0ab8e8776151514217cd7cacd52c909f66475c3af44e129f0b00ff9190a4505050565b6107b482826112e6565b6117306000826112e6565b61175a7f9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6826112e6565b6117847f65d7a28e3265b37a6474929f336521b332c1681b933f6cb9f3376673440d862a826112e6565b6117ae7f4f95d38bdf1c10f97389d9165d78fbae18ad4454e53a8ce330a76ca571454f85826112e6565b6117b9600033611308565b6117e37f9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a633611308565b61180d7f65d7a28e3265b37a6474929f336521b332c1681b933f6cb9f3376673440d862a33611308565b6118377f4f95d38bdf1c10f97389d9165d78fbae18ad4454e53a8ce330a76ca571454f8533611308565b610aa581611eac565b6000610a2a8383611f16565b6001600160a01b0382166118c85760405162461bcd60e51b815260206004820152602160248201527f45524332303a206275726e2066726f6d20746865207a65726f2061646472657360448201527f730000000000000000000000000000000000000000000000000000000000000060648201526084016107a1565b6118d482600083611a6c565b6001600160a01b038216600090815260fb6020526040902054818110156119635760405162461bcd60e51b815260206004820152602260248201527f45524332303a206275726e20616d6f756e7420657863656564732062616c616e60448201527f636500000000000000000000000000000000000000000000000000000000000060648201526084016107a1565b6001600160a01b038316600090815260fb60205260408120838303905560fd80548492906119929084906125e4565b90915550506040518281526000906001600160a01b038516907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9060200160405180910390a3505050565b61012d5460ff16611a305760405162461bcd60e51b815260206004820152601460248201527f5061757361626c653a206e6f742070617573656400000000000000000000000060448201526064016107a1565b61012d805460ff191690557f5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa336116b3565b60006105f5825490565b6001600160a01b03831660009081527fe9224db93ae05f94d8f1ccf7cd9f7e1f633769ae874b30d472270e9c8e2dbef7602052604090205460ff1680611ae957506001600160a01b03821660009081527fe9224db93ae05f94d8f1ccf7cd9f7e1f633769ae874b30d472270e9c8e2dbef7602052604090205460ff165b15611af357505050565b61012d5460ff16156106fd5760405162461bcd60e51b815260206004820152602a60248201527f45524332305061757361626c653a20746f6b656e207472616e7366657220776860448201527f696c65207061757365640000000000000000000000000000000000000000000060648201526084016107a1565b60008281526097602090815260408083206001600160a01b038516845290915290205460ff166107b457611bab816001600160a01b03166014611f40565b611bb6836020611f40565b604051602001611bc79291906125fb565b60408051601f198184030181529082905262461bcd60e51b82526107a191600401612319565b60008281526097602090815260408083206001600160a01b038516845290915290205460ff166107b45760008281526097602090815260408083206001600160a01b03851684529091529020805460ff19166001179055611c4b3390565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b6000610a2a836001600160a01b038416612169565b60008281526097602090815260408083206001600160a01b038516845290915290205460ff16156107b45760008281526097602090815260408083206001600160a01b0385168085529252808320805460ff1916905551339285917ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b9190a45050565b6000610a2a836001600160a01b0384166121b8565b600054610100900460ff16611da75760405162461bcd60e51b815260206004820152602b60248201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960448201526a6e697469616c697a696e6760a81b60648201526084016107a1565b60fe611db383826126ca565b5060ff6106fd82826126ca565b600054610100900460ff16611e2b5760405162461bcd60e51b815260206004820152602b60248201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960448201526a6e697469616c697a696e6760a81b60648201526084016107a1565b61012d805460ff19169055565b600054610100900460ff16611ea35760405162461bcd60e51b815260206004820152602b60248201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960448201526a6e697469616c697a696e6760a81b60648201526084016107a1565b610a1033611725565b603380546001600160a01b038381167fffffffffffffffffffffffff0000000000000000000000000000000000000000831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b6000826000018281548110611f2d57611f2d61278a565b9060005260206000200154905092915050565b60606000611f4f8360026127a0565b611f5a9060026125cc565b67ffffffffffffffff811115611f7257611f7261240e565b6040519080825280601f01601f191660200182016040528015611f9c576020820181803683370190505b5090507f300000000000000000000000000000000000000000000000000000000000000081600081518110611fd357611fd361278a565b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a9053507f7800000000000000000000000000000000000000000000000000000000000000816001815181106120365761203661278a565b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a90535060006120728460026127a0565b61207d9060016125cc565b90505b600181111561211a577f303132333435363738396162636465660000000000000000000000000000000085600f16601081106120be576120be61278a565b1a60f81b8282815181106120d4576120d461278a565b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a90535060049490941c93612113816127bf565b9050612080565b508315610a2a5760405162461bcd60e51b815260206004820181905260248201527f537472696e67733a20686578206c656e67746820696e73756666696369656e7460448201526064016107a1565b60008181526001830160205260408120546121b0575081546001818101845560008481526020808220909301849055845484825282860190935260409020919091556105f5565b5060006105f5565b600081815260018301602052604081205480156122a15760006121dc6001836125e4565b85549091506000906121f0906001906125e4565b90508181146122555760008660000182815481106122105761221061278a565b90600052602060002001549050808760000184815481106122335761223361278a565b6000918252602080832090910192909255918252600188019052604090208390555b8554869080612266576122666127d6565b6001900381819060005260206000200160009055905585600101600086815260200190815260200160002060009055600193505050506105f5565b60009150506105f5565b6000602082840312156122bd57600080fd5b81357fffffffff0000000000000000000000000000000000000000000000000000000081168114610a2a57600080fd5b60005b838110156123085781810151838201526020016122f0565b83811115610fc95750506000910152565b60208152600082518060208401526123388160408501602087016122ed565b601f01601f19169190910160400192915050565b80356001600160a01b038116811461145e57600080fd5b6000806040838503121561237657600080fd5b61237f8361234c565b946020939093013593505050565b6000806000606084860312156123a257600080fd5b6123ab8461234c565b92506123b96020850161234c565b9150604084013590509250925092565b6000602082840312156123db57600080fd5b5035919050565b600080604083850312156123f557600080fd5b823591506124056020840161234c565b90509250929050565b634e487b7160e01b600052604160045260246000fd5b600082601f83011261243557600080fd5b813567ffffffffffffffff808211156124505761245061240e565b604051601f8301601f19908116603f011681019082821181831017156124785761247861240e565b8160405283815286602085880101111561249157600080fd5b836020870160208301376000602085830101528094505050505092915050565b600080604083850312156124c457600080fd5b823567ffffffffffffffff808211156124dc57600080fd5b6124e886838701612424565b935060208501359150808211156124fe57600080fd5b5061250b85828601612424565b9150509250929050565b60006020828403121561252757600080fd5b610a2a8261234c565b6000806040838503121561254357600080fd5b50508035926020909101359150565b6000806040838503121561256557600080fd5b61256e8361234c565b91506124056020840161234c565b600181811c9082168061259057607f821691505b6020821081036125b057634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052601160045260246000fd5b600082198211156125df576125df6125b6565b500190565b6000828210156125f6576125f66125b6565b500390565b7f416363657373436f6e74726f6c3a206163636f756e74200000000000000000008152600083516126338160178501602088016122ed565b7f206973206d697373696e6720726f6c652000000000000000000000000000000060179184019182015283516126708160288401602088016122ed565b01602801949350505050565b601f8211156106fd57600081815260208120601f850160051c810160208610156126a35750805b601f850160051c820191505b818110156126c2578281556001016126af565b505050505050565b815167ffffffffffffffff8111156126e4576126e461240e565b6126f8816126f2845461257c565b8461267c565b602080601f83116001811461272d57600084156127155750858301515b600019600386901b1c1916600185901b1785556126c2565b600085815260208120601f198616915b8281101561275c5788860151825594840194600190910190840161273d565b508582101561277a5787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b634e487b7160e01b600052603260045260246000fd5b60008160001904831182151516156127ba576127ba6125b6565b500290565b6000816127ce576127ce6125b6565b506000190190565b634e487b7160e01b600052603160045260246000fdfea2646970667358221220191ae8d6330cf2461ff5af5871635d22368b71aecf69220b5c9927486630aac664736f6c634300080f0033";

export class Antimatter__factory extends ContractFactory {
  constructor(
    ...args: [signer: Signer] | ConstructorParameters<typeof ContractFactory>
  ) {
    if (args.length === 1) {
      super(_abi, _bytecode, args[0]);
    } else {
      super(...args);
    }
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<Antimatter> {
    return super.deploy(overrides || {}) as Promise<Antimatter>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): Antimatter {
    return super.attach(address) as Antimatter;
  }
  connect(signer: Signer): Antimatter__factory {
    return super.connect(signer) as Antimatter__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): AntimatterInterface {
    return new utils.Interface(_abi) as AntimatterInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): Antimatter {
    return new Contract(address, _abi, signerOrProvider) as Antimatter;
  }
}
