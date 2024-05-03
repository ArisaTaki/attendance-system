import React, { useState, useEffect } from "react";
import {
  Box,
  Heading,
  List,
  ListItem,
  ListIcon,
  VStack,
} from "@chakra-ui/react";
import { CheckCircleIcon, NotAllowedIcon } from "@chakra-ui/icons";
import { checkGetStudentCheckRecord, StudentCheckRecord } from "../api/check";
/**
 * 签到信息组件
 *
 * 显示已签到和未签到学生的信息列表
 */
const SignInInfo: React.FC<{ checkId: string }> = ({ checkId }) => {
  const [presentStudentList, setPresentStudentList] = useState<
    StudentCheckRecord[]
  >([]);
  const [absentStudentList, setAbsentStudentList] = useState<
    StudentCheckRecord[]
  >([]);

  useEffect(() => {
    const timeout = setInterval(() => {
      checkGetStudentCheckRecord(checkId).then((data) => {
        setPresentStudentList(data.presentStudentList);
        setAbsentStudentList(data.absentStudentList);
      });
    }, 2000);
    return () => {
      clearInterval(timeout);
    };
  }, [checkId]);

  return (
    <VStack spacing={6} align="stretch" p={5}>
      <Box>
        <Heading size="md" mb={2}>
          已签到学生
        </Heading>
        <List spacing={2}>
          {presentStudentList.map((student) => (
            <ListItem key={student.number}>
              <ListIcon as={CheckCircleIcon} color="green.500" />
              {student.name} ({student.number})
            </ListItem>
          ))}
        </List>
      </Box>
      <Box>
        <Heading size="md" mb={2}>
          未签到学生
        </Heading>
        <List spacing={2}>
          {absentStudentList.map((student) => (
            <ListItem key={student.number}>
              <ListIcon as={NotAllowedIcon} color="red.500" />
              {student.name} ({student.number})
            </ListItem>
          ))}
        </List>
      </Box>
    </VStack>
  );
};

export default SignInInfo;
