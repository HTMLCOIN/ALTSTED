export default [
  {
    name: '',
    type: 'constructor',
    payable: false,
    inputs: [
      {
        name: '_totalSupply',
        type: 'uint256',
        indexed: false,
      },
    ],
    outputs: null,
    constant: false,
    anonymous: false,
  },
  {
    name: 'Approval',
    type: 'event',
    payable: false,
    inputs: [
      {
        name: 'owner',
        type: 'address',
        indexed: true,
      },
      {
        name: 'spender',
        type: 'address',
        indexed: true,
      },
      {
        name: 'value',
        type: 'uint256',
        indexed: false,
      },
    ],
    outputs: null,
    constant: false,
    anonymous: false,
  },
  {
    name: 'Transfer',
    type: 'event',
    payable: false,
    inputs: [
      {
        name: 'from',
        type: 'address',
        indexed: true,
      },
      {
        name: 'to',
        type: 'address',
        indexed: true,
      },
      {
        name: 'value',
        type: 'uint256',
        indexed: false,
      },
    ],
    outputs: null,
    constant: false,
    anonymous: false,
  },
  {
    name: 'DOMAIN_SEPARATOR',
    type: 'function',
    payable: false,
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'bytes32',
        indexed: false,
      },
    ],
    constant: true,
    anonymous: false,
  },
  {
    name: 'PERMIT_TYPEHASH',
    type: 'function',
    payable: false,
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'bytes32',
        indexed: false,
      },
    ],
    constant: true,
    anonymous: false,
  },
  {
    name: 'allowance',
    type: 'function',
    payable: false,
    inputs: [
      {
        name: '',
        type: 'address',
        indexed: false,
      },
      {
        name: '',
        type: 'address',
        indexed: false,
      },
    ],
    outputs: [
      {
        name: '',
        type: 'uint256',
        indexed: false,
      },
    ],
    constant: true,
    anonymous: false,
  },
  {
    name: 'approve',
    type: 'function',
    payable: false,
    inputs: [
      {
        name: 'spender',
        type: 'address',
        indexed: false,
      },
      {
        name: 'value',
        type: 'uint256',
        indexed: false,
      },
    ],
    outputs: [
      {
        name: '',
        type: 'bool',
        indexed: false,
      },
    ],
    constant: false,
    anonymous: false,
  },
  {
    name: 'balanceOf',
    type: 'function',
    payable: false,
    inputs: [
      {
        name: '',
        type: 'address',
        indexed: false,
      },
    ],
    outputs: [
      {
        name: '',
        type: 'uint256',
        indexed: false,
      },
    ],
    constant: true,
    anonymous: false,
  },
  {
    name: 'decimals',
    type: 'function',
    payable: false,
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'uint8',
        indexed: false,
      },
    ],
    constant: true,
    anonymous: false,
  },
  {
    name: 'name',
    type: 'function',
    payable: false,
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'string',
        indexed: false,
      },
    ],
    constant: true,
    anonymous: false,
  },
  {
    name: 'nonces',
    type: 'function',
    payable: false,
    inputs: [
      {
        name: '',
        type: 'address',
        indexed: false,
      },
    ],
    outputs: [
      {
        name: '',
        type: 'uint256',
        indexed: false,
      },
    ],
    constant: true,
    anonymous: false,
  },
  {
    name: 'permit',
    type: 'function',
    payable: false,
    inputs: [
      {
        name: 'owner',
        type: 'address',
        indexed: false,
      },
      {
        name: 'spender',
        type: 'address',
        indexed: false,
      },
      {
        name: 'value',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'deadline',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'v',
        type: 'uint8',
        indexed: false,
      },
      {
        name: 'r',
        type: 'bytes32',
        indexed: false,
      },
      {
        name: 's',
        type: 'bytes32',
        indexed: false,
      },
    ],
    outputs: [],
    constant: false,
    anonymous: false,
  },
  {
    name: 'symbol',
    type: 'function',
    payable: false,
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'string',
        indexed: false,
      },
    ],
    constant: true,
    anonymous: false,
  },
  {
    name: 'totalSupply',
    type: 'function',
    payable: false,
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'uint256',
        indexed: false,
      },
    ],
    constant: true,
    anonymous: false,
  },
  {
    name: 'transfer',
    type: 'function',
    payable: false,
    inputs: [
      {
        name: 'to',
        type: 'address',
        indexed: false,
      },
      {
        name: 'value',
        type: 'uint256',
        indexed: false,
      },
    ],
    outputs: [
      {
        name: '',
        type: 'bool',
        indexed: false,
      },
    ],
    constant: false,
    anonymous: false,
  },
  {
    name: 'transferFrom',
    type: 'function',
    payable: false,
    inputs: [
      {
        name: 'from',
        type: 'address',
        indexed: false,
      },
      {
        name: 'to',
        type: 'address',
        indexed: false,
      },
      {
        name: 'value',
        type: 'uint256',
        indexed: false,
      },
    ],
    outputs: [
      {
        name: '',
        type: 'bool',
        indexed: false,
      },
    ],
    constant: false,
    anonymous: false,
  },
];
