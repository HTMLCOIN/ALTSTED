export const state = () => ({
  theme: 'dark',
});

export const mutations = {
  setTheme(state, theme) {
    state.theme = theme;
  },
};
