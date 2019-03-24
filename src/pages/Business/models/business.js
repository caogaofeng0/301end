import { businessNoGetData, businessUserGetData } from '@/services/business';

export default {
  namespace: 'business',
  state: {
    topData: {},
    topDataUser: {},
    loading: false,
  },

  effects: {
    *topData(_, { call, put }) {
      const response = yield call(businessNoGetData);
      yield put({
        type: 'saveTopData',
        payload: response,
      });
    },
    *topDataUser(_, { call, put }) {
      const response = yield call(businessUserGetData);
      yield put({
        type: 'saveTopDataUser',
        payload: response,
      });
    },
  },

  reducers: {
    saveTopData(state, { payload }) {
      return {
        ...state,
        topData: payload.data,
      };
    },
    saveTopDataUser(state, { payload }) {
      return {
        ...state,
        topDataUser: payload.data,
      };
    },
    clear() {
      return {
        topData: {},
        topDataUser: {},
      };
    },
  },
};
