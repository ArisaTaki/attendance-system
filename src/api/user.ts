import axiosInstance, { AxiosResponse } from "./axios";

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

export interface BaseUser {
  pageNum: null | number;
  pageSize: null | number;
  id: number;
  number: string;
  name: string;
  password: string;
  phone: string | null;
  email: string | null;
  age: number | null;
  avatar: string | null;
  roleId: number;
  majorId: number | null;
  colleageId: number | null;
  createTime: number;
  classId: number | null;
}

export interface User {
  list: BaseUser[];
  total: number;
}

export interface UpdateProps {
  email: string;
  phone: string;
  password?: string;
}

export interface UploadAvatarProps {
  file: File;
  userId: string;
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

export const getStudentList = async (): Promise<User> => {
  const body = {
    roleId: 3,
    pageNum: 1,
    pageSize: 20,
  };
  try {
    const students: AxiosResponse<User> = await axiosInstance.post(
      "/user/list",
      body
    );
    return students.data;
  } catch (error: any) {
    throw new Error(error.message || "获取学生列表失败");
  }
};

export const getTeacherList = async (): Promise<User> => {
  const body = {
    roleId: 2,
    pageNum: 1,
    pageSize: 20,
  };
  try {
    const teachers: AxiosResponse<User> = await axiosInstance.post(
      "/user/list",
      body
    );
    return teachers.data;
  } catch (error: any) {
    throw new Error(error.message || "获取教师列表失败");
  }
};

export const getAllUsersList = async (number?: string): Promise<User> => {
  const body = {
    pageNum: 1,
    pageSize: 20,
    number: number,
  };
  try {
    const teachers: AxiosResponse<User> = await axiosInstance.post(
      "/user/list",
      body
    );
    return teachers.data;
  } catch (error: any) {
    throw new Error(error.message || "获取全部用户列表失败");
  }
};

export const getStudentListByClass = async (
  classId: number
): Promise<BaseUser[]> => {
  const formaData = new FormData();
  formaData.append("classId", String(classId));
  try {
    const students: AxiosResponse<BaseUser[]> = await axiosInstance.post(
      "/user/geStudentByClassId",
      formaData,
      {
        headers: {
          "Content-Type": "multipart/form-data", // 这一行通常是可选的，因为浏览器会自动设置正确的 Content-Type，包括boundary参数。
        },
      }
    );
    return students.data;
  } catch (error: any) {
    throw new Error(error.message || "获取学生列表失败");
  }
};

export const uploadAvatar = async (avatar: UploadAvatarProps) => {
  const formData = new FormData();
  formData.append("file", avatar.file);
  formData.append("userId", avatar.userId);
  try {
    await axiosInstance.post("/user/uploadAvatar", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (error: any) {
    throw new Error(error.message || "上传头像失败");
  }
};
