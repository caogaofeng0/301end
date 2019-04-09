import request from '@/utils/request';

export async function getDoctorList(params) {
  return request('/api/doctorList', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function departInfo() {
  return request('/api/depart/Info');
}

export async function departInfoList(params) {
  return request('/api/depart/Info/list', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

// 查询门诊专科列表，也支持通过参数查询指定专类类别的门诊专科列表
export async function specialityCategory(params) {
  return request(`/api/speciality_category?category=${params}`);
}

// 指定专科的简介、特色技术、特色医生。此接口调用方式为定时获取
export async function specialityProfile(params) {
  return request(`/api/speciality_profile?speciality_code=${params}`);
}
// 专科的专家介绍
export async function expertDetails(params) {
  return request(`/api/expert?speciality_code=${params}`);
}

// export async function removeRule(params) {
//   return request('/api/rule', {
//     method: 'POST',
//     body: {
//       ...params,
//       method: 'delete',
//     },
//   });
// }

// export async function addRule(params) {
//   return request('/api/rule', {
//     method: 'POST',
//     body: {
//       ...params,
//       method: 'post',
//     },
//   });
// }

// export async function updateRule(params = {}) {
//   return request(`/api/rule?${stringify(params.query)}`, {
//     method: 'POST',
//     body: {
//       ...params.body,
//       method: 'update',
//     },
//   });
// }

// export async function fakeSubmitForm(params) {
//   return request('/api/forms', {
//     method: 'POST',
//     body: params,
//   });
// }

// export async function fakeChartData() {
//   return request('/api/fake_chart_data');
// }

// export async function queryTags() {
//   return request('/api/tags');
// }

// export async function queryBasicProfile(id) {
//   return request(`/api/profile/basic?id=${id}`);
// }

// export async function queryAdvancedProfile() {
//   return request('/api/profile/advanced');
// }

// export async function queryFakeList(params) {
//   return request(`/api/fake_list?${stringify(params)}`);
// }

// export async function removeFakeList(params) {
//   const { count = 5, ...restParams } = params;
//   return request(`/api/fake_list?count=${count}`, {
//     method: 'POST',
//     body: {
//       ...restParams,
//       method: 'delete',
//     },
//   });
// }

// export async function addFakeList(params) {
//   const { count = 5, ...restParams } = params;
//   return request(`/api/fake_list?count=${count}`, {
//     method: 'POST',
//     body: {
//       ...restParams,
//       method: 'post',
//     },
//   });
// }

// export async function updateFakeList(params) {
//   const { count = 5, ...restParams } = params;
//   return request(`/api/fake_list?count=${count}`, {
//     method: 'POST',
//     body: {
//       ...restParams,
//       method: 'update',
//     },
//   });
// }

// export async function fakeAccountLogin(params) {
//   console.log(params, "params");

//   return request('/api/login/account', {
//     method: 'POST',
//     body: params,
//   });
// }

// export async function fakeRegister(params) {
//   return request('/api/register', {
//     method: 'POST',
//     body: params,
//   });
// }

// export async function queryNotices(params = {}) {
//   return request(`/api/notices?${stringify(params)}`);
// }

// export async function getFakeCaptcha(mobile) {
//   return request(`/api/captcha?mobile=${mobile}`);
// }
