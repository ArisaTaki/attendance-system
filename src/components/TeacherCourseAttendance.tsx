import React, { useState } from 'react';
import {
	Box, Button, FormControl, FormLabel, Input, Table, Thead, Tbody, Tr, Th, Td, TableContainer, Heading
} from '@chakra-ui/react';

interface CourseAttendanceDetail {
	teacherId: string;
	courseId: string;
	courseName: string;
	date: string;
	absentCount: number;
}

const TeacherCourseAttendance: React.FC = () => {
	const [searchParams, setSearchParams] = useState({
		teacherId: '',
		startDate: '',
		endDate: '',
	});
	
	// Mock data for demonstration
	const [details, setDetails] = useState<CourseAttendanceDetail[]>([
		{ teacherId: 'T20001', courseId: 'C1001', courseName: '高等数学', date: '2024-02-15', absentCount: 2 },
		{ teacherId: 'T20002', courseId: 'C1002', courseName: '线性代数', date: '2024-02-16', absentCount: 3 },
	]);
	
	const handleSearch = () => {
		console.log('Searching:', searchParams);
		// TODO: Implement API call for actual data
	};
	
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setSearchParams(prev => ({ ...prev, [name]: value }));
	};
	
	return (
		<Box p={4}>
			<Heading size="lg" mb={4}>教师课程考勤详细信息</Heading>
			<FormControl mb={4}>
				<FormLabel>教师工号</FormLabel>
				<Input name="teacherId" value={searchParams.teacherId} onChange={handleChange} />
			</FormControl>
			<FormControl mb={4}>
				<FormLabel>开始日期</FormLabel>
				<Input type="date" name="startDate" value={searchParams.startDate} onChange={handleChange} />
			</FormControl>
			<FormControl mb={4}>
				<FormLabel>结束日期</FormLabel>
				<Input type="date" name="endDate" value={searchParams.endDate} onChange={handleChange} />
			</FormControl>
			<Button onClick={handleSearch} colorScheme="blue">搜索</Button>
			<TableContainer mt={4}>
				<Table variant="simple">
					<Thead>
						<Tr>
							<Th>教师工号</Th>
							<Th>课程编号</Th>
							<Th>课程名称</Th>
							<Th>日期</Th>
							<Th>缺勤人数</Th>
						</Tr>
					</Thead>
					<Tbody>
						{details.map(detail => (
							<Tr key={detail.teacherId}>
								<Td>{detail.teacherId}</Td>
								<Td>{detail.courseId}</Td>
								<Td>{detail.courseName}</Td>
								<Td>{detail.date}</Td>
								<Td>{detail.absentCount}</Td>
							</Tr>
						))}
					</Tbody>
				</Table>
			</TableContainer>
		</Box>
	);
};

export default TeacherCourseAttendance;
