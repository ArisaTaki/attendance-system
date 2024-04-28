import axiosInstance, { AxiosResponse } from "./axios";

// Course 是课程的数据结构
export interface Course {
  pageNum: null | number;
  pageSize: null | number;
  id: number;
  name: string;
  code: string;
  createTime: number;
}

// getCourses 是获取课程列表的请求函数
export const getCourses = async (): Promise<Course[]> => {
  try {
    const courses: AxiosResponse<Course[]> = await axiosInstance.get(
      "/course/getList"
    );
    return courses.data;
  } catch (error: any) {
    throw new Error(error.message || "获取课程列表失败");
  }
};
