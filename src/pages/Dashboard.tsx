import { Box, Text, Button } from '@chakra-ui/react';
import { useAuth } from '../context/AuthContext'; // 导入认证上下文钩子
import { useEffect, useState } from 'react';
import StudentAttendance from "../components/StudentAttendance.tsx";
import {Role} from "./register.tsx";
import {useUser} from "../hook/useUser.ts";
import LeaveRequests from "../components/LeaveRequests.tsx";
import LeaveRequestForm from "../components/LeaveRequestForm.tsx";

const Dashboard = () => {
	const { logout } = useAuth(); // 从上下文中获取登出函数
	const [role, setRole] = useState<Role>();
	const user = useUser()
	
	useEffect(() => {
		if (!!user) {
			setRole(user.roles[0]);
		}
	}, [user]);
	
	const renderContentBasedOnRole = () => {
		switch (role) {
			case '1':
				return (
					<>
						<StudentAttendance />
						<LeaveRequests />
						<LeaveRequestForm />
					</>
				);
			case '2':
				return <Text>教师内容</Text>;
			case '3':
				return <Text>管理员内容</Text>;
			default:
				return <Text>未知用户角色</Text>;
		}
	};
	
	return (
		<Box minW="100vw" minH="100vh" width={0} p={5}>
			<Box display="flex" justifyContent="space-between" alignItems="center">
				<Text fontSize="xl">欢迎进入考勤管理系统</Text>
				<Button colorScheme="red" onClick={logout}>
					登出
				</Button>
			</Box>
			{renderContentBasedOnRole()}
		</Box>
	);
};

export default Dashboard;
