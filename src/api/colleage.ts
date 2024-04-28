import axiosInstance, { AxiosResponse } from "./axios";

export interface ColleageItemProps {
  pageNum: null | number;
  pageSize: null | number;
  id: number;
  name: string;
  code: string;
  createTime: number;
}

export const getColleages = async (): Promise<ColleageItemProps[]> => {
  try {
    const colleages: AxiosResponse<ColleageItemProps[]> =
      await axiosInstance.get("/collage/getList");
    return colleages.data;
  } catch (error: any) {
    throw new Error(error.message || "获取学院列表失败");
  }
};
