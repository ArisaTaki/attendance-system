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
  Select,
  Input,
} from "@chakra-ui/react";
import { getCourses } from "../api/course";
import { SelectionProps } from "../pages/register";
import { CheckListProps, CourseSign, getCheckList } from "../api/check";

/**
 * 教师课程考勤组件
 */
const TeacherCourseAttendance: React.FC = () => {
  /**
   * 搜索参数状态
   */
  const [searchParams, setSearchParams] = useState<CheckListProps>({
    courseId: undefined,
    teacherId: undefined,
    teacherName: undefined,
  });

  /**
   * 课程签到详情状态
   */
  const [details, setDetails] = useState<CourseSign[]>([]);

  /**
   * 课程选择列表状态
   */
  const [courses, setCourses] = useState<SelectionProps[]>([]);

  useEffect(() => {
    // 在这里添加获取课程列表和教师列表的逻辑
    getCourses().then((data) => {
      setCourses(data.map((course) => ({ id: course.id, name: course.name })));
    });

    getCheckList().then((data) => {
      setDetails(data.list);
    });
  }, []);

  /**
   * 处理搜索操作
   */
  const handleSearch = () => {
    console.log("Searching:", searchParams);
    getCheckList(searchParams).then((data) => {
      setDetails(data.list);
    });
  };

  /**
   * 处理输入框和下拉框的变化
   * @param e 事件对象
   */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setSearchParams((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Box p={4}>
      <FormControl mb={4}>
        <FormLabel>课程</FormLabel>
        <Select
          mb={4}
          placeholder="选择课程"
          value={searchParams.courseId}
          name="courseId"
          onChange={handleChange}
        >
          {courses?.map((course) => (
            <option key={course.id} value={course.id}>
              {course.name}
            </option>
          ))}
        </Select>
        <FormLabel>工号</FormLabel>
        <Input
          mb={4}
          placeholder="输入教师工号"
          value={searchParams.teacherId}
          name="teacherId"
          onChange={handleChange}
        />
        <FormLabel>姓名</FormLabel>
        <Input
          placeholder="输入教师姓名"
          value={searchParams.teacherName}
          name="teacherName"
          onChange={handleChange}
        />
      </FormControl>
      <Button onClick={handleSearch} colorScheme="blue">
        搜索
      </Button>
      <TableContainer mt={4}>
        <Table variant="simple">
          <Thead>
            <Tr backgroundColor="#e5e5e5">
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
            {details.map((detail, index) => (
              <Tr
                key={detail.teacherId}
                backgroundColor={index % 2 === 1 ? "#f0f0f0" : "white"}
              >
                <Td>{detail.teacherId}</Td>
                <Td>{detail.courseId}</Td>
                <Td>{detail.courseName}</Td>
                <Td>{detail.startTime}</Td>
                <Td>{detail.endTime}</Td>
                <Td>{detail.absentCount}</Td>
                <Td>{detail.studentIds.split(",").length}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TeacherCourseAttendance;
