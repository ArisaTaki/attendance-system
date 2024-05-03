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
  Tooltip,
  Icon,
  Spinner,
} from "@chakra-ui/react";
import { useUser } from "../hook/useUser";
import { changeStatus, getLeaveList, LeaveApplication } from "../api/leave";
import { InfoOutlineIcon } from "@chakra-ui/icons";
import { getCourses } from "../api/course";

interface SelectionProps {
  id: string;
  name: string;
}

const leaveRequestStatus = ["未审批", "已批准", "已拒绝"];

/**
 * 教师请假管理组件
 */
const TeacherLeaveManagement: React.FC = () => {
  // 状态管理
  const [leaveRequests, setLeaveRequests] = useState<LeaveApplication[]>([]);
  const [studentId, setStudentId] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [refuseReason, setRefuseReason] = useState("");
  const [currentRequest, setCurrentRequest] = useState<LeaveApplication | null>(
    null
  );
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [courses, setCourses] = useState<SelectionProps[]>([]);
  const { getUserInfo } = useUser();

  // 获取用户信息
  const user = getUserInfo();

  // 在组件挂载时获取请假列表
  useEffect(() => {
    getLeaveList({ teacherId: user.account }).then((data) => {
      setLeaveRequests(data.list);
    });
    getCourses().then((data) => {
      setCourses(
        data.map((course) => ({ id: String(course.id), name: course.name }))
      );
    });
  }, [user.account]);

  // 处理搜索操作
  const handleSearch = () => {
    getLeaveList({
      teacherId: user.account,
      studentId,
      courseId: selectedCourseId,
    }).then((data) => {
      setLeaveRequests(data.list);
    });
  };

  const handleCourseChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCourseId(e.target.value);
  };

  // 更新请假请求的状态
  const updateLeaveRequestStatus = (id: string, newStatus: "1" | "2") => {
    const request = leaveRequests.find((req) => req.idString === id);
    if (newStatus === "1") {
      changeStatus({ id, status: "1" }).then(() => {
        setLeaveRequests((prev) =>
          prev.map((req) =>
            req.idString === id ? { ...req, status: "1" } : req
          )
        );
      });
    } else {
      setCurrentRequest(request || null);
      onOpen();
    }
  };

  // 提交拒绝理由
  const submitRefusal = () => {
    if (currentRequest) {
      changeStatus({
        id: currentRequest.idString,
        status: "2",
        remark: refuseReason,
      }).then(() => {
        setLeaveRequests((prev) =>
          prev.map((req) =>
            req.idString === currentRequest.idString
              ? { ...req, status: "2", remark: refuseReason }
              : req
          )
        );
      });
    }
    onClose(); // 关闭模态窗口
  };

  return (
    <Box p={4}>
      {/* 搜索学生学号 */}
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
      {/* 搜索课程名称 */}
      <FormControl isRequired mb={4}>
        <FormLabel>课程</FormLabel>
        <Select
          placeholder="选择课程"
          value={selectedCourseId}
          onChange={handleCourseChange}
        >
          {courses.map((course) => (
            <option key={course.id} value={course.id}>
              {course.name}
            </option>
          ))}
        </Select>
      </FormControl>
      {/* 搜索按钮 */}
      <Button onClick={handleSearch} colorScheme="blue">
        搜索
      </Button>
      <Box p={4} overflowX="auto">
        {/* 请假列表 */}
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
            </Tr>
          </Thead>
          <Tbody>
            {leaveRequests.length ? (
              leaveRequests.map((request) => (
                <Tr key={request.id}>
                  <Td>{request.courseName}</Td>
                  <Td>{request.studentName}</Td>
                  <Td>{request.studentId}</Td>
                  <Td>{request.day}</Td>
                  <Td>{request.reason}</Td>
                  <Td>
                    <Box
                      display={"flex"}
                      justifyContent={"center"}
                      alignItems={"center"}
                    >
                      <Box mr={4}>
                        {leaveRequestStatus[Number(request.status)]}
                      </Box>
                      {request.status === "2" && (
                        <Tooltip
                          label={request.remark || "无"}
                          fontSize="md"
                          hasArrow
                          placement="right"
                        >
                          <span>
                            <Icon as={InfoOutlineIcon} w={6} h={6} />
                          </span>
                        </Tooltip>
                      )}
                    </Box>
                  </Td>
                  <Td>
                    {request.status === "0" ? (
                      <Select
                        value={request.status}
                        placeholder="选择操作"
                        defaultValue="0"
                        onChange={(e) =>
                          updateLeaveRequestStatus(
                            request.idString,
                            e.target.value as "1" | "2"
                          )
                        }
                      >
                        <option value="1">批准</option>
                        <option value="2">拒绝</option>
                      </Select>
                    ) : (
                      <div>已处理，无需操作</div>
                    )}
                  </Td>
                </Tr>
              ))
            ) : (
              <Tr>
                <Td colSpan={6} textAlign="center">
                  <Spinner />
                </Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </Box>
      {/* 拒绝理由模态窗口 */}
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
