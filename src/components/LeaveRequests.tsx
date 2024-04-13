import React, { useEffect, useState } from 'react';
import {Box, Table, Thead, Tbody, Tr, Th, Td, TableContainer, Text, Input, Button} from '@chakra-ui/react';

// 定义请假请求的类型
interface LeaveRequest {
	id: number;
	courseName: string;
	leaveDate: string;
	reason: string;
	teacher: string;
	status: string;
}

const LeaveRequests: React.FC = () => {
	const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([]);
	const [searchTerm, setSearchTerm] = useState('');
	
	const handleSearch = () => {
		console.log('Searching for:', searchTerm);
		// 这里应该是调用API来根据搜索条件过滤数据
	};
	
	useEffect(() => {
		const fetchLeaveRequests = async () => {
			const mockData: LeaveRequest[] = [
				{ id: 1, courseName: "Math 101", leaveDate: "2024-04-15", reason: "Medical Appointment", teacher: 'Mike', status: "Approved" },
				{ id: 2, courseName: "Physics 202", leaveDate: "2024-04-20", reason: "Family Event", teacher: 'Tim', status: "Pending" },
			];
			setLeaveRequests(mockData);
		};
		
		fetchLeaveRequests();
	}, []);
	
	return (
		<Box p={4}>
			<Text fontSize="xl" mb={4}>我的请假记录</Text>
			<Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
				<Input
					placeholder="搜索课程或教师"
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
				/>
				<Button ml={10} colorScheme="blue" onClick={handleSearch}>搜索</Button>
			</Box>
			<TableContainer>
				<Table variant="simple">
					<Thead>
						<Tr>
							<Th>课程名称</Th>
							<Th>日期</Th>
							<Th>请假原因</Th>
							<Th>老师名称</Th>
							<Th>状态</Th>
						</Tr>
					</Thead>
					<Tbody>
						{leaveRequests.map(request => (
							<Tr key={request.id}>
								<Td>{request.courseName}</Td>
								<Td>{request.leaveDate}</Td>
								<Td>{request.reason}</Td>
								<Td>{request.teacher}</Td>
								<Td>{request.status}</Td>
							</Tr>
						))}
					</Tbody>
				</Table>
			</TableContainer>
		</Box>
	);
};

export default LeaveRequests;
