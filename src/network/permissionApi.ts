import { request } from "./request";

export function getPermission(params) {
  return request({
    url: "/permission",
    method: "get",
    params,
  });
}

export function postPermission(data) {
  return request({
    url: "/permission",
    method: "post",
    data,
  });
}

export function deletePermission(data) {
  return request({
    url: "/permission",
    method: "delete",
    data,
  });
}

export function putPermission(data) {
  return request({
    url: "/permission",
    method: "put",
    data,
  });
}
