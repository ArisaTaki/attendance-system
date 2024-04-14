import axiosInstance, { AxiosResponse } from "./axios";

interface MajorItemProps {
  pageNum: null | number;
  pageSize: null | number;
  id: number;
  name: string;
  code: string;
  createTime: number;
}

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
