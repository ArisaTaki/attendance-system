import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  VStack,
  useToast,
} from "@chakra-ui/react";
// import SignInInfo from "./SignInInfo.tsx";
import { SelectionProps } from "../pages/register.tsx";
import { getCourses } from "../api/course.ts";
import studentClasses from "../constants/studentClasses.ts";
import { getStudentListByClass } from "../api/user.ts";
import { useUser } from "../hook/useUser.ts";
import { createCheck } from "../api/check.ts";
import LocationComponent from "./LocationComponent.tsx";
import { formatDate } from "../helper/format.ts";

// 签到任务的类型定义
interface SignInTask {
  startTime: string;
  endTime: string;
  signPlace: string;
  palceMsg: string;
  teacherId: string;
  courseId: string;
  studentIds: string;
}

/**
 * 签到创建组件
 */
const SignInCreation: React.FC = () => {
  const { getUserInfo } = useUser();
  const user = getUserInfo();
  const [signInTask, setSignInTask] = useState<SignInTask>({
    startTime: "",
    endTime: "",
    signPlace: "",
    palceMsg: "",
    teacherId: user.account,
    courseId: "",
    studentIds: "",
  });
  // const [showSignInfo, setShowSignInfo] = useState(false);
  const [courses, setCourses] = useState<SelectionProps[]>([]);
  const [studentIdsString, setStudentIdsString] = useState("");
  const toast = useToast();

  /**
   * 获取课程列表
   */
  useEffect(() => {
    getCourses().then((data) => {
      setCourses(data.map((course) => ({ id: course.id, name: course.name })));
    });
  }, []);

  /**
   * 处理输入框和下拉框的变化
   * @param e - 事件对象
   */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name === "studentIds" && e.target instanceof HTMLSelectElement) {
      getStudentListByClass(Number(value)).then((data) => {
        setStudentIdsString(data.map((student) => student.number).join(","));
      });
    }
    if (name === "startTime" || name === "endTime") {
      setSignInTask((prev) => ({
        ...prev,
        [name]: formatDate(new Date(value)),
      }));
      return;
    }
    setSignInTask((prev) => ({ ...prev, [name]: value }));
  };

  /**
   * 提交表单
   * @param e - 事件对象
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    createCheck({ ...signInTask, studentIds: studentIdsString }).then(() => {
      toast({
        title: "签到任务已发布",
        description: "学生可以开始签到了！",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    });
    // setShowSignInfo(true);
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
          <FormLabel>上课班级</FormLabel>
          <Select
            placeholder="选择班级"
            value={signInTask.studentIds}
            name="studentIds"
            onChange={handleChange}
          >
            {studentClasses?.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </Select>
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor="location">地点</FormLabel>
          <Box display={"flex"} justifyContent="center" alignItems={"center"}>
            <Input
              id="location"
              name="location"
              value={signInTask.palceMsg}
              onChange={handleChange}
            />
            <LocationComponent
              passLocation={(e) => {
                setSignInTask({
                  ...signInTask,
                  palceMsg: e.address ?? "",
                  signPlace: `${e.latitude},${e.longitude}`,
                });
              }}
            />
          </Box>
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
      {/* {showSignInfo && <SignInInfo />} */}
    </Box>
  );
};

export default SignInCreation;
