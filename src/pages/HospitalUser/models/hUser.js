import {
  userNoHistory,
  userBindHistory,
  userList,
  hospitalUserBindList,
  hospitaluserBindListHistory,
  hospitaluserNo,
  unbindPatient,
  addBlackList,
  removeBlackList,
} from '@/services/hospitalUser';
import { message } from 'antd';
import moment from 'moment';

export default {
  namespace: 'hUser',
  state: {
    data: [],
    bindData: {},
    hospitaluserList: {},
    hospitaluserBind: {},
    hospitaluserBindHistory: {},
    hospitaluserNo: {
      list: [],
      pagination: {},
    },
    bindUser: {},
    patientUser: {},
  },

  effects: {
    *getUserNoHistory({ payload }, { call, put }) {
      const response = yield call(userNoHistory, payload);
      if (response && response.result_code === '0') {
        const data = response.response_results.register_list;
        const sortFun = a => (a ? -1 : 1);
        const sortDate = data.sort((a, b) =>
          sortFun(moment(a.registering_date).isBefore(b.registering_date))
        );
        yield put({
          type: 'save',
          payload: sortDate,
        });
      } else {
        message.error(response.error_message);
      }
    },
    *getAddBlackList({ payload, callback }, { call }) {
      const response = yield call(addBlackList, payload);
      if (response && response.result_code === '0') {
        callback();
      } else {
        message.error(response.error_message);
      }
    },
    *getRemoveBlackList({ payload, callback }, { call }) {
      const response = yield call(removeBlackList, payload);
      if (response && response.result_code === '0') {
        callback();
      } else {
        message.error(response.error_message);
      }
    },
    *getHospitalUserList({ payload }, { call, put }) {
      const response = yield call(userList, payload);
      if (response.result_code !== '0') {
        message.error(response.error_message);
        return;
      }
      yield put({
        type: 'saveHospitalUserList',
        payload: response,
      });
    },
    *getHospitalUserBind({ payload }, { call, put }) {
      const response = yield call(hospitalUserBindList, payload);
      if (response.result_code !== '0') {
        message.error(response.error_message);
        return;
      }
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
      } else {
        message.error(response.error_message);
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
    saveBindUser(state, action) {
      return {
        ...state,
        bindUser: action.payload,
      };
    },
    savePatientID(state, action) {
      return {
        ...state,
        patientUser: action.payload,
      };
    },
    saveHospitalUserList(state, action) {
      return {
        ...state,
        hospitaluserList: action.payload.response_results,
      };
    },
    saveHospitaluserBind(state, action) {
      return {
        ...state,
        hospitaluserBind: action.payload.response_results,
      };
    },
    saveHospitaluserBindHistory(state, action) {
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
