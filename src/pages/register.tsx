import {
	Box,
	Button,
	FormControl,
	FormLabel,
	Input,
	VStack,
	useToast,
	Heading,
	FormErrorMessage, RadioGroup, HStack, Radio
} from '@chakra-ui/react';
//  Textarea, Image
import React, { useState } from 'react';
import AvatarUpload from "../components/AvatarUpload.tsx";
import {useNavigate} from "react-router-dom";

// 定义 State 类型
interface UserDetails {
	id: string;
	password: string;
	name: string;
	department: string;
	phone: string;
	email: string;
	avatar: File | null;
	type: string;
}
const Register = () => {
	const [userDetails, setUserDetails] = useState<UserDetails>({
		id: '',
		password: '',
		name: '',
		department: '',
		phone: '',
		email: '',
		avatar: null,
		type: 'student'
	});
	const toast = useToast();
	const navigate = useNavigate()
	
	const [error, setError] = useState({ phone: '', password: '' });
	
	const phoneRegex = /^1[3-9]\d{9}$/;
	const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
	
	const handleValidation = (name: string, value: string) => {
		if (name === 'phone' && !phoneRegex.test(value)) {
			setError(prev => ({ ...prev, phone: '无效的手机号码' }));
		} else if (name === 'phone') {
			setError(prev => ({ ...prev, phone: '' }));
		}
		
		if (name === 'password' && !passwordRegex.test(value)) {
			setError(prev => ({ ...prev, password: '密码必须包含大小写字母、数字及特殊字符，且长度至少8位' }));
		} else if (name === 'password') {
			setError(prev => ({ ...prev, password: '' }));
		}
	};
	
	const handleChange = (e: React.ChangeEvent<HTMLInputElement> | string) => {
		if (typeof e === 'string') {
			setUserDetails(prev => ({
				...prev,
				type: e
			}));
		} else {
			const { name, value } = e.target;
			setUserDetails(prev => ({
				...prev,
				[name]: value
			}));
			handleValidation(name, value);
		}
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
		navigate('/login')
	};
	
	return (
		<Box minH="100vh" minW="100vw" display="flex" alignItems="center" justifyContent="center">
			<Box width="60%" p={8} boxShadow="md">
				<Heading as="h2" size="lg" textAlign="center" mb={6}>
					注册
				</Heading>
				<form onSubmit={handleRegister}>
					<VStack spacing={4}>
						<FormControl isRequired>
							<FormLabel>学号/工号</FormLabel>
							<Input type="text" name="id" value={userDetails.id} onChange={handleChange} />
						</FormControl>
						<FormControl isRequired isInvalid={!!error.password}>
							<FormLabel>密码</FormLabel>
							<Input type="password" name="password" value={userDetails.password} onChange={handleChange} />
							{error.password && <FormErrorMessage>{error.password}</FormErrorMessage>}
						</FormControl>
						<FormControl isRequired>
							<FormLabel>姓名</FormLabel>
							<Input type="text" name="name" value={userDetails.name} onChange={handleChange} />
						</FormControl>
						<FormControl isRequired>
							<FormLabel>专业/学院</FormLabel>
							<Input type="text" name="department" value={userDetails.department} onChange={handleChange} />
						</FormControl>
						<FormControl isRequired isInvalid={!!error.phone}>
							<FormLabel>手机号码</FormLabel>
							<Input type="phone" name="phone" value={userDetails.phone} onChange={handleChange} />
							{error.phone && <FormErrorMessage>{error.phone}</FormErrorMessage>}
						</FormControl>
						<FormControl isRequired>
							<FormLabel>邮箱</FormLabel>
							<Input type="email" name="email" value={userDetails.email} onChange={handleChange} />
						</FormControl>
						<FormControl>
							<FormLabel>头像上传</FormLabel>
							<AvatarUpload onFileSelected={(file: File) => setUserDetails(prev => ({
								...prev,
								avatar: file
							}))} />
						</FormControl>
						<FormControl>
							<FormLabel>学生还是老师？</FormLabel>
							<RadioGroup defaultValue="student" name="type" onChange={handleChange}>
								<HStack spacing={8}>
									<Radio value="student">学生</Radio>
									<Radio value="teacher">老师</Radio>
								</HStack>
							</RadioGroup>
						</FormControl>
						<Button colorScheme="blue" w="full" mt={4} type="submit" isDisabled={!!error.phone || !!error.password}>
							注册
						</Button>
						<Button colorScheme="gray" w="full" textColor="black" onClick={() => {
							navigate('/login')
						}}>
							去登录
						</Button>
					</VStack>
				</form>
			</Box>
		</Box>
	);
};

export default Register;
