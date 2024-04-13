import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Textarea, useToast, Text } from '@chakra-ui/react';

interface FormData {
	courseName: string;
	studentId: string;
	name: string;
	leaveDate: string;
	reason: string;
}

const LeaveRequestForm: React.FC = () => {
	const [formData, setFormData] = useState<FormData>({ courseName: '', leaveDate: '', reason: '', studentId: '', name: ''});
	const toast = useToast();
	
	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};
	
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log('Submitting leave request:', formData);
		// 在这里添加API调用逻辑
		toast({
			title: "Leave Request Submitted",
			description: "Your leave request has been submitted for approval.",
			status: "success",
			duration: 5000,
			isClosable: true,
		});
	};
	
	return (
		<Box p={4}>
			<Text fontSize="xl" mb={4}>提交请假记录</Text>
			<form onSubmit={handleSubmit}>
				<FormControl isRequired>
					<FormLabel>课程名称</FormLabel>
					<Input name="courseName" value={formData.courseName} onChange={handleChange} />
				</FormControl>
				<FormControl isRequired mt={4}>
					<FormLabel>学号</FormLabel>
					<Input name="studentId" value={formData.studentId} onChange={handleChange} />
				</FormControl>
				<FormControl isRequired mt={4}>
					<FormLabel>姓名</FormLabel>
					<Input name="name" value={formData.name} onChange={handleChange} />
				</FormControl>
				<FormControl isRequired mt={4}>
					<FormLabel>请假时间</FormLabel>
					<Input type="date" name="leaveDate" value={formData.leaveDate} onChange={handleChange} />
				</FormControl>
				<FormControl isRequired mt={4}>
					<FormLabel>请假理由</FormLabel>
					<Textarea name="reason" value={formData.reason} onChange={handleChange} />
				</FormControl>
				<Button mt={4} colorScheme="blue" type="submit">Submit</Button>
			</form>
		</Box>
	);
};

export default LeaveRequestForm;
