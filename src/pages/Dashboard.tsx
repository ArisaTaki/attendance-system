import {
  Avatar,
  Box,
  Button,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { useAuth } from "../context/AuthContext"; // 导入认证上下文钩子
import { useEffect, useState } from "react";
import StudentAttendance from "../components/StudentAttendance.tsx";
import { Role } from "./register.tsx";
import { useUser } from "../hook/useUser.ts";
import LeaveRequests from "../components/LeaveRequests.tsx";
import LeaveRequestForm from "../components/LeaveRequestForm.tsx";
import TeacherAttendance from "../components/TeacherAttendance.tsx";
import TeacherLeaveManagement from "../components/TeacherLeaveManagement.tsx";
import SignInCreation from "../components/SignInCreation.tsx";
import UserInfo from "../components/UserInfo.tsx";
import TeacherCourseAttendance from "../components/TeacherCourseAttendance.tsx";
import StudentAttendanceInfo from "../components/StudentAttendanceInfo.tsx";
import StudentCheckIn from "../components/StudentCheckIn.tsx";
import EditProfile from "../components/EditProfile.tsx";

const Dashboard = () => {
  const { logout } = useAuth(); // 从上下文中获取登出函数
  const [role, setRole] = useState<Role>();
  const [studentOrTeacherTabIndex, setStudentOrTeacherTabIndex] = useState(0);
  const [adminTabIndex, setAdminTabIndex] = useState(0);
  const { getUserInfo } = useUser();

  const user = getUserInfo();

  const handleTabsChange = (index: number) => {
    if (role === Role.Teacher || role === Role.Student) {
      setStudentOrTeacherTabIndex(index);
    } else if (role === Role.Admin) {
      setAdminTabIndex(index);
    }
  };

  useEffect(() => {
    if (!!user) {
      setRole(Number(user.roles[0]));
    }
  }, [user]);

  const renderContentBasedOnRole = () => {
    switch (role as Role) {
      case Role.Student:
        return (
          <Box>
            <Tabs
              isLazy
              lazyBehavior="unmount"
              index={studentOrTeacherTabIndex}
              onChange={handleTabsChange}
            >
              <TabList>
                <Tab>考勤信息</Tab>
                <Tab>请假管理</Tab>
                <Tab>请假申请</Tab>
                <Tab>签到</Tab>
                <Tab>个人信息管理</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <StudentAttendance />
                </TabPanel>
                <TabPanel>
                  <LeaveRequests />
                </TabPanel>
                <TabPanel>
                  <LeaveRequestForm />
                </TabPanel>
                <TabPanel>
                  <StudentCheckIn />
                </TabPanel>
                <TabPanel>
                  <EditProfile />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        );
      case Role.Teacher:
        return (
          <Box>
            <Tabs
              isLazy
              lazyBehavior="unmount"
              index={studentOrTeacherTabIndex}
              onChange={handleTabsChange}
            >
              <TabList>
                <Tab>考勤信息管理</Tab>
                <Tab>请假信息管理</Tab>
                <Tab>签到发布</Tab>
                <Tab>个人信息管理</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <TeacherAttendance />
                </TabPanel>
                <TabPanel>
                  <TeacherLeaveManagement />
                </TabPanel>
                <TabPanel>
                  <SignInCreation />
                </TabPanel>
                <TabPanel>
                  <EditProfile />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        );
      case Role.Admin:
        return (
          <Box>
            <Tabs
              isLazy
              lazyBehavior="unmount"
              index={adminTabIndex}
              onChange={handleTabsChange}
            >
              <TabList>
                <Tab>查看学生/老师信息</Tab>
                <Tab>查看学生的考勤信息</Tab>
                <Tab>教师的课程考勤信息</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <UserInfo />
                </TabPanel>
                <TabPanel>
                  <StudentAttendanceInfo />
                </TabPanel>
                <TabPanel>
                  <TeacherCourseAttendance />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        );
      default:
        return <Text>未知用户角色</Text>;
    }
  };

  return (
    <Box minW="100vw" minH="100vh" width={0} p={5}>
      <Flex
        mb={5}
        justify="space-between"
        align="center"
        p={5}
        bg="blue.500"
        color="white"
      >
        <Flex align="center">
          <Avatar
            name={user?.nickName || "用户"}
            src={user?.avatar}
            size="sm"
            mr={2}
          />
          <Text>{user?.nickName || "未命名用户"}</Text>
        </Flex>
        <Text fontSize="xl">欢迎进入考勤管理系统</Text>
        <Button colorScheme="red" onClick={logout}>
          登出
        </Button>
      </Flex>
      {renderContentBasedOnRole()}
    </Box>
  );
};

export default Dashboard;
