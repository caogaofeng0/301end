import { getDoctorList, departInfo } from '@/services/info';

export default {
  namespace: 'info',
  state: {
    data: {
      list: [],
      pagination: {},
    },
    depart: {
      list: [],
      pagination: {},
      abstract: '',
      leader: '',
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(getDoctorList, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchDepart({ payload }, { call, put }) {
      const response = yield call(departInfo, payload);
      yield put({
        type: 'saveDepart',
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
    saveDepart(state, action) {
      console.log(action, '返回数据');
      return {
        ...state,
        depart: action.payload,
      };
    },
  },
};
