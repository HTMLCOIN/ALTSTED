import { computed, reactive } from '@nuxtjs/composition-api';
import { SWAP_EXACT_INPUT, SWAP_EXACT_OUTPUT } from '../constants';
import Fraction from '../fraction';
import { sortedInsert } from '../utils';

export function comparator(a, b) {
  let temp = 0;
  if (a.outputTokenAmount.amount.eq(b.outputTokenAmount.amount)) {
    if (a.inputTokenAmount.amount.lt(b.inputTokenAmount.amount)) {
      temp = -1;
    } else {
      temp = 1;
    }
  } else if (a.outputTokenAmount.amount.lt(b.outputTokenAmount.amount)) {
    temp = 1;
  } else {
    temp = -1;
  }
  if (temp !== 0) {
    return temp;
  }

  // consider lowest slippage next, since these are less likely to fail
  if (a.priceImpact.lt(b.priceImpact)) {
    return -1;
  } else if (a.priceImpact.gt(b.priceImpact)) {
    return 1;
  }

  // finally consider the number of hops since each hop costs gas
  return a.pairs.length - b.pairs.length;
}

export default class Route {
  constructor(pairs, tokenAmount, type) {
    this.pairs = pairs;
    this.tokenAmount = tokenAmount;
    this.type = type;
    this.path = computed(() => {
      const path = new Array(this.pairs.length + 1);
      if (this.exactInput) {
        path[0] = this.inputTokenAmount.token;
        for (let i = 0; i < this.pairs.length; i++) {
          const pair = this.pairs[i];
          path[i + 1] = pair.anotherTokenOf(path[i]);
        }
      } else {
        path[path.length - 1] = this.outputTokenAmount.token;
        for (let i = this.pairs.length; i > 0; i--) {
          const pair = this.pairs[i - 1];
          path[i - 1] = pair.anotherTokenOf(path[i]);
        }
      }
      return path;
    });
    this.tokenAmounts = computed(() => {
      const tokenAmounts = new Array(this.pairs.length + 1);
      if (this.exactInput) {
        tokenAmounts[0] = this.tokenAmount;
        for (let i = 0; i < this.pairs.length; i++) {
          const pair = this.pairs[i];
          const tokenAmount = pair.getAmountOut(tokenAmounts[i]);
          tokenAmounts[i + 1] = tokenAmount;
        }
      } else {
        tokenAmounts[tokenAmounts.length - 1] = this.tokenAmount;
        for (let i = this.pairs.length; i > 0; i--) {
          const pair = this.pairs[i - 1];
          const tokenAmount = pair.getAmountIn(tokenAmounts[i]);
          tokenAmounts[i - 1] = tokenAmount;
        }
      }
      return tokenAmounts;
    });
    this.inputTokenAmount = computed(() => {
      if (this.exactInput) {
        return this.tokenAmount;
      }
      return this.tokenAmounts[0];
    });
    this.outputTokenAmount = computed(() => {
      if (this.exactOutput) {
        return this.tokenAmount;
      }
      return this.tokenAmounts[this.tokenAmounts.length - 1];
    });
    this.price = computed(() => {
      return new Fraction(
        this.outputTokenAmount.amount,
        this.inputTokenAmount.amount
      );
    });
    this.priceStr = computed(() => this.price.toString());
    this.midPrice = computed(() => {
      let token = this.path[0];
      const prices = this.pairs.map((pair) => {
        const price = pair.priceOf(token);
        token = pair.anotherTokenOf(token);
        return price;
      });
      return prices.reduce(
        (price, currnetPrice) => price.times(currnetPrice),
        new Fraction(1)
      );
    });
    this.priceImpact = computed(() => {
      const exactQuote = this.midPrice.times(this.inputTokenAmount.amount);
      const slippage = exactQuote
        .minus(this.outputTokenAmount.amount)
        .div(exactQuote);
      return slippage;
    });
    this.priceImpactStr = computed(() => this.priceImpact.toString());
  }

  get exactInput() {
    return this.type === SWAP_EXACT_INPUT;
  }

  get exactOutput() {
    return this.type === SWAP_EXACT_OUTPUT;
  }

  static bestRoutesExactIn(
    pairs,
    tokenAmountIn,
    tokenOut,
    { maxNumResults = 5, maxHops = 4 } = {},
    currentPairs = [],
    originalTokenAmount = tokenAmountIn,
    bestRoutes = []
  ) {
    for (let i = 0; i < pairs.length; i++) {
      const pair = pairs[i];
      // pair irrelevant
      if (
        !pair.token0.eq(tokenAmountIn.token) &&
        !pair.token1.eq(tokenAmountIn.token)
      ) {
        continue;
      }
      if (pair.reserve0.eq(0) || pair.reserve1.eq(0)) {
        continue;
      }

      const tokenAmount = pair.getAmountOut(tokenAmountIn);
      if (tokenAmount.amount.eq(0)) {
        continue;
      }
      // we have arrived at the output token, so this is the final trade of one of the paths
      if (tokenAmount.token.eq(tokenOut)) {
        sortedInsert(
          bestRoutes,
          reactive(
            new Route(
              [...currentPairs, pair],
              originalTokenAmount,
              SWAP_EXACT_INPUT
            )
          ),
          maxNumResults,
          comparator
        );
      } else if (maxHops > 1 && pairs.length > 1) {
        const pairsExcludingThisPair = pairs
          .slice(0, i)
          .concat(pairs.slice(i + 1, pairs.length));

        // otherwise, consider all the other paths that lead from this token as long as we have not exceeded maxHops
        Route.bestRoutesExactIn(
          pairsExcludingThisPair,
          tokenAmount,
          tokenOut,
          {
            maxNumResults,
            maxHops: maxHops - 1,
          },
          [...currentPairs, pair],
          originalTokenAmount,
          bestRoutes
        );
      }
    }

    return bestRoutes;
  }

  static bestRoutesExactOut(
    pairs,
    tokenIn,
    tokenAmountOut,
    { maxNumResults = 5, maxHops = 4 } = {},
    currentPairs = [],
    originalTokenAmount = tokenAmountOut,
    bestRoutes = []
  ) {
    for (let i = 0; i < pairs.length; i++) {
      const pair = pairs[i];
      // pair irrelevant
      if (
        !pair.token0.eq(tokenAmountOut.token) &&
        !pair.token1.eq(tokenAmountOut.token)
      ) {
        continue;
      }
      if (pair.reserve0.eq(0) || pair.reserve1.eq(0)) {
        continue;
      }

      const tokenAmount = pair.getAmountIn(tokenAmountOut);
      if (tokenAmount.amount.eq(0)) {
        continue;
      }
      // we have arrived at the input token, so this is the first trade of one of the paths
      if (tokenAmount.token.eq(tokenIn)) {
        sortedInsert(
          bestRoutes,
          reactive(
            new Route(
              [pair, ...currentPairs],
              originalTokenAmount,
              SWAP_EXACT_OUTPUT
            )
          ),
          maxNumResults,
          comparator
        );
      } else if (maxHops > 1 && pairs.length > 1) {
        const pairsExcludingThisPair = pairs
          .slice(0, i)
          .concat(pairs.slice(i + 1, pairs.length));

        // otherwise, consider all the other paths that arrive at this token as long as we have not exceeded maxHops
        Route.bestRoutesExactOut(
          pairsExcludingThisPair,
          tokenIn,
          tokenAmount,
          {
            maxNumResults,
            maxHops: maxHops - 1,
          },
          [pair, ...currentPairs],
          originalTokenAmount,
          bestRoutes
        );
      }
    }

    return bestRoutes;
  }
}
