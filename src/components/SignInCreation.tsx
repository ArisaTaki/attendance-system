import React, { useState } from 'react';
import {
	Box, Button, FormControl, FormLabel, Input, VStack, useToast
} from '@chakra-ui/react';
import SignInInfo from "./SignInInfo.tsx";

// 签到任务的类型定义
interface SignInTask {
	startTime: string;
	endTime: string;
	location: string;
	teacherName: string;
	courseName: string;
}

const SignInCreation: React.FC = () => {
	const [signInTask, setSignInTask] = useState<SignInTask>({
		startTime: '',
		endTime: '',
		location: '',
		teacherName: '',
		courseName: '',
	});
	const [showSignInfo, setShowSignInfo] = useState(false)
	const toast = useToast();
	
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setSignInTask(prev => ({ ...prev, [name]: value }));
	};
	
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		// TODO: Replace with actual API call to create a sign-in task
		console.log('Creating sign-in task:', signInTask);
		toast({
			title: "签到任务已发布",
			description: "签到任务成功创建并且现在处于活跃状态。",
			status: "success",
			duration: 5000,
			isClosable: true,
		});
		setShowSignInfo(true);
	};
	
	return (
		<Box p={4}>
			<VStack as="form" onSubmit={handleSubmit} spacing={4}>
				<FormControl isRequired>
					<FormLabel htmlFor='courseName'>课程名称</FormLabel>
					<Input id='courseName' name='courseName' value={signInTask.courseName} onChange={handleChange} />
				</FormControl>
				<FormControl isRequired>
					<FormLabel htmlFor='teacherName'>教师姓名</FormLabel>
					<Input id='teacherName' name='teacherName' value={signInTask.teacherName} onChange={handleChange} />
				</FormControl>
				<FormControl isRequired>
					<FormLabel htmlFor='location'>地点</FormLabel>
					<Input id='location' name='location' value={signInTask.location} onChange={handleChange} />
				</FormControl>
				<FormControl isRequired>
					<FormLabel htmlFor='startTime'>开始时间</FormLabel>
					<Input id='startTime' name='startTime' type="datetime-local" value={signInTask.startTime} onChange={handleChange} />
				</FormControl>
				<FormControl isRequired>
					<FormLabel htmlFor='endTime'>结束时间</FormLabel>
					<Input id='endTime' name='endTime' type="datetime-local" value={signInTask.endTime} onChange={handleChange} />
				</FormControl>
				<Button colorScheme='blue' type="submit">发布签到</Button>
			</VStack>
			{showSignInfo && (
				<SignInInfo />
			)}
		</Box>
	);
};

export default SignInCreation;
