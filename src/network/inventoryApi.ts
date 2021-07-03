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

export function delInventory(data) {
  return request({
    url: "/inventory",
    method: "delete",
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

export function getInvtModelList() {
  return request({
    url: "/inventory/model",
    method: "get",
  });
}

export function postInvtModel(data) {
  return request({
    url: "/inventory/model",
    method: "post",
    data,
  });
}

export function deleteInvtModel(data) {
  return request({
    url: "/inventory/model",
    method: "delete",
    data,
  });
}

export function putInvtModel(data) {
  return request({
    url: "/inventory/model",
    method: "put",
    data,
  });
}

export function getInvtJournal() {
  return request({
    url: "/inventory/journal",
    method: "get",
  });
}

export function postInvtJournal(data) {
  return request({
    url: "/inventory/journal",
    method: "post",
    data,
  });
}
