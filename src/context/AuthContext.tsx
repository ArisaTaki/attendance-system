import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Role } from "../pages/register.tsx";

export interface UserLoginResponse {
  token: string;
  userInfo: {
    account: string;
    nickName: string;
    roles: Role[];
    majorId: string;
    colleageId: string;
    email: string;
    phone: string;
    avatar: string;
  };
}

interface AuthContextType {
  isAuthenticated: boolean;
  login: (token: UserLoginResponse) => void;
  logout: () => void;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // 初始化时检查 localStorage 中是否有 token，并据此设置认证状态
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const token = localStorage.getItem("token");
    return !!token;
  });

  const login = (userLoginRes: UserLoginResponse) => {
    // 假设获取到的 token 是从登录响应中得来的
    localStorage.setItem("token", JSON.stringify(userLoginRes));
    setIsAuthenticated(true);
  };

  const logout = () => {
    // localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  // 监听 localStorage 变化，更新认证状态
  useEffect(() => {
    const handleStorageChange = () => {
      const token = localStorage.getItem("token");
      setIsAuthenticated(!!token);
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
