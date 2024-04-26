import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { login } from "../api/auth";
import { useAuth } from "../context/AuthContext.tsx";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [number, setNumber] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const toast = useToast();
  const { login: passLogin } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await login(number, password);
      if (response) {
        toast({
          title: "登录成功",
          description: `您已成功登录，${response.userInfo.nickName}，欢迎回来！`,
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        setLoading(false);
        passLogin(response);
        navigate("/dashboard");
      }
    } catch (error: any) {
      toast({
        title: "登录失败",
        description: error.message || "登录失败",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      backgroundImage="url('../../public/image.png')"
      backgroundRepeat="no-repeat"
      backgroundSize={"cover"}
      minH="100vh"
      minW="100vw"
      display="flex"
      flexDirection={"column"}
      alignItems="center"
      justifyContent="center"
    >
      <Box
        backgroundColor="white"
        w="sm"
        pt={4}
        display="flex"
        alignItems="center"
        flexDirection="column"
      >
        <h1>考勤考核系统</h1>
      </Box>
      <Box w="sm" p={8} boxShadow="md" backgroundColor="white">
        <form onSubmit={handleLogin}>
          <VStack spacing={4}>
            <FormControl id="number">
              <FormLabel>用户ID</FormLabel>
              <Input
                type="text"
                placeholder="请输入学号或工号"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>密码</FormLabel>
              <Input
                type="password"
                placeholder="请输入密码"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            <Button
              isLoading={loading}
              colorScheme="blue"
              w="full"
              mt={4}
              type="submit"
            >
              登录
            </Button>
            <Button
              colorScheme="gray"
              textColor="black"
              w="full"
              mt={4}
              onClick={() => {
                navigate("/register");
              }}
            >
              注册
            </Button>
          </VStack>
        </form>
      </Box>
    </Box>
  );
};

export default Login;
