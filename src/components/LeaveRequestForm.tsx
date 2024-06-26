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
import { saveLeave, saveLeaveProps } from "../api/leave";
import { useUser } from "../hook/useUser";

interface SelectionProps {
  id: string;
  name: string;
}

/**
 * 提交请假表单组件
 */
const LeaveRequestForm: React.FC = () => {
  // 状态管理表单数据
  const [formData, setFormData] = useState<saveLeaveProps>({
    courseId: "",
    teacherId: "",
    studentId: "",
    studentName: "",
    day: "",
    reason: "",
  });

  // 状态管理课程列表
  const [courses, setCourses] = useState<SelectionProps[]>([]);

  // 状态管理教师列表
  const [teachers, setTeachers] = useState<SelectionProps[]>([]);

  const [successSubmit, setSuccessSubmit] = useState(false);

  const [loading, setLoading] = useState(false);

  // 使用 toast hook
  const toast = useToast();
  const { getUserInfo } = useUser();
  const user = getUserInfo();

  useEffect(() => {
    // 在组件挂载时获取课程列表和教师列表的逻辑
    getCourses().then((data) => {
      setCourses(
        data.map((course) => ({ id: String(course.id), name: course.name }))
      );
    });
    getTeacherList().then((data) => {
      setTeachers(
        data.list.map((teacher) => ({
          id: teacher.number,
          name: teacher.name,
        }))
      );
    });
    setFormData({
      ...formData,
      studentName: user.nickName,
      studentId: user.account,
    });
  }, []);

  /**
   * 处理表单输入变化
   * @param e - 输入事件对象
   */
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  /**
   * 提交表单
   * @param e - 表单提交事件对象
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    saveLeave(formData).then(() => {
      setSuccessSubmit(true);
      setLoading(false);
      toast({
        title: "请假已提交",
        description: "你已经提交请假条给老师啦.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
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
        <FormControl isRequired mt={4}>
          <FormLabel>学号</FormLabel>
          <Input disabled name="studentId" value={formData.studentId} />
        </FormControl>
        <FormControl isRequired mt={4}>
          <FormLabel>姓名</FormLabel>
          <Input disabled name="studentName" value={formData.studentName} />
        </FormControl>
        <FormControl isRequired mt={4}>
          <FormLabel>请假时间</FormLabel>
          <Input
            type="datetime-local"
            name="day"
            value={formData.day}
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
          <Button
            isLoading={loading}
            isDisabled={successSubmit}
            mt={4}
            mx="auto"
            colorScheme="blue"
            type="submit"
          >
            {successSubmit ? "已提交" : "提交"}
          </Button>
        </Box>
      </form>
    </VStack>
  );
};

export default LeaveRequestForm;
