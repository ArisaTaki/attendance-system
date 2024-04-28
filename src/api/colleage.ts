import axiosInstance, { AxiosResponse } from "./axios";

// ColleageItemProps 是获取学院的参数结构
export interface ColleageItemProps {
  pageNum: null | number;
  pageSize: null | number;
  id: number;
  name: string;
  code: string;
  createTime: number;
}

// getColleages 是获取学院列表的请求函数
export const getColleages = async (): Promise<ColleageItemProps[]> => {
  try {
    const colleages: AxiosResponse<ColleageItemProps[]> =
      await axiosInstance.get("/collage/getList");
    return colleages.data;
  } catch (error: any) {
    throw new Error(error.message || "获取学院列表失败");
  }
};
