import request from '@/utils/request';

export async function query() {
  return request('/api/users');
}

export async function queryCurrent() {
  return request('/api/currentUser');
}
export async function accountLogin(params) {
  return request('/mob301/api/manage', {
    method: 'POST',
    body: params,
  });
}
