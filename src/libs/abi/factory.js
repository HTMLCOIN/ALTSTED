export default [
  {
    name: '',
    type: 'constructor',
    payable: false,
    inputs: [
      {
        name: '_feeToSetter',
        type: 'address',
        indexed: false,
      },
    ],
    outputs: null,
    constant: false,
    anonymous: false,
  },
  {
    name: 'PairCreated',
    type: 'event',
    payable: false,
    inputs: [
      {
        name: 'token0',
        type: 'address',
        indexed: true,
      },
      {
        name: 'token1',
        type: 'address',
        indexed: true,
      },
      {
        name: 'pair',
        type: 'address',
        indexed: false,
      },
      {
        name: '',
        type: 'uint256',
        indexed: false,
      },
    ],
    outputs: null,
    constant: false,
    anonymous: false,
  },
  {
    name: 'allPairs',
    type: 'function',
    payable: false,
    inputs: [
      {
        name: '',
        type: 'uint256',
        indexed: false,
      },
    ],
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
    name: 'allPairsLength',
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
    name: 'createPair',
    type: 'function',
    payable: false,
    inputs: [
      {
        name: 'tokenA',
        type: 'address',
        indexed: false,
      },
      {
        name: 'tokenB',
        type: 'address',
        indexed: false,
      },
    ],
    outputs: [
      {
        name: 'pair',
        type: 'address',
        indexed: false,
      },
    ],
    constant: false,
    anonymous: false,
  },
  {
    name: 'feeTo',
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
    name: 'feeToSetter',
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
    name: 'getPair',
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
        type: 'address',
        indexed: false,
      },
    ],
    constant: true,
    anonymous: false,
  },
  {
    name: 'setFeeTo',
    type: 'function',
    payable: false,
    inputs: [
      {
        name: '_feeTo',
        type: 'address',
        indexed: false,
      },
    ],
    outputs: [],
    constant: false,
    anonymous: false,
  },
  {
    name: 'setFeeToSetter',
    type: 'function',
    payable: false,
    inputs: [
      {
        name: '_feeToSetter',
        type: 'address',
        indexed: false,
      },
    ],
    outputs: [],
    constant: false,
    anonymous: false,
  },
];
