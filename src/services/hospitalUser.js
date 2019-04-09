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
// 医院用户列表
export async function userList(params) {
  return request(`/api/account/user?document_no=${params}`);
}
// 指定用户加入受限制名单
export async function addBlackList(params) {
  return request('/api/account/add_user_blacklist', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
// 用户移出受限制名单
export async function removeBlackList(params) {
  return request('/api/account/remove_user_blacklist', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

// 用户绑定的患者信息
export async function hospitalUserBindList(params) {
  return request(`/api/account/patients?user_id=${params}`);
}
// 用于查询指定患者的挂号记录，默认显示所有平台x天的挂号记录
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
// 解绑患者
export async function unbindPatient(params) {
  return request('/api/account/unbind_patient', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
