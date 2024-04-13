import React, { useState } from 'react';
import {
	Box, Button, FormControl, FormLabel, Input, Select, Table, Tbody, Td, Th, Thead, Tr
} from '@chakra-ui/react';

// 请假请求的类型定义
interface LeaveRequest {
	id: number;
	课程名称: string;
	学生姓名: string;
	学生学号: string;
	请假日期: string;
	请假原因: string;
	审批状态: '已批准' | '待审批' | '已拒绝';
}

const mockLeaveRequests: LeaveRequest[] = [
	{
		id: 1,
		课程名称: '高等数学',
		学生姓名: '张三',
		学生学号: 'S10001',
		请假日期: '2024-09-15',
		请假原因: '家庭原因',
		审批状态: '待审批'
	},
	{
		id: 2,
		课程名称: '线性代数',
		学生姓名: '李四',
		学生学号: 'S10002',
		请假日期: '2024-09-16',
		请假原因: '参加学术会议',
		审批状态: '已批准'
	},
	// 更多模拟数据...
];

const TeacherLeaveManagement: React.FC = () => {
	const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>(mockLeaveRequests);
	const [searchTerm, setSearchTerm] = useState('');
	
	// 搜索功能省略，需要根据后端API实现
	const handleSearch = () => {
		console.log('搜索:', searchTerm);
	};
	
	// 在实际应用中，这应该会发送一个请求到后端来更新请假状态
	const updateLeaveRequestStatus = (id: number, newStatus: '已批准' | '已拒绝') => {
		setLeaveRequests((prev) =>
			prev.map((request) =>
				request.id === id ? { ...request, 审批状态: newStatus } : request
			)
		);
	};
	
	return (
		<Box p={4}>
			<FormControl>
				<FormLabel htmlFor='search'>搜索学生学号或课程名称</FormLabel>
				<Input
					id='search'
					type='text'
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					mb={4}
				/>
				<Button onClick={handleSearch} colorScheme="blue">搜索</Button>
			</FormControl>
			<Table mt={4}>
				<Thead>
					<Tr>
						<Th>课程名称</Th>
						<Th>学生姓名</Th>
						<Th>学生学号</Th>
						<Th>请假日期</Th>
						<Th>请假原因</Th>
						<Th>审批状态</Th>
						<Th>操作</Th>
					</Tr>
				</Thead>
				<Tbody>
					{leaveRequests.map((request) => (
						<Tr key={request.id}>
							<Td>{request.课程名称}</Td>
							<Td>{request.学生姓名}</Td>
							<Td>{request.学生学号}</Td>
							<Td>{request.请假日期}</Td>
							<Td>{request.请假原因}</Td>
							<Td>{request.审批状态}</Td>
							<Td>
								{request.审批状态 === '待审批' && (
									<Select onChange={(e) => updateLeaveRequestStatus(request.id, e.target.value as '已批准' | '已拒绝')}>
										<option value='已批准'>批准</option>
										<option value='已拒绝'>拒绝</option>
									</Select>
								)}
							</Td>
						</Tr>
					))}
				</Tbody>
			</Table>
		</Box>
	);
};

export default TeacherLeaveManagement;
