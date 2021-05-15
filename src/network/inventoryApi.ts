import { request } from "./request";

export function getInvtList(params) {
  return request({
    url: "/inventory",
    method: "get",
    params,
  });
}

export function postInvt(data) {
  return request({
    url: "/inventory",
    method: "post",
    data,
  });
}

export function putInvt(data) {
  return request({
    url: "/inventory",
    method: "put",
    data,
  });
}

export function getInvtCategoryList() {
  return request({
    url: "/inventory/category",
    method: "get",
  });
}

export function postInvtCategory(data) {
  return request({
    url: "/inventory/category",
    method: "post",
    data,
  });
}

export function deleteInvtCategory(data) {
  return request({
    url: "/inventory/category",
    method: "delete",
    data,
  });
}

export function putInvtCategory(data) {
  return request({
    url: "/inventory/category",
    method: "put",
    data,
  });
}

export function delInventory(data) {
  return request({
    url: "/inventory",
    method: "delete",
    data,
  });
}
