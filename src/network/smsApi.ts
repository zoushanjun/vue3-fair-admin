import { request } from "./request";

// 获取短信余额接口
export function getSmsRemoney() {
  return request({
    url: "/smsremoney",
    method: "get",
  });
}

// 发送短信接口
export function getSmsSendMessage(params) {
  return request({
    url: "/smssendmessage",
    method: "get",
    params,
  });
}
