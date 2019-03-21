import request from '@/utils/request';

export async function changeStatus() {
  return request('/api/change/status');
}

export async function queryActivities() {
  return request('/api/activities');
}
