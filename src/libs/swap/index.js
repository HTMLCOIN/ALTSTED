import {
  reactive,
  computed,
  useContext,
  watch,
  onMounted,
  getCurrentInstance,
} from '@nuxtjs/composition-api';
import BigNumber from 'bignumber.js';
import { getDeadline, slippageAmounts } from '../utils';
import {
  TYPE_SWAP,
  TYPE_ADD_LIQUIDITY,
  SWAP_EXACT_INPUT,
  SWAP_EXACT_OUTPUT,
  MINIMUM_LIQUIDITY,
  BASE_FEE,
  NETWORK,
  TYPE_APPROVE,
  DOMAIN,
} from '../constants';
import Transaction from '../transaction';
import Fraction from '../fraction';
import { useQrypto } from '../qrypto';
import Token from './token';
import TokenAmount from './token-amount';
import Pair from './pair';
import Route from './route';
import LiquidityToken from './liquidity-token';

export { Token, TokenAmount, Pair, LiquidityToken };

export class Swap {
  constructor(type) {
    const vm = getCurrentInstance();
    const {
      store: { state },
    } = useContext();
    this.vm = vm;

    this.type = type;
    this.tokenAmount0 = new TokenAmount(Token.QTUM);
    this.tokenAmount1 = new TokenAmount(null);
    this.independentTokenAmount = this.tokenAmount0;
    this.dependentTokenAmount = computed(() =>
      this.independentTokenAmount === this.tokenAmount0
        ? this.tokenAmount1
        : this.tokenAmount0
    );
    this.hashStateRoot = '';

    // data from store
    this.account = computed(() => state.swap.account);
    this.tokens = computed(() =>
      state.swap.tokens.filter(
        (token) =>
          token.isQTUM || token.chainId === NETWORK[this.account?.network]
      )
    );
    this.txs = computed(() =>
      state.swap.txs.filter((tx) => tx.address === this.account?.address)
    );
    this.tolerance = computed(() => state.swap.tolerance);
    this.deadline = computed(() => state.swap.deadline);
    this.connected = computed(() => state.swap.connected);
    this.height = computed(() => state.swap.height);

    // pairs from predefined
    this.commonTokens = computed(() => {
      return this.tokens.filter((token) => !token.imported);
    });
    this.customTokens = computed(() => {
      return this.tokens.filter((token) => token.imported);
    });
    this.commonPairs = computed(() => {
      const tokens = this.commonTokens;
      const pairs = [];
      const length = tokens.length;
      for (let i = 0; i < length - 1; i++) {
        const token0 = tokens[i];
        for (let j = i + 1; j < length; j++) {
          const token1 = tokens[j];
          pairs.push(Pair.from(token0, token1));
        }
      }
      return pairs;
    });
  }

  get tokenAmounts() {
    return [this.tokenAmount0, this.tokenAmount1];
  }

  canProcess() {
    return false;
  }

  get selected() {
    return this.tokenAmount0.selected && this.tokenAmount1.selected;
  }

  get token0() {
    return this.tokenAmount0.token;
  }

  get token1() {
    return this.tokenAmount1.token;
  }

  get invertRatio() {
    return this.ratio.invert();
  }

  makePairsWithCommonTokens(token) {
    if (!token) {
      return [];
    }
    return this.commonTokens.map((t) => Pair.from(token, t));
  }

  watchAll() {
    this.watchInput();
    this.watchToken();
    this.watchAccount();

    onMounted(() => {
      this.updateBalance(Token.QTUM);
    });
  }

  watchAccount() {
    // update balance if account has been changed
    watch(
      () => this.account,
      (account) => {
        if (account?.loggedIn) {
          this.updateTokens();
        } else {
          this.tokenAmount0.amountSatoshi = BigNumber(0);
          this.tokenAmount1.amountSatoshi = BigNumber(0);
        }
      }
    );
  }

  watchInput() {
    this.tokenAmounts.forEach((tokenAmount) =>
      watch(
        () => tokenAmount.inputing,
        (inputing) => {
          if (inputing) {
            this.independentTokenAmount = tokenAmount;
          }
        }
      )
    );
    // watch when the input changed
    watch(
      () => this.independentTokenAmount.input,
      (input) => {
        const amount = BigNumber(input || 0);
        // change the amount in Satoshi
        this.independentTokenAmount.amount = amount;
        // if it's not the current input, don't change anything
        if (!this.independentTokenAmount.inputing) {
          return;
        }
        this.updateDependentTokenAmount();
      }
    );
  }

  updateDependentTokenAmount() {}

  watchToken() {
    // update each token if it changes
    this.tokenAmounts.forEach((tokenAmount) => {
      watch(
        () => tokenAmount.token,
        (token) => {
          // tokenAmount.input = ''
          this.updateBalance(token);
          this.updateShouldApprove(token);
          this.updateDependentTokenAmount();
        }
      );
      const stop = watch(
        () => tokenAmount.token,
        () => {
          if (this.commonPairs.length > 0) {
            stop();
          }
        }
      );
    });
    watch(
      () => this.tokens,
      () => {
        this.updateTokens();
      }
    );
  }

  async approve(tokenAmount) {
    const token = tokenAmount.token;
    this.updateToken(token, {
      approving: true,
    });
    try {
      const tx = await useQrypto().tryToApprove(token, tokenAmount.amount);
      if (tx === true) {
        this.updateToken(token, {
          shouldApprove: false,
          approving: false,
        });
      } else if (tx instanceof Transaction) {
        tx.on('confirmed', () => {
          this.updateToken(token, {
            shouldApprove: false,
            approving: false,
          });
        });
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn('approve failed', e);
    }
  }

  switchTokens() {
    [this.tokenAmount1, this.tokenAmount0] = [
      this.tokenAmount0,
      this.tokenAmount1,
    ];
  }

  changeToken(index, token) {
    this[`tokenAmount${index}`].token = token;
  }

  getReserves() {
    return useQrypto().getReserves(
      this.tokenAmount0.wrappedToken,
      this.tokenAmount1.wrappedToken
    );
  }

  async updateShouldApprove(token) {
    let shouldApprove = false;
    let approving = false;
    if (token.isQTUM) {
      shouldApprove = false;
    } else {
      const tx = this.txs.find(
        (tx) => tx.type === TYPE_APPROVE && tx.token.address === token.address
      );
      if (tx) {
        shouldApprove = tx.raw.confirmations === 0;
        if (shouldApprove) {
          approving = true;
        }
      } else {
        shouldApprove = await useQrypto().shouldApprove(token);
      }
    }
    this.updateToken(token, {
      shouldApprove,
      approving,
    });
  }

  updateToken(token, values) {
    this.vm.proxy.$store.commit('swap/updateToken', { token, values });
  }

  updateTokens() {
    this.tokens.forEach((token) => {
      this.updateBalance(token);
      this.updateShouldApprove(token);
    });
  }

  async updateBalance(token, forceUpdate = false) {
    if (!token) {
      return;
    }
    const balance = await token.getBalance(forceUpdate);
    this.updateToken(token, {
      balanceSatoshi: balance,
    });
  }

  slippageAmounts(value) {
    const tolerance = this.tolerance;
    return slippageAmounts(value, tolerance);
  }
}

class Exchange extends Swap {
  constructor() {
    super(TYPE_SWAP);

    this.maximumAmountIn = computed(() => {
      if (this.exactInput) {
        return this.tokenAmount0.amountSatoshi;
      }
      return this.tokenAmount0.amountSatoshi
        .times(100 + this.tolerance)
        .div(100)
        .dp(0, BigNumber.ROUND_DOWN);
    });
    this.minimumAmountOut = computed(() => {
      if (this.exactOutput) {
        return this.tokenAmount1.amountSatoshi;
      }
      return this.tokenAmount1.amountSatoshi
        .times(100)
        .div(100 + this.tolerance)
        .dp(0, BigNumber.ROUND_DOWN);
    });

    this.allPairs = computed(() => {
      const token0Pairs = this.commonTokens.includes(this.token0)
        ? []
        : this.makePairsWithCommonTokens(this.token0);
      const token1Pairs = this.commonTokens.includes(this.token1)
        ? []
        : this.makePairsWithCommonTokens(this.token1);
      return [
        ...(token0Pairs.length > 0 && token1Pairs.length > 0
          ? [Pair.from(this.token0, this.token1)]
          : []),
        ...token0Pairs,
        ...token1Pairs,
        ...this.commonPairs,
      ];
    });
    this.routes = computed(() => {
      if (!this.selected) {
        return [];
      }
      if (this.independentTokenAmount.amount.eq(0)) {
        return [];
      }
      return this.exactInput
        ? Route.bestRoutesExactIn(
            this.allPairs,
            new TokenAmount(this.token0, this.tokenAmount0.amountSatoshi),
            this.token1
          )
        : Route.bestRoutesExactOut(
            this.allPairs,
            this.token0,
            new TokenAmount(this.token1, this.tokenAmount1.amountSatoshi)
          );
    });
    this.route = computed(() => this.routes[0]);
    this.fee = computed(() => {
      if (!this.route) {
        return new Fraction(0);
      }
      return new Fraction(1).minus(
        this.route.pairs.reduce(
          (fee) => fee.times(1 - BASE_FEE),
          new Fraction(1)
        )
      );
    });
    this.priceImpact = computed(() => {
      if (!this.route) {
        return new Fraction(0);
      }
      return this.route.priceImpact.minus(this.fee);
    });
    this.ratio = computed(() => {
      if (!this.route) {
        return new Fraction(0);
      }
      return this.route.price;
    });
  }

  get canProcess() {
    return this.route !== undefined || this.independentTokenAmount.amount.eq(0);
  }

  get swapType() {
    // see if last input is token0 or token1
    return this.independentTokenAmount === this.tokenAmount0
      ? SWAP_EXACT_INPUT
      : SWAP_EXACT_OUTPUT;
  }

  get exactInput() {
    return this.swapType === SWAP_EXACT_INPUT;
  }

  get exactOutput() {
    return this.swapType === SWAP_EXACT_OUTPUT;
  }

  async swapTokens() {
    const qrypto = useQrypto();
    try {
      const tokenAmount0 = this.tokenAmount0;
      const tokenAmount1 = this.tokenAmount1;
      const isQTUM0 = tokenAmount0.token.isQTUM;
      const isQTUM1 = tokenAmount1.token.isQTUM;
      const amountIn = this.maximumAmountIn;
      const amountOut = this.minimumAmountOut;
      const path = this.route.path.map((token) =>
        qrypto.wrapHex(Token.wrapToken(token).address)
      );
      const to = qrypto.wrapHex(qrypto.hexAddress);
      const deadline = getDeadline(this.deadline);
      let method;
      let value = BigNumber(0);
      let params;
      // be careful for the params
      switch (this.swapType) {
        case SWAP_EXACT_INPUT:
          if (isQTUM0) {
            method = 'swapExactETHForTokens';
            params = [amountOut, path, to, deadline];
            value = amountIn;
          } else if (isQTUM1) {
            method = 'swapExactTokensForETH';
            params = [amountIn, amountOut, path, to, deadline];
          } else {
            method = 'swapExactTokensForTokens';
            params = [amountIn, amountOut, path, to, deadline];
          }
          break;
        case SWAP_EXACT_OUTPUT:
          if (isQTUM0) {
            method = 'swapETHForExactTokens';
            params = [amountOut, path, to, deadline];
            value = amountIn;
          } else if (isQTUM1) {
            method = 'swapTokensForExactETH';
            params = [amountOut, amountIn, path, to, deadline];
          } else {
            method = 'swapTokensForExactTokens';
            params = [amountOut, amountIn, path, to, deadline];
          }
          break;
      }
      value = value.div(10 ** Token.QTUM.decimals).toString();
      const tx = await qrypto.swap(method, params, value, {
        gasLimitPlus: 50000 * (path.length - 1),
      });
      if (tx instanceof Transaction) {
        qrypto.emit('tx', {
          type: TYPE_SWAP,
          raw: tx,
          tokenAmount0,
          tokenAmount1,
        });
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn('swap error', e);
    }
  }

  watchAll() {
    super.watchAll();

    watch(
      () => this.height,
      async (height) => {
        if (height > 0) {
          try {
            const { hashStateRoot } = await this.vm.proxy.$axios.$get(
              `https://${DOMAIN[this.account?.network]}/api/block/${height}`
            );
            if (this.hashStateRoot !== hashStateRoot) {
              this.hashStateRoot = hashStateRoot;
              Pair.updatePairs();
              this.updateTokens();
            }
          } catch (e) {
            // eslint-disable-next-line no-console
            console.warn(e);
          }
        }
      }
    );

    watch(
      () => this.ratio,
      () => {
        this.updateDependentTokenAmount();
      }
    );
  }

  updateDependentTokenAmount() {
    const ratio = this.exactInput ? this.ratio : this.ratio.invert();
    const amount = ratio.times(this.independentTokenAmount.amount).quotient;
    this.dependentTokenAmount.amount = amount;
    this.dependentTokenAmount.input = this.dependentTokenAmount.amount.eq(0)
      ? ''
      : this.dependentTokenAmount.amount.toString();
  }
}

class Pool extends Swap {
  constructor() {
    super(TYPE_ADD_LIQUIDITY);
    this.allPairs = computed(() => [
      ...this.commonPairs,
      ...this.customTokens
        .map((token) => this.commonTokens.map((t) => Pair.from(token, t)))
        .reduce((customPairs, pairs) => [...customPairs, ...pairs], []),
    ]);
    this.pair = computed(() => {
      if (this.selected) {
        return Pair.from(this.token0, this.token1);
      }
      return reactive(Pair.NULL);
    });
    this.shareOfPool = computed(() => {
      if (!this.pair.exists) {
        return new Fraction(
          this.tokenAmount0.amount.gt(0) && this.tokenAmount1.amount.gt(0)
            ? 100
            : 0
        );
      }
      // share of pool
      let minted;
      if (this.pair.totalSupply.eq(0)) {
        minted =
          this.tokenAmount0.amount.times(this.tokenAmount1.amount).sqrt() -
          MINIMUM_LIQUIDITY;
      } else {
        const amount0 = this.tokenAmount0.amount
          .times(this.pair.totalSupply)
          .div(this.pair.reserve0);
        const amount1 = this.tokenAmount1.amount
          .times(this.pair.totalSupply)
          .div(this.pair.reserve1);
        minted = amount0.lt(amount1) ? amount0 : amount1;
      }
      return new Fraction(
        minted,
        this.pair.totalSupply.div(10 ** 8).plus(minted)
      ).times(100);
    });
    this.ratio = computed(() => {
      if (this.pair.exists) {
        return this.pair.priceOf(this.token0);
      } else {
        const amount0 = this.tokenAmount0.amount;
        const amount1 = this.tokenAmount1.amount;
        return amount0.gt(0) && amount1.gt(0)
          ? new Fraction(amount1, amount0)
          : new Fraction(0);
      }
    });
  }

  get canProcess() {
    return true;
  }

  async addLiquidity() {
    const qrypto = useQrypto();
    try {
      const tokenAmount0 = this.tokenAmount0;
      const tokenAmount1 = this.tokenAmount1;
      const isQTUM0 = tokenAmount0.token.isQTUM;
      const isQTUM1 = tokenAmount1.token.isQTUM;
      const amount0 = tokenAmount0.amountSatoshi;
      const amount1 = tokenAmount1.amountSatoshi;
      // use the min value
      const minAmount0 = this.slippageAmounts(amount0)[0];
      const minAmount1 = this.slippageAmounts(amount1)[0];
      let method;
      let params;
      let value = 0;
      if (isQTUM0) {
        method = 'addLiquidityETH';
        params = [
          qrypto.wrapHex(tokenAmount1.address),
          amount1,
          minAmount1,
          minAmount0,
          qrypto.wrapHex(qrypto.hexAddress),
          getDeadline(this.deadline),
        ];
        value = tokenAmount0.amount.toString();
      } else if (isQTUM1) {
        method = 'addLiquidityETH';
        params = [
          qrypto.wrapHex(tokenAmount0.address),
          amount0,
          minAmount0,
          minAmount1,
          qrypto.wrapHex(qrypto.hexAddress),
          getDeadline(this.deadline),
        ];
        value = tokenAmount1.amount.toString();
      } else {
        method = 'addLiquidity';
        params = [
          qrypto.wrapHex(tokenAmount0.address),
          qrypto.wrapHex(tokenAmount1.address),
          amount0,
          amount1,
          minAmount0,
          minAmount1,
          qrypto.wrapHex(qrypto.hexAddress),
          getDeadline(this.deadline),
        ];
      }
      // if pair doesn't exists, it will cost around 2655000 gas
      const tx = await qrypto.swap(method, params, value, {
        gasLimitPlus: 50000,
      });
      if (tx instanceof Transaction) {
        qrypto.emit('tx', {
          type: TYPE_ADD_LIQUIDITY,
          raw: tx,
          tokenAmount0,
          tokenAmount1,
        });
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn('add error', e);
    }
  }

  updateDependentTokenAmount() {
    if (!this.pair.exists) {
      return;
    }
    const ratio =
      this.independentTokenAmount === this.tokenAmount0
        ? this.ratio
        : this.ratio.invert();
    const amount = ratio.times(this.independentTokenAmount.amount).quotient;
    this.dependentTokenAmount.amount = amount.isNaN() ? BigNumber(0) : amount;
    this.dependentTokenAmount.input = this.dependentTokenAmount.amount.eq(0)
      ? ''
      : this.dependentTokenAmount.amount.toString();
  }
}

export const useExchange = () => {
  const exchange = reactive(new Exchange());
  exchange.watchAll();
  return exchange;
};

export const usePool = () => {
  const pool = reactive(new Pool());
  pool.watchAll();
  return pool;
};
