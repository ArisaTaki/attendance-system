import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  useToast,
  Heading,
  VStack,
  Select,
} from "@chakra-ui/react";
import { getCourses } from "../api/course";
import { getTeacherList } from "../api/user";
import { SelectionProps } from "../pages/register";

interface FormData {
  courseId?: number;
  teachId?: number;
  studentId: string;
  name: string;
  leaveDate: string;
  reason: string;
}

const LeaveRequestForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    courseId: undefined,
    teachId: undefined,
    leaveDate: "",
    reason: "",
    studentId: "",
    name: "",
  });
  const [courses, setCourses] = useState<SelectionProps[]>([]);
  const [teachers, setTeachers] = useState<SelectionProps[]>([]);
  const toast = useToast();

  useEffect(() => {
    // 在这里添加获取课程列表和教师列表的逻辑
    getCourses().then((data) => {
      setCourses(data.map((course) => ({ id: course.id, name: course.name })));
    });
    getTeacherList().then((data) => {
      setTeachers(
        data.list.map((teacher) => ({ id: teacher.id, name: teacher.name }))
      );
    });
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting leave request:", formData);
    // 在这里添加API调用逻辑
    toast({
      title: "Leave Request Submitted",
      description: "Your leave request has been submitted for approval.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <VStack spacing={4} p={5}>
      <Heading>提交请假记录</Heading>
      <form onSubmit={handleSubmit} style={{ width: "100%" }}>
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
            value={formData.teachId}
            name="teachId"
            onChange={handleChange}
          >
            {teachers?.map((teacher) => (
              <option key={teacher.id} value={teacher.id}>
                {teacher.name}
              </option>
            ))}
          </Select>
        </FormControl>
        <FormControl isRequired mt={4}>
          <FormLabel>学号</FormLabel>
          <Input
            name="studentId"
            value={formData.studentId}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl isRequired mt={4}>
          <FormLabel>姓名</FormLabel>
          <Input name="name" value={formData.name} onChange={handleChange} />
        </FormControl>
        <FormControl isRequired mt={4}>
          <FormLabel>请假时间</FormLabel>
          <Input
            type="date"
            name="leaveDate"
            value={formData.leaveDate}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl isRequired mt={4}>
          <FormLabel>请假理由</FormLabel>
          <Textarea
            name="reason"
            value={formData.reason}
            onChange={handleChange}
          />
        </FormControl>
        <Box width="full" display="flex" justifyContent="between">
          <Button mt={4} mx="auto" colorScheme="blue" type="submit">
            Submit
          </Button>
        </Box>
      </form>
    </VStack>
  );
};

export default LeaveRequestForm;
