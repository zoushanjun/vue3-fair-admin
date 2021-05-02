import { request } from './request';

export function getInvtList() {
  return request({
    url: '/inventory',
    method: 'get',
  });
}

export function getInvtCategoryList() {
  return request({
    url: '/inventory/category',
    method: 'get',
  });
}

export function postInvtCategory(data) {
  return request({
    url: '/inventory/category',
    method: 'post',
    data,
  });
}

export function deleteInvtCategory(data) {
  return request({
    url: '/inventory/category',
    method: 'delete',
    data,
  });
}

export function putInvtCategory(data) {
  return request({
    url: '/inventory/category',
    method: 'put',
    data,
  });
}

export function delInventory(data) {
  return request({
    url: '/inventory',
    method: 'delete',
    data,
  });
}
