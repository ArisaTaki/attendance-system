import axiosInstance, { AxiosResponse } from "./axios";

// SaveUserProps 是保存用户的参数结构
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
  classId?: number;
}

// BaseUser 是用户的基本信息结构
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

// User 是用户列表的数据结构
export interface User {
  list: BaseUser[];
  total: number;
}

// UpdateProps 是更新用户的参数结构
export interface UpdateProps {
  email: string;
  phone: string;
  password?: string;
}

// UploadAvatarProps 是上传头像的参数结构
export interface UploadAvatarProps {
  file: File;
  userId: string;
}

// saveUser 是保存用户的请求函数
export const saveUser = async (user: SaveUserProps) => {
  try {
    await axiosInstance.post("/user/save", user);
  } catch (error: any) {
    throw new Error(error.message || "保存用户失败");
  }
};

// updateUser 是更新用户的请求函数
export const updateUser = async (user: UpdateProps) => {
  try {
    await axiosInstance.post("/user/update", user);
  } catch (error: any) {
    throw new Error(error.message || "更新用户失败");
  }
};

// getStudentList 是获取学生用户信息的请求函数
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

// getTeacherList 是获取教师用户信息的请求函数
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

// getAllUsersList 是获取全部用户列表的请求函数
export const getAllUsersList = async (
  number?: string,
  name?: string
): Promise<User> => {
  const body = {
    pageNum: 1,
    pageSize: 20,
    number: number,
    name: name,
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

// getStudentListByClass是获取班级学生列表的请求函数
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

// uploadAvatar 是上传头像的请求函数
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
