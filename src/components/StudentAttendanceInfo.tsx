import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Input,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import { checkMsgInfoList, StudentAttendance } from "../api/checkMsg";

const StudentAttendanceInfo: React.FC = () => {
  const [searchParams, setSearchParams] = useState("");

  const [details, setDetails] = useState<StudentAttendance[]>([]);

  useEffect(() => {
    checkMsgInfoList().then((data) => {
      setDetails(data);
    });
  }, []);

  const handleSearch = () => {
    checkMsgInfoList(Number(searchParams)).then((data) => {
      setDetails(data);
    });
  };

  return (
    <Box p={4}>
      <Input
        mb={4}
        placeholder="请输入学号"
        value={searchParams}
        onChange={(e) => setSearchParams(e.target.value)}
      />
      <Button onClick={handleSearch} colorScheme="blue">
        搜索
      </Button>
      <TableContainer mt={4}>
        <Table variant="simple">
          <Thead>
            <Tr backgroundColor="#e5e5e5">
              <Th>学生学号</Th>
              <Th>学生名</Th>
              <Th>缺勤次数</Th>
              <Th>考勤次数</Th>
              <Th>请假次数</Th>
            </Tr>
          </Thead>
          <Tbody>
            {details.map((detail, index) => (
              <Tr
                key={detail.studentId}
                backgroundColor={index % 2 === 1 ? "#f0f0f0" : "white"}
              >
                <Td>{detail.studentId}</Td>
                <Td>{detail.name}</Td>
                <Td>{detail.present}</Td>
                <Td>{detail.absent}</Td>
                <Td>{detail.leave}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default StudentAttendanceInfo;
