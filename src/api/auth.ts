// src/api/auth.ts
import axiosInstance from './axios';
import { UserLoginResponse } from "../context/AuthContext";

export const login = async (number: string, password: string): Promise<UserLoginResponse> => {
	try {
		const data: UserLoginResponse = await axiosInstance.post('/login', {
			number,
			password
		});
		return data;  // 直接返回数据部分
	} catch (error: any) {
		throw new Error(error.message || "登录失败");
	}
};
