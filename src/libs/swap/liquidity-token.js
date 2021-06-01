import { computed, watch } from '@nuxtjs/composition-api';
import BigNumber from 'bignumber.js';
import { TYPE_REMOVE_LIQUIDITY } from '../constants';
import Fraction from '../fraction';
import { useQrypto } from '../qrypto';
import Transaction from '../transaction';
import { getDeadline, slippageAmounts } from '../utils';
import Pair from './pair';
import Token from './token';
import TokenAmount from './token-amount';

export default class LiquidityToken extends Pair {
  constructor(pair) {
    super(new Token(pair.tokens[0]), new Token(pair.tokens[1]));
    this.isQTUM0 = pair.tokens[0].isQTUM;
    this.isQTUM1 = pair.tokens[1].isQTUM;
    this.exists = computed(() => pair.exists);
    this.address = computed(() => pair.address);
    this.balanceSatoshi = computed(() => pair.balanceSatoshi);
    this.totalSupply = computed(() => pair.totalSupply);
    this.reserve0 = computed(() => pair.reserve0);
    this.reserve1 = computed(() => pair.reserve1);
    this.pooledRatio = computed(
      () => new Fraction(this.balanceSatoshi, this.totalSupply)
    );

    this.token0.balanceSatoshi = computed(() =>
      this.pooledRatio.times(this.reserve0).quotient.dp(0)
    );
    this.token1.balanceSatoshi = computed(() =>
      this.pooledRatio.times(this.reserve1).quotient.dp(0)
    );

    this.tokenAmount0 = new TokenAmount(this.token0);
    this.tokenAmount1 = new TokenAmount(this.token1);

    this.amountSatoshi = BigNumber(0);
    this.input = '';
    this.percent = new Fraction(0);
  }

  get amount() {
    return this.getAmount(this.amountSatoshi);
  }

  get selected() {
    return true;
  }

  get pooledPercent() {
    return this.pooledRatio.times(100).toSd(2);
  }

  get token() {
    return this;
  }

  watchAll() {
    const tokenAmounts = [this, this.tokenAmount0, this.tokenAmount1];
    tokenAmounts.forEach((tokenAmount) => {
      watch(
        () => tokenAmount.input,
        (input) => {
          tokenAmount.amountSatoshi = BigNumber(input || 0)
            .times(10 ** tokenAmount.decimals)
            .dp(0, BigNumber.ROUND_DOWN);
          if (!tokenAmount.inputing) {
            return;
          }
          this.percent = new Fraction(
            tokenAmount.amountSatoshi,
            tokenAmount.balanceSatoshi
          );
        }
      );
      watch(
        () => this.percent,
        (percent) => {
          this.input = percent.times(this.balance).toFixed(this.decimals);
          this.tokenAmount0.input = percent.eq(0)
            ? ''
            : percent
                .times(this.tokenAmount0.balance)
                .toFixed(this.tokenAmount0.decimals);
          this.tokenAmount1.input = percent.eq(0)
            ? ''
            : percent
                .times(this.tokenAmount1.balance)
                .toFixed(this.tokenAmount1.decimals);
        }
      );
    });
  }

  async remove(tolerance, deadline) {
    if (this.processing) {
      return;
    }
    // this.processing = true
    const qrypto = useQrypto();
    try {
      const tokenAmount0 = this.tokenAmount0;
      const tokenAmount1 = this.tokenAmount1;
      const isQTUM0 = this.isQTUM0;
      const isQTUM1 = this.isQTUM1;
      const amount0 = tokenAmount0.amountSatoshi;
      const amount1 = tokenAmount1.amountSatoshi;
      const amount = this.amountSatoshi;
      // use the min value
      const minAmount0 = slippageAmounts(amount0, tolerance)[0];
      const minAmount1 = slippageAmounts(amount1, tolerance)[0];
      let method;
      let params;
      const value = 0;
      if (isQTUM0) {
        method = 'removeLiquidityETH';
        params = [
          qrypto.wrapHex(tokenAmount1.address),
          amount,
          minAmount1,
          minAmount0,
          qrypto.wrapHex(qrypto.hexAddress),
          getDeadline(deadline),
        ];
      } else if (isQTUM1) {
        method = 'removeLiquidityETH';
        params = [
          qrypto.wrapHex(tokenAmount0.address),
          amount,
          minAmount0,
          minAmount1,
          qrypto.wrapHex(qrypto.hexAddress),
          getDeadline(deadline),
        ];
      } else {
        method = 'removeLiquidity';
        params = [
          qrypto.wrapHex(tokenAmount0.address),
          qrypto.wrapHex(tokenAmount1.address),
          amount,
          minAmount0,
          minAmount1,
          qrypto.wrapHex(qrypto.hexAddress),
          getDeadline(deadline),
        ];
      }
      const tx = await qrypto.swap(method, params, value, {
        gasLimitPlus: 100000,
      });
      if (tx instanceof Transaction) {
        qrypto.emit('tx', {
          type: TYPE_REMOVE_LIQUIDITY,
          raw: tx,
          tokenAmount0,
          tokenAmount1,
        });
        await tx.confirm();
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn('add error', e);
    } finally {
      // this.processing = false
    }
  }
}
