import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/**
 * 私有路由组件
 *
 * 根据用户的身份验证状态，决定是否渲染路由的内容或者重定向到登录页面。
 *
 * @returns 如果用户已经通过身份验证，则渲染路由的内容；否则重定向到登录页面。
 */
const PrivateRoute = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
