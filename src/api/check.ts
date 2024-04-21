import axiosInstance, { AxiosResponse } from "./axios";

export interface CourseSign {
  pageNum: null | number;
  pageSize: null | number;
  id: number;
  courseId: number;
  courseName: string;
  teacherId: string;
  teacherName: string;
  startTime: string;
  endTime: string;
  signPlace: string;
  placeMsg: string;
  createTime: number;
  studentIds: string;
  absentCount: number;
  signTime: string | null;
}

export interface getCheckListRes {
  list: CourseSign[];
  total: number;
}

export interface CheckListProps {
  courseId?: number;
  teacherId?: string;
  teacherName?: string;
}

export const getCheckList = async (
  obj?: CheckListProps
): Promise<getCheckListRes> => {
  const body = {
    pageNum: 1,
    pageSize: 20,
    ...obj,
  };
  try {
    const res: AxiosResponse<getCheckListRes> = await axiosInstance.post(
      "/check/list",
      body
    );
    return res.data;
  } catch (error: any) {
    throw new Error(error.message || "获取全部用户列表失败");
  }
};
