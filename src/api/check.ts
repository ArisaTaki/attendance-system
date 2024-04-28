import axiosInstance, { AxiosResponse } from "./axios";

// CourseSign 是签到任务的数据结构
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

// getCheckListRes 是获取签到任务列表的返回数据结构
export interface getCheckListRes {
  list: CourseSign[];
  total: number;
}

// CheckListProps 是获取签到任务列表的参数结构
export interface CheckListProps {
  courseId?: number;
  teacherId?: string;
  teacherName?: string;
}

// CourseSignInRequest 是创建签到任务的参数结构
export interface CourseSignInRequest {
  startTime: string;
  endTime: string;
  palceMsg: string;
  signPlace: string;
  teacherId: string;
  courseId: string;
  studentIds: string;
}

// GetCheckRecordsProps 是获取签到记录的参数结构
export interface GetCheckRecordsProps {
  studentId: string;
  courseId?: string;
  teacherId?: string;
}

// CheckSignProps 是签到的参数结构
export interface CheckSignProps {
  checkId: string;
  studentId: string;
}

// getCheckList 是获取签到任务列表的 API 请求函数
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

// createCheck 是创建签到任务的 API 请求函数
export const createCheck = async (check: CourseSignInRequest) => {
  try {
    await axiosInstance.post("/check/save", check);
  } catch (error: any) {
    throw new Error(error.message || "创建签到任务失败");
  }
};

// getCheckRecords 是获取签到记录的 API 请求函数
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

// checkSign 是签到的 API 请求函数
export const checkSign = async (obj: CheckSignProps) => {
  try {
    await axiosInstance.get(
      `/checkMsg/sign?checkId=${obj.checkId}&studentId=${obj.studentId}`
    );
  } catch (error: any) {
    throw new Error(error.message || "签到失败");
  }
};
