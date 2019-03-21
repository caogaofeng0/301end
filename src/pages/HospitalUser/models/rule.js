import { queryRule, removeRule, addRule, updateRule } from '@/services/api';
import { changeStatus } from '@/services/hospitalUser';
import { message } from 'antd';

export default {
  namespace: 'rule',
  state: {
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *listStatus({ payload }, { call }) {
      console.log("---------->")
      yield call(changeStatus, payload);
      message.success('更改成功');
      // yield put({
      //   type: 'save',
      //   payload: response,
      // });
    },
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryRule, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *add({ payload, callback }, { call, put }) {
      const response = yield call(addRule, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *remove({ payload, callback }, { call, put }) {
      const response = yield call(removeRule, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *update({ payload, callback }, { call, put }) {
      const response = yield call(updateRule, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
  },
};
