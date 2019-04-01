import {
  userNoHistory,
  userBindHistory,
  hospitaluserList,
  hospitalUserBindList,
  hospitaluserBindListHistory,
  hospitaluserNo,
  unbindPatient,
} from '@/services/hospitalUser';

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
    hospitaluserList: {
      list: [],
      pagination: {},
    },
    hospitaluserBind: {
      list: [],
      pagination: {},
    },
    hospitaluserBindHistory: {
      list: [],
      pagination: {},
    },
    hospitaluserNo: {
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
    *getHospitalUserList({ payload }, { call, put }) {
      const response = yield call(hospitaluserList, payload);
      yield put({
        type: 'saveHospitalUserList',
        payload: response,
      });
    },
    *getHospitalUserBind({ payload }, { call, put }) {
      const response = yield call(hospitalUserBindList, payload);
      yield put({
        type: 'saveHospitaluserBind',
        payload: response,
      });
    },
    *getHospitalUserBindHistory({ payload }, { call, put }) {
      const response = yield call(hospitaluserBindListHistory, payload);
      yield put({
        type: 'saveHospitaluserBindHistory',
        payload: response,
      });
    },
    *getHospitalUserNo({ payload }, { call, put }) {
      const response = yield call(hospitaluserNo, payload);
      yield put({
        type: 'saveHospitaluserNo',
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
    *getUnbindPatient({ payload, callback }, { call }) {
      const response = yield call(unbindPatient, payload);
      if (response && response.result_code === '0') {
        callback();
      }
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
    saveHospitalUserList(state, action) {
      return {
        ...state,
        hospitaluserList: action.payload,
      };
    },
    saveHospitaluserBind(state, action) {
      return {
        ...state,
        hospitaluserBind: action.payload.response_results,
      };
    },
    saveHospitaluserBindHistory(state, action) {
      console.log(action.payload, '绑定历史');
      return {
        ...state,
        hospitaluserBindHistory: action.payload.response_results,
      };
    },
    saveHospitaluserNo(state, action) {
      return {
        ...state,
        hospitaluserNo: action.payload,
      };
    },
  },
};
