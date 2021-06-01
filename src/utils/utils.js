import BigNumber from 'bignumber.js';

export function isSameToken(token0, token1) {
  return token0?.address === token1?.address;
}

export function sortTokens(token0, token1) {
  if (token1?.address < token0?.address) {
    [token0, token1] = [token1, token0];
  }
  return [token0, token1];
}

export function getDeadline(deadlineMinutes) {
  const deadline = new Date();
  deadline.setMinutes(deadline.getMinutes() + deadlineMinutes);
  return (deadline.getTime() / 1000) | 0;
}

export function slippageAmounts(value, tolerance) {
  if (tolerance < 0 || tolerance > 100) {
    throw new Error(`Unexpected slippage value: ${tolerance}`);
  }
  // [(1 - slippage) * value, (1 + slippage) * value]
  return [
    value
      .times(100 - tolerance)
      .div(100)
      .dp(0, BigNumber.ROUND_DOWN),
    value
      .times(100 + tolerance)
      .div(100)
      .dp(0, BigNumber.ROUND_DOWN),
  ];
}

export function sortedInsert(items, item, maxSize, comparator) {
  if (items.length === 0) {
    items.push(item);
    return null;
  } else {
    const isFull = items.length === maxSize;
    // short circuit if full and the additional item does not come before the last item
    if (isFull && comparator(items[items.length - 1], item) <= 0) {
      return item;
    }

    let left = 0;
    let right = items.length;

    while (left < right) {
      const middle = (left + right) >>> 1;
      if (comparator(items[middle], item) <= 0) {
        left = middle + 1;
      } else {
        right = middle;
      }
    }
    items.splice(left, 0, item);
    return isFull ? items.pop() : null;
  }
}
