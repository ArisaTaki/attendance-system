import { useState, useEffect } from "react";
import {
  Box,
  Text,
  VStack,
  Heading,
  Button,
  FormControl,
  FormLabel,
  Select,
} from "@chakra-ui/react";
import { useUser } from "../hook/useUser";
import { CourseSign, getCheckRecords } from "../api/check";
import { getCourses } from "../api/course";
import { getTeacherList } from "../api/user";

interface SelectionProps {
  id: string;
  name: string;
}

// 学生考勤信息组件
const StudentAttendance = () => {
  // 考勤信息状态
  const [attendanceRecords, setAttendanceRecords] = useState<CourseSign[]>([]);
  const [formData, setFormData] = useState({
    courseId: undefined,
    teacherId: undefined,
  });
  const { getUserInfo } = useUser();
  const user = getUserInfo();
  const [courses, setCourses] = useState<SelectionProps[]>([]);
  const [teachers, setTeachers] = useState<SelectionProps[]>([]);

  // 模拟从服务器加载数据
  useEffect(() => {
    getCheckRecords({
      studentId: user?.account,
    }).then((data) => {
      setAttendanceRecords(data);
    });
    // 在这里添加获取课程列表和教师列表的逻辑
    getCourses().then((data) => {
      setCourses(
        data.map((course) => ({ id: String(course.id), name: course.name }))
      );
    });
    getTeacherList().then((data) => {
      setTeachers(
        data.list.map((teacher) => ({ id: teacher.number, name: teacher.name }))
      );
    });
  }, [user?.account]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // 搜索考勤记录
  const handleSearch = () => {
    getCheckRecords({
      studentId: user?.account,
      ...formData,
    }).then((data) => {
      setAttendanceRecords(data);
    });
  };

  return (
    <VStack spacing={4} p={5}>
      <Heading>我的考勤记录</Heading>
      <FormControl isRequired>
        <FormLabel>课程</FormLabel>
        <Select
          placeholder="选择你的课程"
          value={formData.courseId}
          name="courseId"
          onChange={handleChange}
        >
          {courses?.map((course) => (
            <option key={course.id} value={course.id}>
              {course.name}
            </option>
          ))}
        </Select>
      </FormControl>
      <FormControl isRequired mt={4}>
        <FormLabel>教师</FormLabel>
        <Select
          placeholder="选择你的教师"
          value={formData.teacherId}
          name="teacherId"
          onChange={handleChange}
        >
          {teachers?.map((teacher) => (
            <option key={teacher.id} value={teacher.id}>
              {teacher.name}
            </option>
          ))}
        </Select>
      </FormControl>
      <Button colorScheme="blue" onClick={handleSearch}>
        搜索
      </Button>
      {attendanceRecords.map((record, index) => (
        <Box
          key={index}
          p={5}
          shadow="md"
          borderWidth="1px"
          borderRadius="lg"
          width="full"
        >
          <Text fontWeight="bold">{record.courseName}</Text>
          <Text>时间: {record.signTime}</Text>
          <Text>地点: {record.palceMsg}</Text>
          <Text>教师: {record.teacherName}</Text>
        </Box>
      ))}
    </VStack>
  );
};

export default StudentAttendance;
