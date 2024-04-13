import React, { useState, useEffect } from 'react';
import { Box, Button, Text, VStack } from '@chakra-ui/react';

interface SignInTask {
	courseId: string;
	courseName: string;
	location: string;
	startTime: string;
	endTime: string;
}

const StudentCheckIn: React.FC = () => {
	const [currentTask, setCurrentTask] = useState<SignInTask | null>(null);
	const [isCheckedIn, setIsCheckedIn] = useState(false);
	
	useEffect(() => {
		// TODO: Fetch the current sign-in task from an API
		const mockTask: SignInTask = {
			courseId: 'C1001',
			courseName: '高等数学',
			location: '教学楼A101',
			startTime: '09:00',
			endTime: '10:00',
		};
		setCurrentTask(mockTask);
	}, []);
	
	const handleCheckIn = () => {
		// TODO: Implement the check-in logic with an API call
		console.log('Student checking in...');
		setIsCheckedIn(true);
	};
	
	return (
		<Box p={4}>
			{currentTask ? (
				<VStack spacing={3}>
					<Text fontSize="xl">课程名称: {currentTask.courseName}</Text>
					<Text>位置: {currentTask.location}</Text>
					<Text>开始时间: {currentTask.startTime}</Text>
					<Text>结束时间: {currentTask.endTime}</Text>
					<Button colorScheme="blue" onClick={handleCheckIn} disabled={isCheckedIn}>
						{isCheckedIn ? '已签到' : '签到'}
					</Button>
				</VStack>
			) : (
				<Text fontSize="xl">当前没有签到任务。</Text>
			)}
		</Box>
	);
};

export default StudentCheckIn;
