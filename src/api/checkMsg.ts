import axiosInstance from "./axios";

interface CourseSelection {
  pageNum: null | number;
  pageSize: null | number;
  id: number;
  checkId: number;
  studentId: string;
  studentName: string;
  createTime: number;
  courseId: number;
  status: string;
}

export interface StudentAttendance {
  studentId: string;
  name: string;
  present: number;
  absent: number;
  leave: number;
}

export const checkMsgInfoListById = async (
  account: string
): Promise<CourseSelection> => {
  try {
    const checkMsgInfoListById = await axiosInstance.get(
      // TODO 这里还需要从storage里面拿到用户id才行
      `/checkMsg/getCheckInfo?studentId=${account}&pageNum=1&pageSize=20`
    );
    return checkMsgInfoListById.data;
  } catch (error: any) {
    throw new Error(error.message || "获取消息列表失败");
  }
};

export const checkMsgInfoList = async (
  studentId?: number
): Promise<StudentAttendance[]> => {
  try {
    const checkMsgInfoList = await axiosInstance.get(
      studentId
        ? `check/getCheckMsg?studentId=${studentId}`
        : `/check/getCheckMsg`
    );
    return checkMsgInfoList.data;
  } catch (error: any) {
    throw new Error(error.message || "获取消息列表失败");
  }
};
