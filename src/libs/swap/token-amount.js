import BigNumber from 'bignumber.js';
import { NETWORK } from '../constants';
import Token, { sortTokens } from './token';

export function sortTokenAmounts(tokenAmount0, tokenAmount1) {
  const [token0] = sortTokens(
    tokenAmount0.wrappedToken,
    tokenAmount1.wrappedToken
  );
  return tokenAmount0.wrappedToken.eq(token0)
    ? [tokenAmount0, tokenAmount1]
    : [tokenAmount1, tokenAmount0];
}

export default class TokenAmount {
  constructor(token, amountSatoshi = BigNumber(0)) {
    this.token = token;
    this.amountSatoshi = amountSatoshi;
    this.input = '';
    this.inputing = false;
  }

  get wrappedToken() {
    return Token.wrapToken(this.token);
  }

  get amountExceeded() {
    return this.amountSatoshi.gt(this.balanceSatoshi);
  }

  get amount() {
    return this.getAmount(this.amountSatoshi);
  }

  set amount(amount) {
    const amountSatoshi = BigNumber(amount)
      .times(10 ** this.decimals)
      .dp(0, BigNumber.ROUND_DOWN);
    this.amountSatoshi = amountSatoshi;
  }

  get balanceSatoshi() {
    return this.token?.balanceSatoshi || BigNumber(0);
  }

  get balance() {
    return this.token?.balance || BigNumber(0);
  }

  get selected() {
    return this.token instanceof Token;
  }

  get approving() {
    return this.token?.approving;
  }

  get shouldApprove() {
    return this.token?.shouldApprove;
  }

  getAmount(amountSatoshi) {
    return BigNumber(amountSatoshi).div(10 ** this.decimals);
  }

  get name() {
    return this.token?.name;
  }

  get decimals() {
    return this.token?.decimals || 0;
  }

  get address() {
    return this.token?.address;
  }

  get symbol() {
    return this.token?.symbol;
  }

  get chainId() {
    return this.token?.chainId || NETWORK.MainNet;
  }
}
