import { getDoctorList } from '@/services/info';

export default {
  namespace: 'info',
  state: {
    data: {
      list: [],
      pagination: {},
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
  },

  reducers: {
    save(state, action) {
      setTimeout(() => {
        console.log(...state, '-------->');
      }, 4000);
      return {
        ...state,
        data: action.payload,
      };
    },
  },
};
