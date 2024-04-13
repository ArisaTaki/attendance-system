import React, { useState, useEffect } from 'react';
import { Box, Input, Button, Table, Thead, Tbody, Tr, Th, Td, TableContainer, Heading } from '@chakra-ui/react';

// 用户信息的类型定义
interface UserInfo {
	id: string;
	name: string;
	department: string;
	major?: string;
	role: '学生' | '教师';
}

const UserInfo: React.FC = () => {
	const [users, setUsers] = useState<UserInfo[]>([]);
	const [searchTerm, setSearchTerm] = useState('');
	
	useEffect(() => {
		// TODO: Fetch user info from an API
		const mockUsers: UserInfo[] = [
			{ id: 'S10001', name: '张三', department: '数学系', major: '高等数学', role: '学生' },
			{ id: 'T20001', name: '李教授', department: '物理系', role: '教师' },
			// More mock data...
		];
		setUsers(mockUsers);
	}, []);
	
	const handleSearch = () => {
		// TODO: Implement search functionality
		console.log('Searching for:', searchTerm);
	};
	
	return (
		<Box p={4}>
			<Heading size="lg" mb={4}>用户信息管理</Heading>
			<Input
				placeholder="按学号/工号或姓名搜索"
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
				mb={4}
			/>
			<Button onClick={handleSearch} colorScheme="blue">搜索</Button>
			<TableContainer mt={4}>
				<Table variant="simple">
					<Thead>
						<Tr>
							<Th>学号/工号</Th>
							<Th>姓名</Th>
							<Th>学院</Th>
							<Th>专业</Th>
							<Th>角色</Th>
						</Tr>
					</Thead>
					<Tbody>
						{users.map(user => (
							<Tr key={user.id}>
								<Td>{user.id}</Td>
								<Td>{user.name}</Td>
								<Td>{user.department}</Td>
								<Td>{user.major}</Td>
								<Td>{user.role}</Td>
							</Tr>
						))}
					</Tbody>
				</Table>
			</TableContainer>
		</Box>
	);
};

export default UserInfo;
