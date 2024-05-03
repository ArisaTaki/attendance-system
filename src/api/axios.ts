// src/utils/axios.ts
// 这里是 axios 实例的配置文件
import axios from "axios";

// 定义 AxiosResponse 接口
export interface AxiosResponse<T = any> {
  msg: string;
  code: number;
  data: T;
}

// 创建 axios 实例
const axiosInstance = axios.create({
  // baseURL是接口的基础路径
  baseURL: "http://localhost:3000/api",
  // Headers是请求头，这里表示发送 JSON 格式的数据
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 20000,
});

// 请求拦截器
axiosInstance.interceptors.request.use(
  (config) => {
    // 从 localStorage 中获取 token
    const tokenString = localStorage.getItem("token");
    // 如果 token 存在
    if (tokenString) {
      // 这里是将 token 从字符串转换为对象
      const tokenObject = JSON.parse(tokenString);
      // 如果 tokenObject 存在并且 token 存在
      if (tokenObject && tokenObject.token) {
        // 将 token 添加到请求头中
        config.headers.Authorization = `${tokenObject.token}`;
        return config;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
axiosInstance.interceptors.response.use(
  (response) => {
    // 将响应数据转换为 AxiosResponse 接口类型
    const apiResponse = response.data as AxiosResponse;
    // 如果 code 不是 200，说明请求失败
    if (apiResponse.code !== 200) {
      return Promise.reject(new Error(apiResponse.msg || "请求失败"));
    }
    return response.data;
  },
  (error) => {
    return Promise.reject(
      new Error(
        (error.response && error.response.data && error.response.data.msg) ||
          "网络错误"
      )
    );
  }
);

export default axiosInstance;
