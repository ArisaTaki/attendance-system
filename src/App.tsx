import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from "./pages/register.tsx";

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* 你可以在这里添加更多的路由 */}
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
