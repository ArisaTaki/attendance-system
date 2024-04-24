import axiosInstance, { AxiosResponse } from "./axios";

export interface LeaveApplication {
  pageNum: null | number;
  pageSize: null | number;
  id: bigint;
  idString: string;
  studentId: string;
  studentName: string;
  teacherId: string;
  teacherName: string;
  reason: string;
  day: string;
  status: string;
  remark: string | null;
  createTime: number;
  courseId: number;
  courseName: string;
}

export interface getLeaveListRes {
  list: LeaveApplication[];
  total: number;
}

export interface LeaveListProps {
  studentId?: string;
  teacherId: string;
  courseName?: string;
}

export interface changeStatusProps {
  id: string;
  status: string;
  remark?: string;
}

export const getLeaveList = async (
  obj?: LeaveListProps
): Promise<getLeaveListRes> => {
  const body = {
    pageNum: 1,
    pageSize: 20,
    ...obj,
  };
  try {
    const res: AxiosResponse<getLeaveListRes> = await axiosInstance.post(
      "/leave/list",
      body
    );
    return res.data;
  } catch (error: any) {
    throw new Error(error.message || "获取请假列表失败");
  }
};

export const changeStatus = async (obj: changeStatusProps): Promise<void> => {
  try {
    await axiosInstance.get(
      `/leave/changeStatus?id=${obj.id}&status=${obj.status}&remark=${obj.remark}`
    );
  } catch (error: any) {
    throw new Error(error.message || "更新请假状态失败");
  }
};
