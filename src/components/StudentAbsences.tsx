import React, { useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  VStack,
} from "@chakra-ui/react";
import { checkMsgInfoList } from "../api/checkMsg";

interface AbsenceRecord {
  studentId: string;
  studentName: string;
  absences: number;
}

const StudentAbsences: React.FC = () => {
  const [studentId, setStudentId] = useState("");
  const [absenceRecord, setAbsenceRecord] = useState<AbsenceRecord | null>(
    null
  );

  const handleSearch = async () => {
    checkMsgInfoList(Number(studentId)).then((data) => {
      setAbsenceRecord({
        studentId: studentId,
        studentName: data[0].name,
        absences: data[0].absent,
      });
    });
  };

  return (
    <VStack spacing={4}>
      <FormControl>
        <FormLabel htmlFor="studentId">输入学生学号查询缺勤次数</FormLabel>
        <Input
          id="studentId"
          type="text"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
        />
      </FormControl>
      <Button colorScheme="blue" onClick={handleSearch}>
        查询
      </Button>
      {absenceRecord && (
        <Box>
          <Text fontSize="lg">学号：{absenceRecord.studentId}</Text>
          <Text fontSize="lg">姓名：{absenceRecord.studentName}</Text>
          <Text fontSize="lg">缺勤次数：{absenceRecord.absences}</Text>
        </Box>
      )}
    </VStack>
  );
};

export default StudentAbsences;
