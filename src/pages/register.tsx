import { Box, Button, FormControl, FormLabel, Input, VStack, useToast, Heading, Textarea, Image } from '@chakra-ui/react';
import React, { useState } from 'react';

const Register = () => {
	const [userDetails, setUserDetails] = useState({
		id: '',
		password: '',
		name: '',
		department: '',
		phone: '',
		email: '',
		avatar: ''
	});
	const toast = useToast();
	
	const handleChange = (e) => {
		const { name, value } = e.target;
		setUserDetails(prev => ({
			...prev,
			[name]: value
		}));
	};
	
	const handleRegister = async (event: React.FormEvent) => {
		event.preventDefault();
		// 注册逻辑，调用API
		console.log("注册信息", userDetails);
		toast({
			title: "注册成功",
			description: "您的账户已创建。",
			status: "success",
			duration: 9000,
			isClosable: true,
		});
	};
	
	return (
		<Box minH="100vh" alignItems="center" justifyContent="center">
			<Box w="sm" p={8} boxShadow="md">
				<Heading as="h2" size="lg" textAlign="center" mb={6}>
					注册
				</Heading>
				<form onSubmit={handleRegister}>
					<VStack spacing={4}>
						<FormControl isRequired>
							<FormLabel>学号/工号</FormLabel>
							<Input type="text" name="id" value={userDetails.id} onChange={handleChange} />
						</FormControl>
						<FormControl isRequired>
							<FormLabel>密码</FormLabel>
							<Input type="password" name="password" value={userDetails.password} onChange={handleChange} />
						</FormControl>
						<FormControl isRequired>
							<FormLabel>姓名</FormLabel>
							<Input type="text" name="name" value={userDetails.name} onChange={handleChange} />
						</FormControl>
						<FormControl isRequired>
							<FormLabel>专业/学院</FormLabel>
							<Input type="text" name="department" value={userDetails.department} onChange={handleChange} />
						</FormControl>
						<FormControl isRequired>
							<FormLabel>手机号码</FormLabel>
							<Input type="phone" name="phone" value={userDetails.phone} onChange={handleChange} />
						</FormControl>
						<FormControl isRequired>
							<FormLabel>邮箱</FormLabel>
							<Input type="email" name="email" value={userDetails.email} onChange={handleChange} />
						</FormControl>
						<FormControl>
							<FormLabel>头像上传</FormLabel>
							<input type="file" name="avatar" onChange={(e) => setUserDetails(prev => ({
								...prev,
								avatar: URL.createObjectURL(e.target.files[0])
							}))}/>
						</FormControl>
						<Button colorScheme="blue" w="full" mt={4} type="submit">
							注册
						</Button>
					</VStack>
				</form>
			</Box>
		</Box>
	);
};

export default Register;
