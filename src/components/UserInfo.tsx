import React, { useState, useEffect } from "react";
import {
  Box,
  Input,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import { getAllUsersList } from "../api/user";
import useColleageMajor from "../hook/useConstant";

// 用户信息的类型定义
interface UserInfo {
  id: string;
  name: string;
  department: string;
  major?: string;
  role: "学生" | "教师" | "管理员";
}

const UserInfo: React.FC = () => {
  const [users, setUsers] = useState<UserInfo[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { major, colleague } = useColleageMajor();

  useEffect(() => {
    getAllUsersList().then((data) => {
      setUsers(
        data.list.map((item) => {
          return {
            id: item.number,
            name: item.name,
            department:
              colleague.find((col) => col.id === item.colleageId)?.name ?? "",
            major: major.find((maj) => maj.id === item.majorId)?.name,
            role:
              item.roleId === 1
                ? "管理员"
                : item.roleId === 2
                ? "教师"
                : "学生",
          };
        })
      );
    });
  }, [colleague, major]);

  const handleSearch = () => {
    getAllUsersList(searchTerm).then((data) => {
      setUsers(
        data.list.map((item) => {
          return {
            id: item.number,
            name: item.name,
            department:
              colleague.find((col) => col.id === item.colleageId)?.name ?? "",
            major: major.find((maj) => maj.id === item.majorId)?.name,
            role:
              item.roleId === 1
                ? "管理员"
                : item.roleId === 2
                ? "教师"
                : "学生",
          };
        })
      );
    });
  };

  return (
    <Box p={4}>
      <Input
        placeholder="按学号/工号或姓名搜索"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        mb={4}
      />
      <Button onClick={handleSearch} colorScheme="blue">
        搜索
      </Button>
      <TableContainer mt={4}>
        <Table variant="simple">
          <Thead>
            <Tr backgroundColor="#e5e5e5">
              <Th>学号/工号</Th>
              <Th>姓名</Th>
              <Th>学院</Th>
              <Th>专业</Th>
              <Th>角色</Th>
            </Tr>
          </Thead>
          <Tbody>
            {users.map((user, index) => (
              <Tr
                key={user.id}
                backgroundColor={index % 2 === 1 ? "#f0f0f0" : "white"}
              >
                <Td>{user.id}</Td>
                <Td>{user.name}</Td>
                <Td>{user.department}</Td>
                <Td>{user.major}</Td>
                <Td>{user.role}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default UserInfo;
