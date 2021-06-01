import { reactive } from '@nuxtjs/composition-api';
import BigNumber from 'bignumber.js';
import { ZERO_ADDRESS } from '../constants';
import Fraction from '../fraction';
import { useQrypto } from '../qrypto';
import Token, { sortTokens } from './token';
import TokenAmount from './token-amount';

const pairs = {};

export default class Pair extends Token {
  reserve0 = BigNumber(0);
  reserve1 = BigNumber(0);

  constructor(token0, token1) {
    [token0, token1] = sortTokens(token0, token1);
    super({
      chainId: token0.chainId || token1.chainId,
      decimals: 8,
      name: `QI Swap Liquidity Token -- ${token0.name} : ${token1.name}`,
      symbol: `QILP-${token0.symbol}_${token1.symbol}`,
    });
    this.tokens = [token0, token1];
    this.exists = false;
    this.updating = false;
  }

  static updatePairs() {
    // console.log('update pairs');
    for (const _pairs of Object.values(pairs)) {
      for (const pair of Object.values(_pairs)) {
        pair.init(true);
      }
    }
  }

  static from(token0, token1) {
    [token0, token1] = sortTokens(token0, token1);
    if (
      !pairs[Token.wrapToken(token0).address]?.[Token.wrapToken(token1).address]
    ) {
      const pair = reactive(new Pair(token0, token1));
      pair.init();
      pairs[Token.wrapToken(token0).address] = {
        ...pairs[Token.wrapToken(token0).address],
        [Token.wrapToken(token1).address]: pair,
      };
    }
    return pairs[Token.wrapToken(token0).address]?.[
      Token.wrapToken(token1).address
    ];
  }

  async init(forceUpdate = false) {
    if (this.updating) {
      // return
    }
    this.updating = true;
    try {
      const qrypto = useQrypto();
      if (!this.exists) {
        this.address = await qrypto.getPair(this.token0, this.token1);
        this.exists = this.address !== ZERO_ADDRESS;
      }
      if (this.exists) {
        this.updateReserves(forceUpdate);
        this.updateTotalSupply(forceUpdate);
      }
    } catch (e) {}
    this.updating = false;
  }

  priceOf(token) {
    const price = new Fraction(
      this.token1.getAmount(this.reserve1),
      this.token0.getAmount(this.reserve0)
    );
    return this.token0.eq(token) ? price : price.invert();
  }

  reserveOf(token) {
    return this.token0.eq(token) ? this.reserve0 : this.reserve1;
  }

  anotherTokenOf(token) {
    return this.token0.eq(token) ? this.tokens[1] : this.tokens[0];
  }

  getAmountIn({ amountSatoshi: amountOut, token }) {
    const anotherToken = this.anotherTokenOf(token);
    const reserveOut = this.reserveOf(token);
    const reserveIn = this.reserveOf(anotherToken);
    if (
      amountOut.eq(0) ||
      reserveIn.eq(0) ||
      reserveOut.eq(0) ||
      amountOut.gt(reserveOut)
    ) {
      return new TokenAmount(anotherToken);
    }
    // amountIn = reserveIn / (0.997 * (reserveOut / amountOut - 1)) + 1
    // amountOut -> reserveOut => amountIn -> ∞
    const numerator = reserveIn.times(amountOut).times(1000);
    const denominator = reserveOut.minus(amountOut).times(997);
    return new TokenAmount(anotherToken, numerator.idiv(denominator).plus(1));
  }

  getAmountOut({ amountSatoshi: amountIn, token }) {
    const anotherToken = this.anotherTokenOf(token);
    const reserveIn = this.reserveOf(token);
    const reserveOut = this.reserveOf(anotherToken);
    if (amountIn.eq(0) || reserveIn.eq(0) || reserveOut.eq(0)) {
      return new TokenAmount(anotherToken);
    }
    // amountOut = reserveOut / (0.997 * reserveIn / amountIn + 1)
    // amountIn -> ∞ => amountOut -> reserveOut
    const amountInWithFee = amountIn.times(997);
    const numerator = amountInWithFee.times(reserveOut);
    const denominator = reserveIn.times(1000).plus(amountInWithFee);
    return new TokenAmount(anotherToken, numerator.idiv(denominator));
  }

  async updateReserves(forceUpdate = false) {
    [this.reserve0, this.reserve1] = await useQrypto().getReserves(
      this.token0,
      this.token1,
      forceUpdate
    );
  }

  get token0() {
    return Token.wrapToken(this.tokens[0]);
  }

  get token1() {
    return Token.wrapToken(this.tokens[1]);
  }
}

Pair.NULL = new Pair(Token.NULL, Token.NULL);
