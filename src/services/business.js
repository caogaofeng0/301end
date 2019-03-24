import request from '@/utils/request';

export async function businessNoGetData() {
  return request('/api/business/get/data');
}

export async function businessUserGetData() {
  return request('/api/business/user/get/data');
}

export async function userNoHistory() {
  return request('/api/user/no/history');
}

export async function userBindHistory() {
  return request('/api/user/bind/history');
}
