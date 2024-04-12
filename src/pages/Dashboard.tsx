import { Box, Text, Button } from '@chakra-ui/react';
import { useAuth } from '../context/AuthContext'; // 导入认证上下文钩子
import { useEffect, useState } from 'react';

const Dashboard = () => {
	const { logout } = useAuth(); // 从上下文中获取登出函数
	const [role, setRole] = useState('');
	
	useEffect(() => {
		// 假设从本地存储获取用户角色
		const userRole = localStorage.getItem('userRole');
		setRole(userRole ?? '');
	}, []);
	
	const renderContentBasedOnRole = () => {
		switch (role) {
			case 'student':
				return <Text>学生内容</Text>;
			case 'teacher':
				return <Text>教师内容</Text>;
			case 'admin':
				return <Text>管理员内容</Text>;
			default:
				return <Text>未知用户角色</Text>;
		}
	};
	
	return (
		<Box p={5}>
			<Text fontSize="xl">欢迎进入考勤管理系统</Text>
			{renderContentBasedOnRole()}
			<Button colorScheme="red" onClick={logout}>
				登出
			</Button>
		</Box>
	);
};

export default Dashboard;
