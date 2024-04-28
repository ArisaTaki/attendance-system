import axiosInstance, { AxiosResponse } from "./axios";

export interface CourseSign {
  pageNum: null | number;
  pageSize: null | number;
  id: number;
  idString: string;
  courseId: number;
  courseName: string;
  teacherId: string;
  teacherName: string;
  startTime: string;
  endTime: string;
  signPlace: string;
  palceMsg: string;
  createTime: number;
  studentIds: string;
  absentCount: number;
  signTime: string | null;
  classId: number;
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

export interface CourseSignInRequest {
  startTime: string;
  endTime: string;
  palceMsg: string;
  signPlace: string;
  teacherId: string;
  courseId: string;
  studentIds: string;
}

export interface GetCheckRecordsProps {
  studentId: string;
  courseId?: string;
  teacherId?: string;
}

export interface CheckSignProps {
  checkId: string;
  studentId: string;
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

export const createCheck = async (check: CourseSignInRequest) => {
  try {
    await axiosInstance.post("/check/save", check);
  } catch (error: any) {
    throw new Error(error.message || "创建签到任务失败");
  }
};

export const getCheckRecords = async (
  obj: GetCheckRecordsProps
): Promise<CourseSign[]> => {
  try {
    const objCourseId = obj.courseId ? `&courseId=${obj.courseId}` : "";
    const objTeacherId = obj.teacherId ? `&teacherId=${obj.teacherId}` : "";
    const baseUrl = `/check/getCheckRecords?studentId=${obj.studentId}`;
    const res: AxiosResponse<CourseSign[]> = await axiosInstance.get(
      `${baseUrl}${objCourseId}${objTeacherId}`
    );
    return res.data;
  } catch (error: any) {
    throw new Error(error.message || "获取签到记录失败");
  }
};

export const checkSign = async (obj: CheckSignProps) => {
  try {
    await axiosInstance.get(
      `/checkMsg/sign?checkId=${obj.checkId}&studentId=${obj.studentId}`
    );
  } catch (error: any) {
    throw new Error(error.message || "签到失败");
  }
};
