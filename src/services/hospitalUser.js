import request from '@/utils/request';

export async function changeStatus() {
  return request('/mob301/api/change/status');
}

export async function queryActivities() {
  return request('/mob301/api/activities');
}

// 用户挂号记录
export async function userNoHistory() {
  return request('/mob301/api/register');
}

export async function userBindHistory() {
  return request('/mob301/api/user/bind/history');
}
// 医院用户列表
export async function userList(params) {
  return request(`/mob301/api/account/user?document_no=${params}`);
}
// 指定用户加入受限制名单
export async function addBlackList(params) {
  return request('/mob301/api/account/add_user_blacklist', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
// 用户移出受限制名单
export async function removeBlackList(params) {
  return request('/mob301/api/account/remove_user_blacklist', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

// 用户绑定的患者信息
export async function hospitalUserBindList(params) {
  return request(`/mob301/api/account/patients?user_id=${params.data}`, {
    method: 'GET',
    institution_id: params.institution_id,
  });
}
// 用于查询指定患者的挂号记录，默认显示所有平台x天的挂号记录
export async function hospitaluserBindListHistory(params) {
  return request(`/mob301/api/patient/register?patient_id=${params}`);
}

export async function hospitaluserNo(params) {
  return request('/mob301/api/hospital/user/no', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
// 解绑患者
export async function unbindPatient(params) {
  return request('/mob301/api/account/unbind_patient', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
