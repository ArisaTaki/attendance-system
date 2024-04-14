import axiosInstance from "./axios";

export interface SaveUserProps {
  avatar?: string;
  colleageId?: number;
  email: string;
  majorId?: number;
  name: string;
  number: string;
  password: string;
  phone: string;
  roleId: number;
}

export interface UpdateProps {
  email: string;
  phone: string;
  password: string;
  avatar: string;
}

export const saveUser = async (user: SaveUserProps) => {
  try {
    await axiosInstance.post("/user/save", user);
  } catch (error: any) {
    throw new Error(error.message || "保存用户失败");
  }
};

export const updateUser = async (user: UpdateProps) => {
  try {
    await axiosInstance.post("/user/update", user);
  } catch (error: any) {
    throw new Error(error.message || "更新用户失败");
  }
};
