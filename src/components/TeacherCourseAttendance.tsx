import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Heading,
  Select,
} from "@chakra-ui/react";
import { getCourses } from "../api/course";
import { SelectionProps } from "../pages/register";

interface CourseAttendanceDetail {
  teacherId: string;
  courseId: string;
  courseName: string;
  startDate: string;
  endDate: string;
  absentCount: number;
  totalNumber: number;
}

const TeacherCourseAttendance: React.FC = () => {
  const [searchParams, setSearchParams] = useState({
    teacherId: "",
  });

  // Mock data for demonstration
  const [details, setDetails] = useState<CourseAttendanceDetail[]>([
    {
      teacherId: "T20001",
      courseId: "C1001",
      courseName: "高等数学",
      startDate: "2024-02-15",
      endDate: "2024-02-15",
      absentCount: 2,
      totalNumber: 50,
    },
    {
      teacherId: "T20002",
      courseId: "C1002",
      courseName: "线性代数",
      startDate: "2024-02-15",
      endDate: "2024-02-15",
      absentCount: 3,
      totalNumber: 50,
    },
  ]);

  const [courses, setCourses] = useState<SelectionProps[]>([]);

  useEffect(() => {
    // 在这里添加获取课程列表和教师列表的逻辑
    getCourses().then((data) => {
      setCourses(data.map((course) => ({ id: course.id, name: course.name })));
    });
  }, []);

  const handleSearch = () => {
    console.log("Searching:", searchParams);
    // TODO: Implement API call for actual data
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setSearchParams((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Box p={4}>
      <Heading size="lg" mb={4}>
        教师课程考勤详细信息
      </Heading>
      <FormControl isRequired mb={4}>
        <FormLabel>课程</FormLabel>
        <Select
          placeholder="选择课程"
          value={searchParams.teacherId}
          name="teacherId"
          onChange={handleChange}
        >
          {courses?.map((course) => (
            <option key={course.id} value={course.id}>
              {course.name}
            </option>
          ))}
        </Select>
      </FormControl>
      <Button onClick={handleSearch} colorScheme="blue">
        搜索
      </Button>
      <TableContainer mt={4}>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>教师工号</Th>
              <Th>课程编号</Th>
              <Th>课程名称</Th>
              <Th>开始时间</Th>
              <Th>结束时间</Th>
              <Th>缺勤人数</Th>
              <Th>总人数</Th>
            </Tr>
          </Thead>
          <Tbody>
            {details.map((detail) => (
              <Tr key={detail.teacherId}>
                <Td>{detail.teacherId}</Td>
                <Td>{detail.courseId}</Td>
                <Td>{detail.courseName}</Td>
                <Td>{detail.startDate}</Td>
                <Td>{detail.endDate}</Td>
                <Td>{detail.absentCount}</Td>
                <Td>{detail.totalNumber}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TeacherCourseAttendance;
