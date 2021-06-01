import BigNumber from 'bignumber.js';
import { useQrypto } from '../qrypto';
import { NETWORK, WQTUM, ZERO_ADDRESS } from '../../constants/constants';

export function isSameToken(token0, token1) {
  return token0?.address === token1?.address;
}

export function sortTokens(token0, token1) {
  if (token1?.address < token0?.address) {
    return [token1, token0];
  }
  return [token0, token1];
}

export default class Token {
  constructor({
    name,
    decimals,
    symbol,
    address,
    chainId,
    icon = '/icons/default.svg',
    totalSupply,
    balanceSatoshi,
    imported = false,
  }) {
    this.name = name;
    this.decimals = decimals;
    this.symbol = symbol;
    this.address = address || ZERO_ADDRESS;
    this.chainId = chainId;
    this.icon = icon;
    this.totalSupply = BigNumber(totalSupply || 0);
    this.balanceSatoshi = BigNumber(balanceSatoshi || 0);
    this.loadingBalance = false;
    this.imported = imported;
    this.approving = false;
    this.shouldApprove = false;
  }

  eq(token) {
    return (
      (token?.isQTUM && this.isQTUM) ||
      token === this ||
      isSameToken(this, token)
    );
  }

  get isQTUM() {
    return this === Token.QTUM || this === Token.wrapToken(Token.QTUM);
  }

  get balance() {
    return this.getAmount(this.balanceSatoshi);
  }

  getAmount(amountSatoshi) {
    return BigNumber(amountSatoshi || 0).div(10 ** this.decimals);
  }

  async getBalance(forceUpdate = false) {
    const qrypto = useQrypto();
    if (this.isQTUM) {
      return BigNumber(qrypto.account?.balance || 0).times(
        10 ** Token.QTUM.decimals
      );
    } else {
      return await qrypto.getTokenBalance(this, forceUpdate);
    }
  }

  async updateTotalSupply(forceUpdate = false) {
    this.totalSupply = await useQrypto().getTotalSupply(this, forceUpdate);
  }

  static wrapToken(token) {
    const chainId = NETWORK[useQrypto().account?.network];
    return token instanceof Token
      ? token.isQTUM
        ? Token.WQTUM[chainId]
        : token
      : undefined;
  }
}

Token.QTUM = new Token({
  name: 'Qtum',
  symbol: 'QTUM',
  decimals: 8,
  icon: '/icons/qtum.svg',
});

Token.NULL = new Token({});

Token.WQTUM = Object.fromEntries(
  WQTUM.map((wQtum) => [
    wQtum.chainId,
    new Token({
      name: 'Wrapped Qtum',
      symbol: 'WQTUM',
      decimals: 8,
      icon: '/icons/qtum.svg',
      ...wQtum,
    }),
  ])
);
