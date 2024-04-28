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

const sortUsersByRole = (users: UserInfo[]) => {
  const rolePriority = {
    管理员: 1,
    教师: 2,
    学生: 3,
  };

  return users.sort((a, b) => rolePriority[a.role] - rolePriority[b.role]);
};

/**
 * 用户信息组件
 */
const UserInfo: React.FC = () => {
  /**
   * 用户信息状态
   */
  const [users, setUsers] = useState<UserInfo[]>([]);
  /**
   * 搜索关键词状态
   */
  const [searchTerm, setSearchTerm] = useState("");
  /**
   * 同事和专业信息
   */
  const { major, colleague } = useColleageMajor();

  /**
   * 获取所有用户列表并排序
   */
  useEffect(() => {
    getAllUsersList().then((data) => {
      setUsers(
        sortUsersByRole(
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
        )
      );
    });
  }, [colleague, major]);

  /**
   * 处理搜索操作
   */
  const handleSearch = () => {
    getAllUsersList(searchTerm).then((data) => {
      setUsers(
        sortUsersByRole(
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
        )
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
