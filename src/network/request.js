import axios from "axios";
export function request(config) {
  // 1. 创建axios的实例
  const instance = axios.create({
    baseURL: "http://106.54.54.237:8000/api/v1",
    timeout: 10000
  });
  // 2. axios的拦截器
  // 2.1 请求拦截的作用
  instance.interceptors.request.use(
    config => {
      return config;
    },
    err => {
      // 一般走不到这里
      console.log(err);
    }
  );
  // 2.2 响应拦截
  instance.interceptors.response.use(
    res => {
      // console.log(res.data);
      // 响应拦截需要将数据返回出去
      return res.data;
    },
    err => {
      console.log(err);
    }
  );
  // 3. 发送真正的网络请求，返回一个 promise 对象
  return instance(config);
}

/*
import axios from "axios";

export function request(config) {
  // 1.创建axios的实例
  const instance = axios.create({
    baseURL: "http://123.207.32.32:8000/api/v2",
    //baseURL: 'http://106.54.54.237:8000/api/v1',
    timeout: 5000
  });

  // 2.axios的拦截器

  // 2.1.请求拦截的作用
  instance.interceptors.request.use(
    config => {
      return config;
    },
    err => {
      // 一般走不到这一步
      // console.log(err);
    }
  );

  // 2.2.响应拦截
  instance.interceptors.response.use(
    res => {
      return res.data;
    },
    err => {
      console.log(err);
    }
  );

  // 3.发送真正的网络请求
  return instance(config);
}
*/
