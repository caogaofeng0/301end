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
