import store from 'store';
import { Token } from '~/libs/swap';
import Transaction from '~/libs/transaction';

export const state = () => ({
  extensionId: 'pdcafmmpfphfnngcbpiopmafdjgpbakg',
  extensionInstalled: false,
  connected: false,
  height: 0,
  account: null,
  tolerance: 0.5,
  deadline: 20,
  tokens: [],
  txs: [],
});

export const mutations = {
  setExtensionId(state, extensionId) {
    state.extensionId = extensionId;
    store.set('extensionId', extensionId);
  },
  setExtensionInstalled(state, installed) {
    state.extensionInstalled = installed;
  },
  setConnected(state, connected) {
    state.connected = connected;
  },
  setHeight(state, height) {
    state.height = height;
  },
  setAccount(state, account) {
    state.account = account;
  },
  setTolerance(state, tolerance) {
    state.tolerance = tolerance;
  },
  setDeadline(state, deadline) {
    state.deadline = deadline;
  },
  setTokens(state, tokens) {
    state.tokens = tokens;
  },
  updateToken(state, { token, values }) {
    Object.entries(values).forEach(([key, value]) => (token[key] = value));
  },
  importToken(state, token) {
    state.tokens.unshift(token);
  },
  setTxs(state, txs) {
    txs = JSON.parse(JSON.stringify(txs));
    state.txs = txs.filter(
      (tx) =>
        Math.max(
          tx.raw.confirmations,
          state.height -
            (tx.raw.blockHeight ? tx.raw.blockHeight : state.height)
        ) < 1000
    );
    store.set('txs', state.txs);
  },
  updateTx(state, { tx, raw }) {
    state.txs.forEach((t) => {
      if (t.raw.txid === tx.raw.txid) {
        t.raw = JSON.parse(JSON.stringify(raw));
      }
    });
    store.set('txs', state.txs);
  },
};

export const actions = {
  addTx({ state, commit }, tx) {
    if (state.txs.find((t) => t.raw.txid === tx.raw.txid)) {
      return;
    }
    const txs = [tx, ...state.txs];
    commit('setTxs', txs);
  },
  confirmTx({ commit }, payload) {
    commit('updateTx', payload);
  },
  importToken({ commit, state }, token) {
    commit('importToken', token);
    const importedTokens = state.tokens.filter((token) => token.imported);
    store.set('tokens', importedTokens);
  },
  loadTokens({ commit, state }) {
    const tokens = store.get('tokens') || [];
    commit('setTokens', [...tokens.map((t) => new Token(t)), ...state.tokens]);
  },
  async loadTxs({ commit, dispatch }) {
    const storedTxs = store.get('txs') || [];
    if (storedTxs.length > 0) {
      const txsMap = {};
      const txs = await Promise.all(
        storedTxs.map(async (tx) => {
          if (txsMap[tx.raw.txid]) {
            return;
          }
          const t = (tx.raw = new Transaction(
            tx.raw.txid,
            tx.raw.network,
            tx.raw.confirmations,
            tx.raw.success,
            tx.raw.blockHeight
          ));
          if (t.confirmations > 0 && !t.blockHeight) {
            await t.updateInfo();
          }
          if (!t.confirmed) {
            t.on('confirmed', () => {
              dispatch('confirmTx', {
                tx,
                raw: t,
              });
            });
          }
          txsMap[tx.raw.txid] = tx;
          return tx;
        })
      );
      commit('setTxs', txs.filter(Boolean));
    }
  },
};
