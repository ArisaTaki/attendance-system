import React, { useState, useEffect } from 'react';
import { Box, Table, Thead, Tbody, Tr, Th, Td, TableContainer, Input, Button } from '@chakra-ui/react';
import StudentAbsences from "./StudentAbsences.tsx";

interface AttendanceRecord {
	courseId: string;
	courseName: string;
	date: string;
	startTime: string;
	endTime: string;
	totalStudents: number;
	attended: number;
}

const TeacherAttendance: React.FC = () => {
	const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);
	const [searchTerm, setSearchTerm] = useState('');
	
	useEffect(() => {
		// Here you would fetch the actual data from an API
		const mockData: AttendanceRecord[] = [
			{ courseId: '101', courseName: 'Mathematics', date: '2024-04-01', startTime: '10:00', endTime: '12:00', totalStudents: 30, attended: 25 },
			{ courseId: '102', courseName: 'Physics', date: '2024-04-02', startTime: '13:00', endTime: '15:00', totalStudents: 28, attended: 28 },
			// More records...
		];
		setAttendanceRecords(mockData);
	}, []);
	
	const handleSearch = () => {
		console.log("Searching for:", searchTerm);
		// Add search functionality here based on searchTerm
	};
	
	return (
		<Box p={5}>
			<Input placeholder="Search by course name or student ID" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
			<Button onClick={handleSearch} mt={2} colorScheme="blue">Search</Button>
			<TableContainer my={4}>
				<Table variant="simple">
					<Thead>
						<Tr>
							<Th>课程名</Th>
							<Th>日期</Th>
							<Th>开启时间</Th>
							<Th>结束时间</Th>
							<Th>总共学生数</Th>
							<Th>签到数</Th>
						</Tr>
					</Thead>
					<Tbody>
						{attendanceRecords.map((record) => (
							<Tr key={record.courseId}>
								<Td>{record.courseName}</Td>
								<Td>{record.date}</Td>
								<Td>{record.startTime}</Td>
								<Td>{record.endTime}</Td>
								<Td>{record.totalStudents}</Td>
								<Td>{record.attended}</Td>
							</Tr>
						))}
					</Tbody>
				</Table>
			</TableContainer>
			<StudentAbsences />
		</Box>
	);
};

export default TeacherAttendance;
