import request from '@/utils/request';

export async function businessNoGetData(params) {
  return request('/api/business/get/data', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function businessUserGetData() {
  return request('/api/business/user/get/data');
}

export async function businessNoTrend() {
  return request('/api/business/No/trend');
}

export async function businessNoDayPlatform() {
  return request('/api/business/no/day/playform');
}

export async function businessNoDayPlatformQuit() {
  return request('/api/business/no/day/playform/quit');
}

export async function businessNoDayPlatformTrend() {
  return request('/api/business/no/day/playform/trend');
}

export async function userNoHistory() {
  return request('/api/user/no/history');
}

export async function userBindHistory() {
  return request('/api/user/bind/history');
}
