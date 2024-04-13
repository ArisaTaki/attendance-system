import {
	Box,
	Button,
	FormControl,
	FormLabel,
	Input,
	VStack,
	useToast,
	Heading,
	FormErrorMessage, RadioGroup, HStack, Radio, Select
} from '@chakra-ui/react';
import React, {useEffect, useState} from 'react';
import AvatarUpload from "../components/AvatarUpload.tsx";
import {useNavigate} from "react-router-dom";

export enum Role {
	Student = 3,
	Teacher = 2,
	Admin = 1
}

interface SelectionProps {
	id: number;
	name: string;
}
// 定义 State 类型
interface UserDetails {
	number: string;
	password: string;
	name: string;
	colleageId: string;
	majorId: string;
	phone: string;
	email: string;
	avatar: string | null;
	roleId: Role;
}
const Register = () => {
	const [userDetails, setUserDetails] = useState<UserDetails>({
		number: '',
		password: '',
		name: '',
		colleageId: '',
		majorId: '',
		phone: '',
		email: '',
		avatar: null,
		roleId: Role.Student
	});
	const toast = useToast();
	const navigate = useNavigate()
	
	const [error, setError] = useState({ phone: '', password: '' });
	const [colleages, setColleageId] = useState<SelectionProps[]>()
	const [majors, setMajors] = useState<SelectionProps[]>()
	
	const mockColleages = [
		{
			"pageNum": null,
			"pageSize": null,
			"id": 1,
			"name": "计算机学院",
			"code": "201",
			"createTime": 1712959726000
		},
		{
			"pageNum": null,
			"pageSize": null,
			"id": 2,
			"name": "马克思学院",
			"code": "202",
			"createTime": 1712959747000
		},
		{
			"pageNum": null,
			"pageSize": null,
			"id": 3,
			"name": "商学院",
			"code": "203",
			"createTime": 1712959762000
		},
		{
			"pageNum": null,
			"pageSize": null,
			"id": 4,
			"name": "医学院",
			"code": "204",
			"createTime": 1712959792000
		},
		{
			"pageNum": null,
			"pageSize": null,
			"id": 5,
			"name": "人工智能学院",
			"code": "205",
			"createTime": 1712959814000
		}
	]
	
	const mockMajors = [
		{
			"pageNum": null,
			"pageSize": null,
			"id": 1,
			"name": "软件工程",
			"code": "20101",
			"createTime": 1712959726000
		},
		{
			"pageNum": null,
			"pageSize": null,
			"id": 2,
			"name": "计算机科学与技术",
			"code": "20102",
			"createTime": 1712959747000
		},
		{
			"pageNum": null,
			"pageSize": null,
			"id": 3,
			"name": "网络工程",
			"code": "20103",
			"createTime": 1712959762000
		},
		{
			"pageNum": null,
			"pageSize": null,
			"id": 4,
			"name": "信息管理与信息系统",
			"code": "20104",
			"createTime": 1712959792000
		},
		{
			"pageNum": null,
			"pageSize": null,
			"id": 5,
			"name": "数据科学与大数据技术",
			"code": "20105",
			"createTime": 1712959814000
		}
	]
	
	useEffect(() => {
		setColleageId(mockColleages.map(colleage => ({ id: colleage.id, name: colleage.name })));
		setMajors(mockMajors.map(major => ({ id: major.id, name: major.name })));
	}, []);
	
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
	
	const handleChange = (e: React.ChangeEvent<HTMLInputElement> | Role | React.ChangeEvent<HTMLSelectElement>) => {
		if (typeof e === 'number') {
			setUserDetails(prev => ({
				...prev,
				roleId: e
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
		// navigate('/login')
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
							<FormLabel>{userDetails.roleId === Role.Student ? '学号' : '工号'}</FormLabel>
							<Input type="text" name="number" value={userDetails.number} onChange={handleChange} />
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
							<FormLabel>学院</FormLabel>
							<Select placeholder='选择你的学院' value={userDetails.colleageId} name="colleageId" onChange={handleChange}>
								{colleages?.map(colleage => <option key={colleage.id} value={colleage.id}>{colleage.name}</option>)}
							</Select>
						</FormControl>
						{userDetails.roleId === Role.Student && <FormControl isRequired>
							<FormLabel>专业</FormLabel>
							<Select placeholder='选择你的专业' value={userDetails.majorId} name="majorId" onChange={handleChange}>
								{majors?.map(major => <option key={major.id} value={major.id}>{major.name}</option>)}
							</Select>
						</FormControl>}
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
							<AvatarUpload onFileSelected={(file: string) => setUserDetails(prev => ({
								...prev,
								avatar: file
							}))} />
						</FormControl>
						<FormControl>
							<FormLabel>学生还是老师？</FormLabel>
							<RadioGroup defaultValue={String(Role.Student)} name="roleId" onChange={
								(value) => handleChange(Number(value) as Role)
							}>
								<HStack spacing={8}>
									<Radio value={String(Role.Student)}>学生</Radio>
									<Radio value={String(Role.Teacher)}>老师</Radio>
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
