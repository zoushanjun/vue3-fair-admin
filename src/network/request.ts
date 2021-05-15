import { message } from "ant-design-vue";
import axios from "axios";

export function request(config) {
  const instance = axios.create({
    // 在请求地址前面加上baseURL
    baseURL: "http://localhost:5000",
    timeout: 5000,
  });

  //请求拦截
  //所有的网络请求都会先走这个方法
  // 添加请求拦截器,所有的网络请求都会先走这个方法，我们可以在它里面为请求添加一些自定义的内容
  instance.interceptors.request.use(
    (config) => {
      //如果有一个接口需要认证才可以访问，就在这统一设置

      // 直接放行
      return config;
    },
    (err) => {}
  );

  // 添加响应拦截器
  //此处可以根据服务器的返回状态码做响应的处理
  //404 404 500
  instance.interceptors.response.use(
    (res) => {
      // console.log(res.data);
      return res;
    },
    (err) => {
      console.log(err.status);
      message.error("出现错误！");
      // 如果有需要授权才可以访问的接口，统一去login授权
      // 如果有错误，这里面会去处理，显示错误信息
    }
  );
  return instance(config);
}
