import request from '@/utils/request';

export async function changeStatus() {
  return request('/api/change/status');
}

export async function queryActivities() {
  return request('/api/activities');
}

export async function userNoHistory() {
  return request('/api/user/no/history');
}

export async function userBindHistory() {
  return request('/api/user/bind/history');
}

export async function hospitaluserList(params) {
  return request('/api/hospital/user/list', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

export async function hospitalUserBindList(params) {
  return request(`/api/account/patients?user_id=${params}`);
}

export async function hospitaluserBindListHistory(params) {
  return request(`/api/patient/register?patient_id=${params}`);
}

export async function hospitaluserNo(params) {
  return request('/api/hospital/user/no', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

export async function unbindPatient(params) {
  return request('/api/account/unbind_patient', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
