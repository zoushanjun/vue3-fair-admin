import { request } from "./request";

export function getJobSvr(params) {
  return request({
    url: "/jobserver",
    method: "get",
    params,
  });
}

export function putJobSvr(data) {
  return request({
    url: "/jobserver",
    method: "put",
    data,
  });
}

export function getSmsGw(params) {
  return request({
    url: "/smsgw",
    method: "get",
    params,
  });
}

export function putSmsGw(data) {
  return request({
    url: "/smsgw",
    method: "put",
    data,
  });
}
