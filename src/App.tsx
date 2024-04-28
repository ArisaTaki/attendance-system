import { ChakraProvider } from "@chakra-ui/react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/register.tsx";
import PrivateRoute from "./components/PrivateRoute.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";

function App() {
  return (
    <ChakraProvider>
      <AuthProvider>
        <Router>
          <Routes>
            {/* 登录页面 */}
            <Route path="/login" element={<Login />} />
            {/* 注册页面 */}
            <Route path="/register" element={<Register />} />
            {/* 私有路由 */}
            <Route element={<PrivateRoute />}>
              {/* 仪表盘页面 */}
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
            {/* 默认跳转到登录页面 */}
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;
