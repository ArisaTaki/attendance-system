// src/api/auth.ts
import axiosInstance from './axios';
import {AxiosResponse} from 'axios';

// 返回类型
interface LoginResponse {
	token: string;
	userId: number;
}

export const login = async (userId: string, password: string): Promise<AxiosResponse<LoginResponse>> => {
	try {
		return await axiosInstance.post<LoginResponse>('/login', {
			userId,
			password
		});
	} catch (error: any) {
		throw new Error((error.response && error.response.data && error.response.data.message) || "登录失败");
	}
};
