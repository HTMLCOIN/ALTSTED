export default [
  {
    name: '',
    type: 'constructor',
    payable: false,
    inputs: [],
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
    name: 'Burn',
    type: 'event',
    payable: false,
    inputs: [
      {
        name: 'sender',
        type: 'address',
        indexed: true,
      },
      {
        name: 'amount0',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'amount1',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'to',
        type: 'address',
        indexed: true,
      },
    ],
    outputs: null,
    constant: false,
    anonymous: false,
  },
  {
    name: 'Mint',
    type: 'event',
    payable: false,
    inputs: [
      {
        name: 'sender',
        type: 'address',
        indexed: true,
      },
      {
        name: 'amount0',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'amount1',
        type: 'uint256',
        indexed: false,
      },
    ],
    outputs: null,
    constant: false,
    anonymous: false,
  },
  {
    name: 'Swap',
    type: 'event',
    payable: false,
    inputs: [
      {
        name: 'sender',
        type: 'address',
        indexed: true,
      },
      {
        name: 'amount0In',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'amount1In',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'amount0Out',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'amount1Out',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'to',
        type: 'address',
        indexed: true,
      },
    ],
    outputs: null,
    constant: false,
    anonymous: false,
  },
  {
    name: 'Sync',
    type: 'event',
    payable: false,
    inputs: [
      {
        name: 'reserve0',
        type: 'uint112',
        indexed: false,
      },
      {
        name: 'reserve1',
        type: 'uint112',
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
    name: 'MINIMUM_LIQUIDITY',
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
    name: 'burn',
    type: 'function',
    payable: false,
    inputs: [
      {
        name: 'to',
        type: 'address',
        indexed: false,
      },
    ],
    outputs: [
      {
        name: 'amount0',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'amount1',
        type: 'uint256',
        indexed: false,
      },
    ],
    constant: false,
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
    name: 'factory',
    type: 'function',
    payable: false,
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'address',
        indexed: false,
      },
    ],
    constant: true,
    anonymous: false,
  },
  {
    name: 'getReserves',
    type: 'function',
    payable: false,
    inputs: [],
    outputs: [
      {
        name: '_reserve0',
        type: 'uint112',
        indexed: false,
      },
      {
        name: '_reserve1',
        type: 'uint112',
        indexed: false,
      },
      {
        name: '_blockTimestampLast',
        type: 'uint32',
        indexed: false,
      },
    ],
    constant: true,
    anonymous: false,
  },
  {
    name: 'initialize',
    type: 'function',
    payable: false,
    inputs: [
      {
        name: '_token0',
        type: 'address',
        indexed: false,
      },
      {
        name: '_token1',
        type: 'address',
        indexed: false,
      },
    ],
    outputs: [],
    constant: false,
    anonymous: false,
  },
  {
    name: 'kLast',
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
    name: 'mint',
    type: 'function',
    payable: false,
    inputs: [
      {
        name: 'to',
        type: 'address',
        indexed: false,
      },
    ],
    outputs: [
      {
        name: 'liquidity',
        type: 'uint256',
        indexed: false,
      },
    ],
    constant: false,
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
    name: 'price0CumulativeLast',
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
    name: 'price1CumulativeLast',
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
    name: 'skim',
    type: 'function',
    payable: false,
    inputs: [
      {
        name: 'to',
        type: 'address',
        indexed: false,
      },
    ],
    outputs: [],
    constant: false,
    anonymous: false,
  },
  {
    name: 'swap',
    type: 'function',
    payable: false,
    inputs: [
      {
        name: 'amount0Out',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'amount1Out',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'to',
        type: 'address',
        indexed: false,
      },
      {
        name: 'data',
        type: 'bytes',
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
    name: 'sync',
    type: 'function',
    payable: false,
    inputs: [],
    outputs: [],
    constant: false,
    anonymous: false,
  },
  {
    name: 'token0',
    type: 'function',
    payable: false,
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'address',
        indexed: false,
      },
    ],
    constant: true,
    anonymous: false,
  },
  {
    name: 'token1',
    type: 'function',
    payable: false,
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'address',
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
