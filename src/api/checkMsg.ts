import axiosInstance from "./axios";

const checkMsgInfoListById = async () => {
  try {
    const checkMsgInfoListById = await axiosInstance.get(
      "/checkMsg/getCheckInfo"
    );
    return checkMsgInfoListById.data;
  } catch (error: any) {
    throw new Error(error.message || "获取消息列表失败");
  }
};
