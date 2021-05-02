import { request } from './request';

export function getFairList(params) {
  return request({
    url: '/fair',
    method: 'get',
    params,
  });
}

export function getServiceList(params) {
  return request({
    url: '/fair/service',
    method: 'get',
    params,
  });
}

export function postFair(data) {
  return request({
    url: '/fair',
    method: 'post',
    data,
  });
}

export function postService(data) {
  return request({
    url: '/fair/service',
    method: 'post',
    data,
  });
}

export function deleteFair(data) {
  return request({
    url: '/fair',
    method: 'delete',
    data,
  });
}

export function deleteService(data) {
  return request({
    url: '/fair/service',
    method: 'delete',
    data,
  });
}

export function putFair(data) {
  return request({
    url: '/fair',
    method: 'put',
    data,
  });
}

export function putService(data) {
  return request({
    url: '/fair/service',
    method: 'put',
    data,
  });
}
