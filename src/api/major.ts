import axiosInstance, { AxiosResponse } from "./axios";

// MajorItemProps 是获取专业的参数结构
export interface MajorItemProps {
  pageNum: null | number;
  pageSize: null | number;
  id: number;
  name: string;
  code: string;
  createTime: number;
}

// getMajors 是获取专业列表的请求函数
export const getMajors = async (): Promise<MajorItemProps[]> => {
  try {
    const majors: AxiosResponse<MajorItemProps[]> = await axiosInstance.get(
      "/major/getList"
    );
    return majors.data;
  } catch (error: any) {
    throw new Error(error.message || "获取专业列表失败");
  }
};
