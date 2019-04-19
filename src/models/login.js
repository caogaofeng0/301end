import { routerRedux } from 'dva/router';
import { message } from 'antd';
import { accountLogin } from '@/services/user';
import { setAuthority } from '@/utils/authority';
import { reloadAuthorized } from '@/utils/Authorized';
import { pagePath } from '@/pagePath';

export default {
  namespace: 'login',
  state: {
    status: undefined,
  },

  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(accountLogin, payload);
      if (response.result_code !== '0') {
        message.error(response.error_message);
        return;
      }
      window.localStorage.setItem('user', response.response_results.Name);
      yield put({
        type: 'changeLoginStatus',
        payload: {
          status: true,
          currentAuthority: 'user',
          type: 'account',
        },
      });
      if (response.result_code === '0') {
        window.location.href = `${pagePath}/`;
      }
    },

    *logout(_, { put }) {
      window.localStorage.clear('user');
      yield put({
        type: 'changeLoginStatus',
        payload: {
          status: false,
          currentAuthority: 'guest',
        },
      });
      reloadAuthorized();
      yield put(
        routerRedux.replace({
          pathname: '/user/login',
        })
      );
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.currentAuthority);
      return {
        ...state,
        status: payload.status,
        type: payload.type,
      };
    },
  },
};
