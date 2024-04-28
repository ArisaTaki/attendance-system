import React, { useState, useEffect } from "react";
import { Box, Button, Text, VStack, useToast } from "@chakra-ui/react";
import { checkSign, CourseSign, getCheckRecords } from "../api/check";
import { useUser } from "../hook/useUser";
import { haversineDistance } from "../helper/haversine";

const isWithinTenMinutesOf = (inputTime: string): boolean => {
  const now = new Date().getTime(); // 当前时间的时间戳
  const inputDate = new Date(inputTime).getTime(); // inputTime的时间戳
  const diff = inputDate - now; // 计算差值

  // 检查inputDate是否在当前时间之后，并且差值小于10分钟（600000毫秒）
  return diff >= 0 && diff <= 600000;
};

const StudentCheckIn: React.FC = () => {
  const [currentTask, setCurrentTask] = useState<CourseSign | null>(null);
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const { getUserInfo } = useUser();
  const user = getUserInfo();
  const toast = useToast();

  useEffect(() => {
    getCheckRecords({
      studentId: user?.account,
    }).then((data) => {
      setCurrentTask(
        data.filter((record: CourseSign) => {
          return isWithinTenMinutesOf(record.startTime);
        })[0]
      );
    });
  }, [user?.account]);

  const handleCheckIn = () => {
    if (!currentTask) return;

    navigator.geolocation.getCurrentPosition((position) => {
      const [lat, lon] = currentTask.signPlace.split(",").map(Number);
      const distance = haversineDistance(
        position.coords.latitude,
        position.coords.longitude,
        lat,
        lon
      );

      const now = new Date().getTime();
      const startTime = new Date(currentTask.startTime).getTime();

      if (distance > 20) {
        toast({
          title: "签到失败",
          description: "不在签到范围内",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } else if (now > startTime) {
        toast({
          title: "签到失败",
          description: "签到时间已过",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } else {
        checkSign({
          checkId: currentTask.idString,
          studentId: user?.account,
        }).then(() => {
          toast({
            title: "签到成功",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          setIsCheckedIn(true);
        });
      }
    });
  };

  return (
    <Box p={4}>
      {currentTask ? (
        <VStack spacing={3}>
          <Text fontSize="xl">课程名称: {currentTask.courseName}</Text>
          <Text>位置: {currentTask.palceMsg}</Text>
          <Text>开始时间: {currentTask.startTime}</Text>
          <Text>结束时间: {currentTask.endTime}</Text>
          <Button
            colorScheme="blue"
            onClick={handleCheckIn}
            disabled={isCheckedIn}
          >
            {isCheckedIn ? "已签到" : "签到"}
          </Button>
        </VStack>
      ) : (
        <Text fontSize="xl">当前没有签到任务。</Text>
      )}
    </Box>
  );
};

export default StudentCheckIn;
