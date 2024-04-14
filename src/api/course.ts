import axiosInstance, { AxiosResponse } from "./axios";

export interface Course {
  pageNum: null | number;
  pageSize: null | number;
  id: number;
  name: string;
  code: string;
  createTime: number;
}

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
