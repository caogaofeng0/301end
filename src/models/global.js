export default {
  namespace: 'global',
  state: {
    collapsed: false,
    notices: [],
    clientHeight: 0,
  },

  effects: {},

  reducers: {
    changeLayoutCollapsed(state, { payload }) {
      return {
        ...state,
        collapsed: payload,
      };
    },
    saveClientHeight(state, { payload }) {
      // eslint-disable-next-line no-var
      return {
        ...state,
        clientHeight: payload,
      };
    },
  },

  subscriptions: {
    setup({ history }) {
      // Subscribe history(url) change, trigger `load` action if pathname is `/`
      return history.listen(({ pathname, search }) => {
        if (typeof window.ga !== 'undefined') {
          window.ga('send', 'pageview', pathname + search);
        }
      });
    },
  },
};
