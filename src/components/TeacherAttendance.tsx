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

const TeacherAttendance: React.FC = () => {
  const [attendanceRecords, setAttendanceRecords] = useState<CourseSign[]>([]);
  const [courses, setCourses] = useState<SelectionProps[]>([]);
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const { getUserInfo } = useUser();

  const user = getUserInfo();

  console.log(user.account);

  useEffect(() => {
    getCheckList().then((data) => {
      setAttendanceRecords(data.list);
    });

    getCourses().then((data) => {
      setCourses(
        data.map((course) => ({ id: String(course.id), name: course.name }))
      );
    });
  }, []);

  const handleSearch = () => {
    getCheckList({
      courseId: Number(selectedCourseId),
      teacherId: user.account,
    }).then((data) => {
      setAttendanceRecords(data.list);
    });
  };

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
