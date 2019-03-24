import { userNoHistory, userBindHistory } from '@/services/hospitalUser';

export default {
  namespace: 'hUser',
  state: {
    data: {
      list: [],
      pagination: {},
    },
    bindData: {
      list: [],
      pagination: {},
    },
    bindId: '',
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(userNoHistory, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *bindFetch({ payload }, { call, put }) {
      const response = yield call(userBindHistory, payload);
      yield put({
        type: 'bindSave',
        payload: response,
      });
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
    bindSave(state, action) {
      return {
        ...state,
        bindData: action.payload,
      };
    },
    saveID(state, action) {
      return {
        ...state,
        bindId: action.payload,
      };
    },
  },
};
