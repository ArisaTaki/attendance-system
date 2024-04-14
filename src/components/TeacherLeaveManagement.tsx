import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Textarea,
  useDisclosure,
  ModalCloseButton,
} from "@chakra-ui/react";

interface LeaveRequest {
  id: number;
  courseName: string;
  studentName: string;
  studentNumber: string;
  leaveDate: string;
  reason: string;
  status: "已批准" | "待审批" | "已拒绝";
  refuseReason?: string;
}

const mockLeaveRequests: LeaveRequest[] = [
  {
    id: 1,
    courseName: "高等数学",
    studentName: "张三",
    studentNumber: "S10001",
    leaveDate: "2024-09-15",
    reason: "家庭原因",
    status: "待审批",
  },
  {
    id: 2,
    courseName: "线性代数",
    studentName: "李四",
    studentNumber: "S10002",
    leaveDate: "2024-09-16",
    reason: "参加学术会议",
    status: "已批准",
  },
  // 更多模拟数据...
];

const TeacherLeaveManagement: React.FC = () => {
  const [leaveRequests, setLeaveRequests] =
    useState<LeaveRequest[]>(mockLeaveRequests);
  const [searchTerm, setSearchTerm] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [refuseReason, setRefuseReason] = useState("");
  const [currentRequest, setCurrentRequest] = useState<LeaveRequest | null>(
    null
  );

  const handleSearch = () => {
    console.log("搜索:", searchTerm);
  };

  const updateLeaveRequestStatus = (
    id: number,
    newStatus: "已批准" | "已拒绝"
  ) => {
    const request = leaveRequests.find((req) => req.id === id);
    if (newStatus === "已批准") {
      setLeaveRequests((prev) =>
        prev.map((req) => (req.id === id ? { ...req, status: newStatus } : req))
      );
    } else {
      setCurrentRequest(request || null);
      onOpen();
    }
  };

  const submitRefusal = () => {
    if (currentRequest) {
      setLeaveRequests((prev) =>
        prev.map((req) =>
          req.id === currentRequest.id
            ? { ...req, status: "已拒绝", refuseReason: refuseReason }
            : req
        )
      );
    }
    onClose(); // 关闭模态窗口
  };

  return (
    <Box p={4}>
      <FormControl>
        <FormLabel htmlFor="search">搜索学生学号或课程名称</FormLabel>
        <Input
          id="search"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          mb={4}
        />
        <Button onClick={handleSearch} colorScheme="blue">
          搜索
        </Button>
      </FormControl>
      <Box p={4} overflowX="auto">
        <Table mt={4} width="100%">
          <Thead>
            <Tr>
              <Th>课程名称</Th>
              <Th>学生姓名</Th>
              <Th>学生学号</Th>
              <Th>请假日期</Th>
              <Th>请假原因</Th>
              <Th>审批状态</Th>
              <Th>操作</Th>
              {leaveRequests.some((item) => !!item.refuseReason) && (
                <Th>拒绝理由</Th>
              )}
            </Tr>
          </Thead>
          <Tbody>
            {leaveRequests.map((request) => (
              <Tr key={request.id}>
                <Td>{request.courseName}</Td>
                <Td>{request.studentName}</Td>
                <Td>{request.studentNumber}</Td>
                <Td>{request.leaveDate}</Td>
                <Td>{request.reason}</Td>
                <Td>{request.status}</Td>
                <Td>
                  {request.status === "待审批" && (
                    <Select
                      onChange={(e) =>
                        updateLeaveRequestStatus(
                          request.id,
                          e.target.value as "已批准" | "已拒绝"
                        )
                      }
                    >
                      <option value="已批准">批准</option>
                      <option value="已拒绝">拒绝</option>
                    </Select>
                  )}
                </Td>
                {request.refuseReason && <Td>{request.refuseReason}</Td>}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>输入拒绝理由</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Textarea
              placeholder="请输入拒绝理由..."
              value={refuseReason}
              onChange={(e) => setRefuseReason(e.target.value)}
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={submitRefusal}>
              确认
            </Button>
            <Button variant="ghost" onClick={onClose}>
              取消
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default TeacherLeaveManagement;
