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

/**
 * 学生考勤信息组件
 */
const StudentAttendanceInfo: React.FC = () => {
  /**
   * 搜索参数
   */
  const [searchParams, setSearchParams] = useState("");

  /**
   * 学生考勤详情
   */
  const [details, setDetails] = useState<StudentAttendance[]>([]);

  useEffect(() => {
    /**
     * 获取学生考勤信息列表
     */
    checkMsgInfoList().then((data) => {
      setDetails(data);
    });
  }, []);

  /**
   * 处理搜索操作
   */
  const handleSearch = () => {
    checkMsgInfoList(searchParams).then((data) => {
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
              <Th>考勤次数</Th>
              <Th>请假次数</Th>
              <Th>缺勤次数</Th>
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
                <Td>{detail.leave}</Td>
                <Td>{detail.absent}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default StudentAttendanceInfo;
