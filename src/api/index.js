import { stringify } from 'qs';
import request from '@/utils/request';

export async function queryNewsList(params) {
  return request(`/api/jgteport/member/infoContents/loadInfoContentsList.action?${stringify(params)}`)
}

export async function queryNewsDetailById(id) {
  return request(`/api/jgteport/member/infoContents/loadInfoContentsDetail.action?id=${id}`)
}

export async function queryVovage(params) {
  return request(`/ybt/voyage/loadVoyageInfoByFormToJson.action?${stringify(params)}`)
}

export async function queryBranchVovage(id) {
  return request(`/ybt/voyage/loadBranchVoyageInfo.action?id=${id}`);
}

export async function login(params) {
  return request(`/jgt/index/userLogin.action?${stringify(params)}`, {
    type: 'POST'
  });
}

export async function logout() {
  return request('/jgt/index/userLogout.action');
}

export async function queryCurrentUser() {
  return request('/jgt/index/userLoginStatus.action');
}
