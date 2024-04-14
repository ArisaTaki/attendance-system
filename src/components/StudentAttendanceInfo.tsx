import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Heading,
} from "@chakra-ui/react";

interface StudentAttendanceDetail {
  studentId: string;
  absenceCount: number;
  leaveCount: number;
  startDate: string;
  endDate: string;
}

const StudentAttendanceInfo: React.FC = () => {
  const [searchParams, setSearchParams] = useState({
    studentId: "",
    startDate: "",
    endDate: "",
  });

  // Mock data for demonstration
  const [details, setDetails] = useState<StudentAttendanceDetail[]>([
    {
      studentId: "S10001",
      absenceCount: 3,
      leaveCount: 2,
      startDate: "2024-01-01",
      endDate: "2024-01-31",
    },
    {
      studentId: "S10002",
      absenceCount: 1,
      leaveCount: 1,
      startDate: "2024-01-01",
      endDate: "2024-01-31",
    },
  ]);

  const handleSearch = () => {
    console.log("Searching:", searchParams);
    // TODO: Implement API call for actual data
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSearchParams((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Box p={4}>
      <Heading size="lg" mb={4}>
        学生考勤详细信息
      </Heading>
      <FormControl mb={4}>
        <FormLabel>学生学号</FormLabel>
        <Input
          name="studentId"
          value={searchParams.studentId}
          onChange={handleChange}
        />
      </FormControl>
      <Button onClick={handleSearch} colorScheme="blue">
        搜索
      </Button>
      <TableContainer mt={4}>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>学生学号</Th>
              <Th>缺勤次数</Th>
              <Th>请假次数</Th>
            </Tr>
          </Thead>
          <Tbody>
            {details.map((detail) => (
              <Tr key={detail.studentId}>
                <Td>{detail.studentId}</Td>
                <Td>{detail.absenceCount}</Td>
                <Td>{detail.leaveCount}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default StudentAttendanceInfo;
