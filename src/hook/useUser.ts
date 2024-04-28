import { useAuth } from "../context/AuthContext.tsx";

/**
 * 自定义 Hook：useUser
 * 用于管理用户信息的 Hook
 * @returns {Object} 包含获取用户信息和更新用户信息的函数
 */
export const useUser = () => {
  const { isAuthenticated } = useAuth();

  /**
   * 获取用户信息
   * @returns {Object | null} 用户信息对象，如果用户未认证则返回 null
   */
  const getUserInfo = () => {
    if (!isAuthenticated) {
      return null;
    }

    const tokenString = localStorage.getItem("token");
    if (!tokenString) {
      return null;
    }

    try {
      const userLoginResponse = JSON.parse(tokenString);
      return userLoginResponse.userInfo;
    } catch (error) {
      console.error("Failed to parse user data:", error);
      return null;
    }
  };

  /**
   * 更新用户信息
   * @param {Object} userInfo 要更新的用户信息
   */
  const updateUserInfo = (userInfo: any) => {
    if (!isAuthenticated) {
      return;
    }

    const tokenString = localStorage.getItem("token");
    if (!tokenString) {
      return;
    }

    try {
      const userLoginResponse = JSON.parse(tokenString);
      userLoginResponse.userInfo = {
        ...userLoginResponse.userInfo,
        ...userInfo,
      };
      localStorage.setItem("token", JSON.stringify(userLoginResponse));
    } catch (error) {
      console.error("Failed to parse user data:", error);
    }
  };

  return { getUserInfo, updateUserInfo };
};
