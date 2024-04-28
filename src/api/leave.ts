import axiosInstance, { AxiosResponse } from "./axios";

// LeaveApplication 是请假申请的数据结构
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

// getLeaveListRes 是获取请假列表的返回数据结构
export interface getLeaveListRes {
  list: LeaveApplication[];
  total: number;
}

// LeaveListProps 是获取请假列表的参数结构
export interface LeaveListProps {
  studentId?: string;
  teacherId?: string;
  courseName?: string;
  courseId?: string;
}

// changeStatusProps 是更新请假状态的参数结构
export interface changeStatusProps {
  id: string;
  status: string;
  remark?: string;
}

// saveLeaveProps 是保存请假的参数结构
export interface saveLeaveProps {
  courseId: string;
  reason: string;
  studentId: string;
  studentName: string;
  teacherId: string;
  day: string;
}

// getLeaveList 是获取请假列表的请求函数
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

// changeStatus 是更新请假状态的请求函数
export const changeStatus = async (obj: changeStatusProps): Promise<void> => {
  try {
    await axiosInstance.get(
      `/leave/changeStatus?id=${obj.id}&status=${obj.status}&remark=${obj.remark}`
    );
  } catch (error: any) {
    throw new Error(error.message || "更新请假状态失败");
  }
};

// saveLeave 是保存请假的请求函数
export const saveLeave = async (obj: saveLeaveProps): Promise<void> => {
  try {
    await axiosInstance.post("/leave/save", obj);
  } catch (error: any) {
    throw new Error(error.message || "保存请假信息失败");
  }
};
