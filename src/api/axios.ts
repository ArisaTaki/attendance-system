// src/utils/axios.ts
import axios from "axios";

export interface AxiosResponse<T = any> {
  msg: string;
  code: number;
  data: T;
}

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 5000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const tokenString = localStorage.getItem("token");
    if (tokenString) {
      const tokenObject = JSON.parse(tokenString);
      if (tokenObject && tokenObject.token) {
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

axiosInstance.interceptors.response.use(
  (response) => {
    const apiResponse = response.data as AxiosResponse;
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
