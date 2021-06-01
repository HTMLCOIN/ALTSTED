export default [
  {
    name: '',
    type: 'constructor',
    payable: false,
    inputs: [
      {
        name: '_factory',
        type: 'address',
        indexed: false,
      },
      {
        name: '_WETH',
        type: 'address',
        indexed: false,
      },
    ],
    outputs: null,
    constant: false,
    anonymous: false,
  },
  {
    name: 'WETH',
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
    constant: false,
    anonymous: false,
  },
  {
    name: 'addLiquidity',
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
      {
        name: 'amountADesired',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'amountBDesired',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'amountAMin',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'amountBMin',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'to',
        type: 'address',
        indexed: false,
      },
      {
        name: 'deadline',
        type: 'uint256',
        indexed: false,
      },
    ],
    outputs: [
      {
        name: 'amountA',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'amountB',
        type: 'uint256',
        indexed: false,
      },
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
    name: 'addLiquidityETH',
    type: 'function',
    payable: false,
    inputs: [
      {
        name: 'token',
        type: 'address',
        indexed: false,
      },
      {
        name: 'amountTokenDesired',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'amountTokenMin',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'amountETHMin',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'to',
        type: 'address',
        indexed: false,
      },
      {
        name: 'deadline',
        type: 'uint256',
        indexed: false,
      },
    ],
    outputs: [
      {
        name: 'amountToken',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'amountETH',
        type: 'uint256',
        indexed: false,
      },
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
    constant: false,
    anonymous: false,
  },
  {
    name: 'getAmountIn',
    type: 'function',
    payable: false,
    inputs: [
      {
        name: 'amountOut',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'reserveIn',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'reserveOut',
        type: 'uint256',
        indexed: false,
      },
    ],
    outputs: [
      {
        name: 'amountIn',
        type: 'uint256',
        indexed: false,
      },
    ],
    constant: false,
    anonymous: false,
  },
  {
    name: 'getAmountOut',
    type: 'function',
    payable: false,
    inputs: [
      {
        name: 'amountIn',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'reserveIn',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'reserveOut',
        type: 'uint256',
        indexed: false,
      },
    ],
    outputs: [
      {
        name: 'amountOut',
        type: 'uint256',
        indexed: false,
      },
    ],
    constant: false,
    anonymous: false,
  },
  {
    name: 'getAmountsIn',
    type: 'function',
    payable: false,
    inputs: [
      {
        name: 'amountOut',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'path',
        type: 'address[]',
        indexed: false,
      },
    ],
    outputs: [
      {
        name: 'amounts',
        type: 'uint256[]',
        indexed: false,
      },
    ],
    constant: false,
    anonymous: false,
  },
  {
    name: 'getAmountsOut',
    type: 'function',
    payable: false,
    inputs: [
      {
        name: 'amountIn',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'path',
        type: 'address[]',
        indexed: false,
      },
    ],
    outputs: [
      {
        name: 'amounts',
        type: 'uint256[]',
        indexed: false,
      },
    ],
    constant: false,
    anonymous: false,
  },
  {
    name: 'getReserves',
    type: 'function',
    payable: false,
    inputs: [
      {
        name: 'factory',
        type: 'address',
        indexed: false,
      },
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
        name: 'reserveA',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'reserveB',
        type: 'uint256',
        indexed: false,
      },
    ],
    constant: false,
    anonymous: false,
  },
  {
    name: 'quote',
    type: 'function',
    payable: false,
    inputs: [
      {
        name: 'amountA',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'reserveA',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'reserveB',
        type: 'uint256',
        indexed: false,
      },
    ],
    outputs: [
      {
        name: 'amountB',
        type: 'uint256',
        indexed: false,
      },
    ],
    constant: false,
    anonymous: false,
  },
  {
    name: 'removeLiquidity',
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
      {
        name: 'liquidity',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'amountAMin',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'amountBMin',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'to',
        type: 'address',
        indexed: false,
      },
      {
        name: 'deadline',
        type: 'uint256',
        indexed: false,
      },
    ],
    outputs: [
      {
        name: 'amountA',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'amountB',
        type: 'uint256',
        indexed: false,
      },
    ],
    constant: false,
    anonymous: false,
  },
  {
    name: 'removeLiquidityETH',
    type: 'function',
    payable: false,
    inputs: [
      {
        name: 'token',
        type: 'address',
        indexed: false,
      },
      {
        name: 'liquidity',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'amountTokenMin',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'amountETHMin',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'to',
        type: 'address',
        indexed: false,
      },
      {
        name: 'deadline',
        type: 'uint256',
        indexed: false,
      },
    ],
    outputs: [
      {
        name: 'amountToken',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'amountETH',
        type: 'uint256',
        indexed: false,
      },
    ],
    constant: false,
    anonymous: false,
  },
  {
    name: 'removeLiquidityETHSupportingFeeOnTransferTokens',
    type: 'function',
    payable: false,
    inputs: [
      {
        name: 'token',
        type: 'address',
        indexed: false,
      },
      {
        name: 'liquidity',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'amountTokenMin',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'amountETHMin',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'to',
        type: 'address',
        indexed: false,
      },
      {
        name: 'deadline',
        type: 'uint256',
        indexed: false,
      },
    ],
    outputs: [
      {
        name: 'amountETH',
        type: 'uint256',
        indexed: false,
      },
    ],
    constant: false,
    anonymous: false,
  },
  {
    name: 'removeLiquidityETHWithPermit',
    type: 'function',
    payable: false,
    inputs: [
      {
        name: 'token',
        type: 'address',
        indexed: false,
      },
      {
        name: 'liquidity',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'amountTokenMin',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'amountETHMin',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'to',
        type: 'address',
        indexed: false,
      },
      {
        name: 'deadline',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'approveMax',
        type: 'bool',
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
    outputs: [
      {
        name: 'amountToken',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'amountETH',
        type: 'uint256',
        indexed: false,
      },
    ],
    constant: false,
    anonymous: false,
  },
  {
    name: 'removeLiquidityETHWithPermitSupportingFeeOnTransferTokens',
    type: 'function',
    payable: false,
    inputs: [
      {
        name: 'token',
        type: 'address',
        indexed: false,
      },
      {
        name: 'liquidity',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'amountTokenMin',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'amountETHMin',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'to',
        type: 'address',
        indexed: false,
      },
      {
        name: 'deadline',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'approveMax',
        type: 'bool',
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
    outputs: [
      {
        name: 'amountETH',
        type: 'uint256',
        indexed: false,
      },
    ],
    constant: false,
    anonymous: false,
  },
  {
    name: 'removeLiquidityWithPermit',
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
      {
        name: 'liquidity',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'amountAMin',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'amountBMin',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'to',
        type: 'address',
        indexed: false,
      },
      {
        name: 'deadline',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'approveMax',
        type: 'bool',
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
    outputs: [
      {
        name: 'amountA',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'amountB',
        type: 'uint256',
        indexed: false,
      },
    ],
    constant: false,
    anonymous: false,
  },
  {
    name: 'swapETHForExactTokens',
    type: 'function',
    payable: false,
    inputs: [
      {
        name: 'amountOut',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'path',
        type: 'address[]',
        indexed: false,
      },
      {
        name: 'to',
        type: 'address',
        indexed: false,
      },
      {
        name: 'deadline',
        type: 'uint256',
        indexed: false,
      },
    ],
    outputs: [
      {
        name: 'amounts',
        type: 'uint256[]',
        indexed: false,
      },
    ],
    constant: false,
    anonymous: false,
  },
  {
    name: 'swapExactETHForTokens',
    type: 'function',
    payable: false,
    inputs: [
      {
        name: 'amountOutMin',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'path',
        type: 'address[]',
        indexed: false,
      },
      {
        name: 'to',
        type: 'address',
        indexed: false,
      },
      {
        name: 'deadline',
        type: 'uint256',
        indexed: false,
      },
    ],
    outputs: [
      {
        name: 'amounts',
        type: 'uint256[]',
        indexed: false,
      },
    ],
    constant: false,
    anonymous: false,
  },
  {
    name: 'swapExactETHForTokensSupportingFeeOnTransferTokens',
    type: 'function',
    payable: false,
    inputs: [
      {
        name: 'amountOutMin',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'path',
        type: 'address[]',
        indexed: false,
      },
      {
        name: 'to',
        type: 'address',
        indexed: false,
      },
      {
        name: 'deadline',
        type: 'uint256',
        indexed: false,
      },
    ],
    outputs: [],
    constant: false,
    anonymous: false,
  },
  {
    name: 'swapExactTokensForETH',
    type: 'function',
    payable: false,
    inputs: [
      {
        name: 'amountIn',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'amountOutMin',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'path',
        type: 'address[]',
        indexed: false,
      },
      {
        name: 'to',
        type: 'address',
        indexed: false,
      },
      {
        name: 'deadline',
        type: 'uint256',
        indexed: false,
      },
    ],
    outputs: [
      {
        name: 'amounts',
        type: 'uint256[]',
        indexed: false,
      },
    ],
    constant: false,
    anonymous: false,
  },
  {
    name: 'swapExactTokensForETHSupportingFeeOnTransferTokens',
    type: 'function',
    payable: false,
    inputs: [
      {
        name: 'amountIn',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'amountOutMin',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'path',
        type: 'address[]',
        indexed: false,
      },
      {
        name: 'to',
        type: 'address',
        indexed: false,
      },
      {
        name: 'deadline',
        type: 'uint256',
        indexed: false,
      },
    ],
    outputs: [],
    constant: false,
    anonymous: false,
  },
  {
    name: 'swapExactTokensForTokens',
    type: 'function',
    payable: false,
    inputs: [
      {
        name: 'amountIn',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'amountOutMin',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'path',
        type: 'address[]',
        indexed: false,
      },
      {
        name: 'to',
        type: 'address',
        indexed: false,
      },
      {
        name: 'deadline',
        type: 'uint256',
        indexed: false,
      },
    ],
    outputs: [
      {
        name: 'amounts',
        type: 'uint256[]',
        indexed: false,
      },
    ],
    constant: false,
    anonymous: false,
  },
  {
    name: 'swapExactTokensForTokensSupportingFeeOnTransferTokens',
    type: 'function',
    payable: false,
    inputs: [
      {
        name: 'amountIn',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'amountOutMin',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'path',
        type: 'address[]',
        indexed: false,
      },
      {
        name: 'to',
        type: 'address',
        indexed: false,
      },
      {
        name: 'deadline',
        type: 'uint256',
        indexed: false,
      },
    ],
    outputs: [],
    constant: false,
    anonymous: false,
  },
  {
    name: 'swapTokensForExactETH',
    type: 'function',
    payable: false,
    inputs: [
      {
        name: 'amountOut',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'amountInMax',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'path',
        type: 'address[]',
        indexed: false,
      },
      {
        name: 'to',
        type: 'address',
        indexed: false,
      },
      {
        name: 'deadline',
        type: 'uint256',
        indexed: false,
      },
    ],
    outputs: [
      {
        name: 'amounts',
        type: 'uint256[]',
        indexed: false,
      },
    ],
    constant: false,
    anonymous: false,
  },
  {
    name: 'swapTokensForExactTokens',
    type: 'function',
    payable: false,
    inputs: [
      {
        name: 'amountOut',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'amountInMax',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'path',
        type: 'address[]',
        indexed: false,
      },
      {
        name: 'to',
        type: 'address',
        indexed: false,
      },
      {
        name: 'deadline',
        type: 'uint256',
        indexed: false,
      },
    ],
    outputs: [
      {
        name: 'amounts',
        type: 'uint256[]',
        indexed: false,
      },
    ],
    constant: false,
    anonymous: false,
  },
  {
    name: '',
    type: 'receive',
    payable: false,
    inputs: null,
    outputs: null,
    constant: false,
    anonymous: false,
  },
];
