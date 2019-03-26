import { getDoctorList, departInfo, departInfoList } from '@/services/info';

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
    departList: [],
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
    *fetchDepartList({ payload }, { call, put }) {
      const response = yield call(departInfoList, payload);
      yield put({
        type: 'saveDepartList',
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
      return {
        ...state,
        depart: action.payload,
      };
    },
    saveDepartList(state, action) {
      return {
        ...state,
        departList: action.payload,
      };
    },
  },
};
