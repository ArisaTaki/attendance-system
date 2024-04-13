import {Box, Button, FormControl, FormLabel, Input, useToast, VStack} from '@chakra-ui/react';
import React, {useState} from 'react';
// import { login } from '../api/auth';
import {useAuth, UserLoginResponse} from "../context/AuthContext.tsx";
import {useNavigate} from 'react-router-dom'
import {Role} from "./register.tsx";

const Login = () => {
	const [userId, setUserId] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const toast = useToast();
	const { login: passLogin } = useAuth();
	const navigate = useNavigate()
	
	const handleLogin = async (event: React.FormEvent) => {
		event.preventDefault();
		try {
			// const response = await login(userId, password);
			const mockData: UserLoginResponse = {
				token: 'test-token',
				userInfo: {
					account: 'test-account',
					roles: [Role.Admin],
					nickname: 'test-nickname',
					majorId: 'test-majorId',
					colleageId: 'test-colleageId',
					email: 'test-email',
					phone: 'test-phone',
					avatar: 'test-avatar'
				}
			}
			toast({
				title: "登录成功",
				description: `您已成功登录，token:`,
				status: "success",
				duration: 9000,
				isClosable: true,
			});
			// TODO 等待token
			passLogin(mockData);
			navigate('/dashboard')
			// 进一步处理，如保存token，跳转等
		} catch (error: any) {
			toast({
				title: "登录错误",
				description: error.message,
				status: "error",
				duration: 9000,
				isClosable: true,
			});
		}
	};
	
	return (
		<Box minH="100vh" minW="100vw" display="flex" alignItems="center" justifyContent="center">
			<Box w="sm" p={8} boxShadow="md">
				<form onSubmit={handleLogin}>
					<VStack spacing={4}>
						<FormControl id="userId">
							<FormLabel>用户ID</FormLabel>
							<Input type="text" placeholder="请输入学号或工号" value={userId} onChange={(e) => setUserId(e.target.value)} />
						</FormControl>
						<FormControl id="password">
							<FormLabel>密码</FormLabel>
							<Input type="password" placeholder="请输入密码" value={password} onChange={(e) => setPassword(e.target.value)} />
						</FormControl>
						<Button colorScheme="blue" w="full" mt={4} type="submit">
							登录
						</Button>
						<Button colorScheme="gray" textColor="black" w="full" mt={4} onClick={() => {
							navigate('/register')
						}}>
							注册
						</Button>
					</VStack>
				</form>
			</Box>
		</Box>
	);
};

export default Login;
