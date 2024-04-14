import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
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

interface AttendanceRecord {
  courseId: string;
  courseName: string;
  date: string;
  startTime: string;
  endTime: string;
  totalStudents: number;
  attended: number;
}

interface SelectionProps {
  id: string;
  name: string;
}

const TeacherAttendance: React.FC = () => {
  const [attendanceRecords, setAttendanceRecords] = useState<
    AttendanceRecord[]
  >([]);
  const [courses, setCourses] = useState<SelectionProps[]>([]);
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [studentId, setStudentId] = useState("");

  useEffect(() => {
    // Simulate fetching data
    const mockData: AttendanceRecord[] = [
      {
        courseId: "101",
        courseName: "Mathematics",
        date: "2024-04-01",
        startTime: "10:00",
        endTime: "12:00",
        totalStudents: 30,
        attended: 25,
      },
      {
        courseId: "102",
        courseName: "Physics",
        date: "2024-04-02",
        startTime: "13:00",
        endTime: "15:00",
        totalStudents: 28,
        attended: 28,
      },
      // More records...
    ];
    setAttendanceRecords(mockData);

    getCourses().then((data) => {
      setCourses(
        data.map((course) => ({ id: String(course.id), name: course.name }))
      );
    });
  }, []);

  const handleSearch = () => {
    console.log(
      "Searching for course ID:",
      selectedCourseId,
      "and student ID:",
      studentId
    );
    // Implement search logic here
  };

  const handleCourseChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCourseId(e.target.value);
  };

  const handleStudentIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStudentId(e.target.value);
  };

  return (
    <Box p={5}>
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
      <FormControl isRequired mb={4}>
        <FormLabel>学生学号</FormLabel>
        <Input
          placeholder="输入学生学号"
          value={studentId}
          onChange={handleStudentIdChange}
        />
      </FormControl>
      <Button onClick={handleSearch} mt={2} colorScheme="blue">
        Search
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
            {attendanceRecords.map((record) => (
              <Tr key={record.courseId}>
                <Td>{record.courseName}</Td>
                <Td>{record.date}</Td>
                <Td>{record.startTime}</Td>
                <Td>{record.endTime}</Td>
                <Td>{record.totalStudents}</Td>
                <Td>{record.attended}</Td>
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
