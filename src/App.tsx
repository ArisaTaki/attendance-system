import { ChakraProvider } from '@chakra-ui/react';
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import Login from './pages/Login';
import Register from "./pages/register.tsx";
import PrivateRoute from "./components/PrivateRoute.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import { AuthProvider } from './context/AuthContext.tsx';

function App() {
  return (
    <ChakraProvider>
      <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;
