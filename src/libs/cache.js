
import store from 'store';
import sha256 from 'crypto-js/sha256';

class Cache extends Map {
  get(key) {
    const data = super.get(key);
    if (!data) {
      return;
    }
    const { expiredAt, value } = data;
    if (expiredAt < Date.now()) {
      return;
    }
    return value;
  }

  set(key, value, ttl = 60) {
    const data = {
      value,
      expiredAt: new Date(Date.now() + ttl * 1000),
    };
    return super.set(key, data);
  }
}

const cache = new Cache();

function generateKey(params) {
  return sha256(JSON.stringify(params));
}

export const useCache = (params, callback, ttl = 60, forceUpdate = false) => {
  const key = generateKey(params);
  let value = cache.get(key);
  if (!value || forceUpdate) {
    value = callback();
    cache.set(key, value, ttl);
  }
  return value;
};

export const removeCache = (params) => {
  const key = generateKey(params);
  const value = cache.get(key);
  cache.delete(key);
  return value;
};

export const usePersist = (params, callback, forceUpdate = false) => {
  const key = generateKey(params);
  let value = store.get(key);
  if (!value || forceUpdate) {
    value = callback();
    if (value instanceof Promise) {
      value.then((value) => {
        if (value !== undefined) {
          store.set(key, value);
        }
      });
    } else if (value !== undefined) {
      store.set(key, value);
    }
  }
  return value;
};

export const removePersist = (params) => {
  const key = generateKey(params);
  const value = store.get(key);
  store.remove(key);
  return value;
};
