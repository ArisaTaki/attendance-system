import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Select,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import StudentAbsences from "./StudentAbsences.tsx";
import { getCourses } from "../api/course.ts";
import { useUser } from "../hook/useUser.ts";
import { CourseSign, getCheckList } from "../api/check.ts";

interface SelectionProps {
  id: string;
  name: string;
}

/**
 * 教师考勤组件
 */
const TeacherAttendance: React.FC = () => {
  // 存储考勤记录的状态
  const [attendanceRecords, setAttendanceRecords] = useState<CourseSign[]>([]);
  // 存储课程选择项的状态
  const [courses, setCourses] = useState<SelectionProps[]>([]);
  // 存储当前选中的课程ID的状态
  const [selectedCourseId, setSelectedCourseId] = useState("");
  // 获取用户信息的钩子函数
  const { getUserInfo } = useUser();

  // 获取当前用户信息
  const user = getUserInfo();

  useEffect(() => {
    // 初始化加载考勤记录和课程选择项
    getCheckList().then((data) => {
      setAttendanceRecords(data.list);
    });

    getCourses().then((data) => {
      setCourses(
        data.map((course) => ({ id: String(course.id), name: course.name }))
      );
    });
  }, []);

  // 处理搜索按钮点击事件
  const handleSearch = () => {
    // 根据选中的课程ID和教师ID获取考勤记录
    getCheckList({
      courseId: Number(selectedCourseId),
      teacherId: user.account,
    }).then((data) => {
      setAttendanceRecords(data.list);
    });
  };

  // 处理课程选择项变化事件
  const handleCourseChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCourseId(e.target.value);
  };

  return (
    <Box p={5}>
      <FormControl mb={4}>
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
      <Button onClick={handleSearch} mt={2} colorScheme="blue">
        搜索
      </Button>
      <TableContainer my={4}>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>课程名</Th>
              <Th>日期</Th>
              <Th>开始时间</Th>
              <Th>结束时间</Th>
              <Th>总学生数</Th>
              <Th>出勤数</Th>
            </Tr>
          </Thead>
          <Tbody>
            {attendanceRecords.map((record, index) => (
              <Tr key={index}>
                <Td>{record.courseName}</Td>
                <Td>{record.startTime}</Td>
                <Td>{record.startTime}</Td>
                <Td>{record.endTime}</Td>
                <Td>{record.studentIds.split(",").length}</Td>
                <Td>
                  {record.studentIds.split(",").length - record.absentCount}
                </Td>
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
