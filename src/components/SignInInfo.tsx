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

interface StudentSignInInfo {
  studentId: string;
  studentName: string;
  hasSignedIn: boolean;
}

/**
 * 签到信息组件，暂时弃用
 *
 * 显示已签到和未签到学生的信息列表
 */
const SignInInfo: React.FC = () => {
  const [studentsSignInInfo, setStudentsSignInInfo] = useState<
    StudentSignInInfo[]
  >([]);

  useEffect(() => {
    // TODO: 替换为实际的 API 调用以获取签到信息
    const mockSignInInfo: StudentSignInInfo[] = [
      { studentId: "S10001", studentName: "张三", hasSignedIn: true },
      { studentId: "S10002", studentName: "李四", hasSignedIn: false },
      // 更多模拟数据...
    ];
    setStudentsSignInInfo(mockSignInInfo);
  }, []);

  const signedInStudents = studentsSignInInfo.filter(
    (student) => student.hasSignedIn
  );
  const notSignedInStudents = studentsSignInInfo.filter(
    (student) => !student.hasSignedIn
  );

  return (
    <VStack spacing={6} align="stretch" p={5}>
      <Box>
        <Heading size="md" mb={2}>
          已签到学生
        </Heading>
        <List spacing={2}>
          {signedInStudents.map((student) => (
            <ListItem key={student.studentId}>
              <ListIcon as={CheckCircleIcon} color="green.500" />
              {student.studentName} ({student.studentId})
            </ListItem>
          ))}
        </List>
      </Box>
      <Box>
        <Heading size="md" mb={2}>
          未签到学生
        </Heading>
        <List spacing={2}>
          {notSignedInStudents.map((student) => (
            <ListItem key={student.studentId}>
              <ListIcon as={NotAllowedIcon} color="red.500" />
              {student.studentName} ({student.studentId})
            </ListItem>
          ))}
        </List>
      </Box>
    </VStack>
  );
};

export default SignInInfo;
