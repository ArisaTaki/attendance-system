import React, { useState, useEffect } from "react";
import { Box, Button, Text, VStack, useToast } from "@chakra-ui/react";
import { checkSign, CourseSign, getCheckRecords } from "../api/check";
import { useUser } from "../hook/useUser";
import { haversineDistance } from "../helper/haversine";

const isDuringSignTime = (startTime: string, endTime: string): boolean => {
  const now = new Date().getTime(); // 当前时间的时间戳
  const startDate = new Date(startTime).getTime(); // startTime的时间戳
  const endDate = new Date(endTime).getTime(); // endTime的时间戳

  // 检查当前时间是否处于签到时间范围内
  return now >= startDate && now <= endDate;
};

/**
 * 学生签到组件
 */
const StudentCheckIn: React.FC = () => {
  /**
   * 当前签到任务
   */
  const [currentTask, setCurrentTask] = useState<CourseSign | null>(null);

  /**
   * 是否已签到
   */
  const [isCheckedIn, setIsCheckedIn] = useState(false);

  /**
   * 获取用户信息
   */
  const { getUserInfo } = useUser();
  const user = getUserInfo();

  /**
   * Toast 提示
   */
  const toast = useToast();

  /**
   * 组件加载时获取签到记录
   */
  useEffect(() => {
    getCheckRecords({
      studentId: user?.account,
    }).then((data) => {
      setCurrentTask(
        data.filter((record: CourseSign) => {
          return isDuringSignTime(record.startTime, record.endTime);
        })[0]
      );
    });
  }, [user?.account]);

  /**
   * 处理签到操作
   */
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
      const enTime = new Date(currentTask.endTime).getTime();

      if (distance > 100) {
        toast({
          title: "签到失败",
          description: `不在签到范围内, 距离签到地点${distance.toFixed(2)}米`,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } else if (now > enTime) {
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
        })
          .then(() => {
            toast({
              title: "签到成功",
              status: "success",
              duration: 3000,
              isClosable: true,
            });
            setIsCheckedIn(true);
          })
          .catch(() => {
            toast({
              title: "签到失败",
              description: "服务器出现问题，请稍后重试",
              status: "error",
              duration: 3000,
              isClosable: true,
            });
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
