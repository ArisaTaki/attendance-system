import { Box, Button, FormControl, FormLabel, Input, VStack, useToast } from '@chakra-ui/react';
import { useState } from 'react';
import { login } from '../api/auth';

const Login = () => {
	const [userId, setUserId] = useState('');
	const [password, setPassword] = useState('');
	const toast = useToast();
	
	const handleLogin = async (event: React.FormEvent) => {
		event.preventDefault();
		try {
			const response = await login(userId, password);
			toast({
				title: "登录成功",
				description: `您已成功登录，token: ${response.data.token}`,
				status: "success",
				duration: 9000,
				isClosable: true,
			});
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
		<Box minH="100vh" alignItems="center" justifyContent="center">
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
					</VStack>
				</form>
			</Box>
		</Box>
	);
};

export default Login;
