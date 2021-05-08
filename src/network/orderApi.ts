import { request } from './request';

export function getOrderList(params) {
  return request({
    url: '/workorder',
    method: 'get',
    params,
  });
}

export function postOrder(data) {
    return request({
      url: '/workorder',
      method: 'post',
      data,
    });
  }

export function deleteOrder(data) {
    return request({
      url: '/workorder',
      method: 'delete',
      data,
    });
  }

export function putOrder(data) {
    return request({
      url: '/workorder',
      method: 'put',
      data,
    });
  }
    