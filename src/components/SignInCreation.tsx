import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Tag,
  VStack,
  Wrap,
  WrapItem,
  useToast,
} from "@chakra-ui/react";
import SignInInfo from "./SignInInfo.tsx";
import { SelectionProps } from "../pages/register.tsx";
import { getCourses } from "../api/course.ts";
import { getStudentList } from "../api/user.ts";

// 签到任务的类型定义
interface SignInTask {
  startTime: string;
  endTime: string;
  location: string;
  teacherName: string;
  courseId?: number;
  studentIds?: string;
}

const SignInCreation: React.FC = () => {
  const [signInTask, setSignInTask] = useState<SignInTask>({
    startTime: "",
    endTime: "",
    location: "",
    teacherName: "",
    courseId: undefined,
    studentIds: "",
  });
  const [showSignInfo, setShowSignInfo] = useState(false);
  const [courses, setCourses] = useState<SelectionProps[]>([]);
  const [students, setStudents] = useState<SelectionProps[]>([]);
  const toast = useToast();

  useEffect(() => {
    // 在这里添加获取课程列表的逻辑
    getCourses().then((data) => {
      setCourses(data.map((course) => ({ id: course.id, name: course.name })));
    });
    getStudentList().then((data) => {
      setStudents(
        data.list.map((student) => ({
          id: Number(student.number),
          name: student.name,
        }))
      );
    });
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name === "studentIds" && e.target instanceof HTMLSelectElement) {
      // Handle multiple select for students
      const selectedOptions = Array.from(
        e.target.selectedOptions,
        (option) => option.value
      );

      // 确保新选择的学生 ID 添加到现有 IDs 后面，而不是替换它们
      setSignInTask((prev) => {
        const existingIds = prev.studentIds ? prev.studentIds.split(",") : [];
        const newIds = [...new Set([...existingIds, ...selectedOptions])]; // 使用 Set 来避免重复的 ID
        return {
          ...prev,
          studentIds: newIds.join(","),
        };
      });
    } else {
      setSignInTask((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Replace with actual API call to create a sign-in task
    console.log("Creating sign-in task:", signInTask);
    toast({
      title: "签到任务已发布",
      description: "签到任务成功创建并且现在处于活跃状态。",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
    setShowSignInfo(true);
  };

  return (
    <Box p={4}>
      <VStack as="form" onSubmit={handleSubmit} spacing={4}>
        <FormControl isRequired>
          <FormLabel>课程</FormLabel>
          <Select
            placeholder="选择课程"
            value={signInTask.courseId}
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
        <FormControl isRequired>
          <FormLabel>学生</FormLabel>
          <Select
            sx={{
              minHeight: "200px",
              overflowY: "auto",
              padding: "4px",
              "& option": {
                padding: "4px",
              },
            }}
            multiple
            placeholder="选择学生"
            value={signInTask.studentIds?.split(",")} // Splitting string into array for the value to match
            name="studentIds"
            onChange={handleChange}
          >
            {students?.map((student) => (
              <option key={student.id} value={student.id}>
                {student.name}
              </option>
            ))}
          </Select>
        </FormControl>
        <Wrap>
          {signInTask.studentIds?.split(",").map((id) => (
            <WrapItem key={id}>
              <Tag size="lg" borderRadius="full">
                {students.find((student) => student.id === Number(id))?.name}
              </Tag>
            </WrapItem>
          ))}
        </Wrap>
        <FormControl isRequired>
          <FormLabel htmlFor="teacherName">教师姓名</FormLabel>
          <Input
            id="teacherName"
            name="teacherName"
            value={signInTask.teacherName}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor="location">地点</FormLabel>
          <Input
            id="location"
            name="location"
            value={signInTask.location}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor="startTime">开始时间</FormLabel>
          <Input
            id="startTime"
            name="startTime"
            type="datetime-local"
            value={signInTask.startTime}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor="endTime">结束时间</FormLabel>
          <Input
            id="endTime"
            name="endTime"
            type="datetime-local"
            value={signInTask.endTime}
            onChange={handleChange}
          />
        </FormControl>
        <Button colorScheme="blue" type="submit">
          发布签到
        </Button>
      </VStack>
      {showSignInfo && <SignInInfo />}
    </Box>
  );
};

export default SignInCreation;
