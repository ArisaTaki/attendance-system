import { useState, useEffect } from 'react';
import { Box, Text, VStack, Heading, Input, Button } from '@chakra-ui/react';

// 假设的考勤信息类型
interface AttendanceRecord {
	courseName: string;
	checkInTime: string;
	checkInLocation: string;
	teacherName: string;
}

// 学生考勤信息组件
const StudentAttendance = () => {
	// 考勤信息状态
	const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);
	const [searchTerm, setSearchTerm] = useState('');
	
	// 模拟从服务器加载数据
	useEffect(() => {
		const fetchData = async () => {
			// 模拟数据
			const mockData: AttendanceRecord[] = [
				{ courseName: "Mathematics", checkInTime: "2023-04-10 08:00", checkInLocation: "Room 101", teacherName: "Mr. Smith" },
				{ courseName: "Physics", checkInTime: "2023-04-10 10:00", checkInLocation: "Room 102", teacherName: "Mrs. Doe" }
			];
			setAttendanceRecords(mockData);
		};
		fetchData();
	}, []);
	
	// 搜索考勤记录
	const handleSearch = () => {
		console.log('Searching for:', searchTerm);
		// 这里应该是调用API来根据搜索条件过滤数据
	};
	
	return (
		<VStack spacing={4} p={5}>
			<Heading>我的考勤记录</Heading>
			<Input
				placeholder="搜索课程或教师"
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
			/>
			<Button colorScheme="blue" onClick={handleSearch}>搜索</Button>
			{attendanceRecords.map((record, index) => (
				<Box key={index} p={5} shadow="md" borderWidth="1px" borderRadius="lg" width="full">
					<Text fontWeight="bold">{record.courseName}</Text>
					<Text>时间: {record.checkInTime}</Text>
					<Text>地点: {record.checkInLocation}</Text>
					<Text>教师: {record.teacherName}</Text>
				</Box>
			))}
		</VStack>
	);
};

export default StudentAttendance;
