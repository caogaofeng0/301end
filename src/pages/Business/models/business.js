import {
  businessNoGetData,
  businessUserGetData,
  businessNoTrend,
  businessNoDayPlatform,
  businessNoDayPlatformQuit,
  businessNoDayPlatformTrend,
} from '@/services/business';

export default {
  namespace: 'business',
  state: {
    topData: {},
    topDataUser: {},
    noTrend: {},
    noDayPlatform: {},
    noDayPlatformQuti: {},
    noDayPlatformTrend: {},
    loading: false,
  },

  effects: {
    // 挂号统计
    *topData({ payload }, { call, put }) {
      console.log(payload, 'payload');
      const response = yield call(businessNoGetData, payload);
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
    *noTrendFetch(_, { call, put }) {
      const response = yield call(businessNoTrend);
      yield put({
        type: 'savenoTrendFetch',
        payload: response,
      });
    },
    *noDayPlatform(_, { call, put }) {
      const response = yield call(businessNoDayPlatform);
      yield put({
        type: 'savenoDayPlatform',
        payload: response,
      });
    },
    *noDayPlatformQuit(_, { call, put }) {
      const response = yield call(businessNoDayPlatformQuit);
      yield put({
        type: 'savenoDayPlatformQuit',
        payload: response,
      });
    },
    *noDayPlatformTrend(_, { call, put }) {
      const response = yield call(businessNoDayPlatformTrend);
      yield put({
        type: 'savenoDayPlatformTrend',
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
    savenoTrendFetch(state, { payload }) {
      return {
        ...state,
        noTrend: payload.data,
      };
    },
    savenoDayPlatform(state, { payload }) {
      return {
        ...state,
        noDayPlatform: payload.data,
      };
    },
    savenoDayPlatformQuit(state, { payload }) {
      return {
        ...state,
        noDayPlatformQuit: payload.data,
      };
    },
    savenoDayPlatformTrend(state, { payload }) {
      return {
        ...state,
        noDayPlatformTrend: payload.data,
      };
    },
    clear() {
      return {
        topData: {},
        topDataUser: {},
        noTrend: {},
        noDayPlatform: {},
        noDayPlatformQuit: {},
        noDayPlatformTrend: {},
      };
    },
  },
};
