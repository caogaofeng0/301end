import request from '@/utils/request';

// 查询门诊专科列表，也支持通过参数查询指定专类类别的门诊专科列表
export async function specialityCategory(params) {
  return request(`/mob301/api/speciality_category?category=${params}`);
}

// 指定专科的简介、特色技术、特色医生。此接口调用方式为定时获取
export async function specialityProfile(params) {
  return request(`/mob301/api/speciality_profile?speciality_code=${params}`);
}
// 专科的专家介绍
export async function expertDetails(params) {
  return request(`/mob301/api/expert?speciality_code=${params}`);
}
// 查询门诊专科类别
export async function specialityCategoryList() {
  return request(`/mob301/api/speciality_category`);
}

// 创建科室特色
export async function createSpecialityProfile(params) {
  return request(`/mob301/api/speciality_profile`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
// 更新专家
export async function expertUpdate(params) {
  return request(`/mob301/api/expert/update`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
// 新增专家
export async function expertAppend(params) {
  return request(`/mob301/api/expert/append`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
// 查询科室医生(GET)
export async function getDoctor(params) {
  return request(`/mob301/api/expert/get_doctor?speciality_code=${params}`);
}
// 查询科室医生图片
export async function getDoctorImg(params) {
  return request(`/mob301/api/expert?speciality_code=${params.code}&doctor_id=${params.id}`);
}
