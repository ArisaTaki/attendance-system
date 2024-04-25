import React, { useEffect, useState } from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
  VStack,
  Heading,
  FormControl,
  FormLabel,
  Select,
  Tooltip,
  Icon,
} from "@chakra-ui/react";
import { getCourses } from "../api/course";
import { getTeacherList } from "../api/user";
import { getLeaveList, LeaveApplication, LeaveListProps } from "../api/leave";
import { useUser } from "../hook/useUser";
import { InfoOutlineIcon } from "@chakra-ui/icons";

interface SelectionProps {
  id: string;
  name: string;
}

const leaveRequestStatus = ["未审批", "已批准", "已拒绝"];

const LeaveRequests: React.FC = () => {
  const [leaveRequests, setLeaveRequests] = useState<LeaveApplication[]>([]);
  const [teacherId, setTeacherId] = useState("");
  const [teachers, setTeachers] = useState<SelectionProps[]>([]);
  const [selectedCourseId, setSelectedCourseId] = useState("");

  const [courses, setCourses] = useState<SelectionProps[]>([]);
  const { getUserInfo } = useUser();

  const user = getUserInfo();

  const handleSearch = () => {
    const body: LeaveListProps = {
      studentId: user.account,
    };
    if (!!teacherId) {
      body.teacherId = teacherId;
    }
    if (!!selectedCourseId) {
      body.courseId = selectedCourseId;
    }
    getLeaveList(body).then((data) => {
      setLeaveRequests(data.list);
    });
  };

  const handleCourseChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCourseId(e.target.value);
  };

  useEffect(() => {
    getCourses().then((data) => {
      setCourses(
        data.map((course) => ({ id: String(course.id), name: course.name }))
      );
    });

    getTeacherList().then((data) => {
      setTeachers(
        data.list.map((teacher) => ({
          id: String(teacher.number),
          name: teacher.name,
        }))
      );
    });

    getLeaveList({ studentId: user.account }).then((data) => {
      setLeaveRequests(data.list);
    });
  }, [user.account]);

  return (
    <VStack spacing={4} p={5}>
      <Heading>我的请假记录</Heading>
      <Box
        width="full"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
      >
        <FormControl isRequired mb={4}>
          <FormLabel>老师</FormLabel>
          <Select
            placeholder="选择老师"
            value={teacherId}
            onChange={(e) => setTeacherId(e.target.value)}
          >
            {teachers.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </Select>
        </FormControl>
        <FormControl isRequired mb={4}>
          <FormLabel>课程</FormLabel>
          <Select
            placeholder="选择课程"
            value={selectedCourseId}
            onChange={handleCourseChange}
          >
            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.name}
              </option>
            ))}
          </Select>
        </FormControl>
        <Button onClick={handleSearch} colorScheme="blue">
          搜索
        </Button>
      </Box>
      <TableContainer width="full">
        <Table variant="simple">
          <Thead>
            <Tr backgroundColor="#e5e5e5">
              <Th>课程名称</Th>
              <Th>日期</Th>
              <Th>请假原因</Th>
              <Th>老师名称</Th>
              <Th>状态</Th>
            </Tr>
          </Thead>
          <Tbody>
            {leaveRequests.map((request, index) => (
              <Tr
                key={request.id}
                backgroundColor={index % 2 === 1 ? "#f0f0f0" : "white"}
              >
                <Td>{request.courseName}</Td>
                <Td>{request.day}</Td>
                <Td>{request.reason}</Td>
                <Td>{request.teacherName}</Td>
                <Td>
                  <Box
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                  >
                    <Box mr={4}>
                      {leaveRequestStatus[Number(request.status)]}
                    </Box>
                    {request.status === "2" && (
                      <Tooltip
                        label={request.remark || "无"}
                        fontSize="md"
                        hasArrow
                        placement="right"
                      >
                        <span>
                          <Icon as={InfoOutlineIcon} w={6} h={6} />
                        </span>
                      </Tooltip>
                    )}
                  </Box>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </VStack>
  );
};

export default LeaveRequests;
