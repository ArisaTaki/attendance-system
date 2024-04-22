import React, { useEffect, useState } from "react";
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
import { useUser } from "../hook/useUser";
import { changeStatus, getLeaveList, LeaveApplication } from "../api/leave";

const leaveRequestStatus = ["未审批", "已批准", "已拒绝"];

const TeacherLeaveManagement: React.FC = () => {
  const [leaveRequests, setLeaveRequests] = useState<LeaveApplication[]>([]);
  const [studentId, setStudentId] = useState("");
  const [courseName, setCourseName] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [refuseReason, setRefuseReason] = useState("");
  const [currentRequest, setCurrentRequest] = useState<LeaveApplication | null>(
    null
  );
  const { getUserInfo } = useUser();

  const user = getUserInfo();

  useEffect(() => {
    getLeaveList({ teacherId: user.account }).then((data) => {
      setLeaveRequests(data.list);
    });
  }, [user.account]);

  const handleSearch = () => {
    getLeaveList({ teacherId: user.account, studentId, courseName }).then(
      (data) => {
        setLeaveRequests(data.list);
      }
    );
  };

  const updateLeaveRequestStatus = (id: number, newStatus: "1" | "2") => {
    console.log(id, newStatus);

    const request = leaveRequests.find((req) => req.id === id);
    if (newStatus === "1") {
      changeStatus({ id, status: "1" }).then(() => {
        setLeaveRequests((prev) =>
          prev.map((req) => (req.id === id ? { ...req, status: "1" } : req))
        );
      });
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
            ? { ...req, status: "2", refuseReason: refuseReason }
            : req
        )
      );
    }
    onClose(); // 关闭模态窗口
  };

  return (
    <Box p={4}>
      <FormControl>
        <FormLabel htmlFor="search">搜索学生学号</FormLabel>
        <Input
          id="search"
          type="text"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          mb={4}
        />
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="search">搜索课程名称</FormLabel>
        <Input
          id="search"
          type="text"
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
          mb={4}
        />
      </FormControl>
      <Button onClick={handleSearch} colorScheme="blue">
        搜索
      </Button>
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
              {leaveRequests.some((item) => !!item.remark) && <Th>拒绝理由</Th>}
            </Tr>
          </Thead>
          <Tbody>
            {leaveRequests.map((request) => (
              <Tr key={request.id}>
                <Td>{request.courseName}</Td>
                <Td>{request.studentName}</Td>
                <Td>{request.studentId}</Td>
                <Td>{request.day}</Td>
                <Td>{request.reason}</Td>
                <Td>{leaveRequestStatus[Number(request.status)]}</Td>
                <Td>
                  {request.status === "0" && (
                    <Select
                      onChange={(e) =>
                        updateLeaveRequestStatus(
                          request.id,
                          e.target.value as "1" | "2"
                        )
                      }
                    >
                      <option value="1">批准</option>
                      <option value="2">拒绝</option>
                    </Select>
                  )}
                </Td>
                {request.remark && <Td>{request.remark}</Td>}
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
