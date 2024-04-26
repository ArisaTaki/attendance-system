import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  useToast,
  Heading,
  FormErrorMessage,
  RadioGroup,
  HStack,
  Radio,
  Select,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SaveUserProps, saveUser } from "../api/user.ts";
import { getMajors } from "../api/major.ts";
import { getColleages } from "../api/colleage.ts";
import { checkMsgInfoList } from "../api/checkMsg.ts";

export enum Role {
  Student = 3,
  Teacher = 2,
  Admin = 1,
}

export interface SelectionProps {
  id: number;
  name: string;
}
const Register = () => {
  const [userDetails, setUserDetails] = useState<SaveUserProps>({
    number: "",
    password: "",
    name: "",
    colleageId: undefined,
    majorId: undefined,
    phone: "",
    email: "",
    roleId: Role.Student,
  });
  const toast = useToast();
  const navigate = useNavigate();

  const [error, setError] = useState({ phone: "", password: "" });
  const [colleages, setColleageId] = useState<SelectionProps[]>();
  const [majors, setMajors] = useState<SelectionProps[]>();

  useEffect(() => {
    getMajors().then((data) => {
      setMajors(data.map((major) => ({ id: major.id, name: major.name })));
    });
    getColleages().then((data) => {
      setColleageId(
        data.map((colleage) => ({ id: colleage.id, name: colleage.name }))
      );
    });
  }, []);

  useEffect(() => {
    checkMsgInfoList().then((data) => {
      console.log(data);
    });
  }, []);

  const phoneRegex = /^1[3-9]\d{9}$/;
  // 修改为至少8位，超过8位也是可以的，包含大小写字母、数字及特殊字符
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;

  const handleValidation = (name: string, value: string) => {
    if (name === "phone" && !phoneRegex.test(value)) {
      setError((prev) => ({ ...prev, phone: "无效的手机号码" }));
    } else if (name === "phone") {
      setError((prev) => ({ ...prev, phone: "" }));
    }

    if (name === "password" && !passwordRegex.test(value)) {
      setError((prev) => ({
        ...prev,
        password: "密码必须包含大小写字母、数字及特殊字符，且长度至少8位",
      }));
    } else if (name === "password") {
      setError((prev) => ({ ...prev, password: "" }));
    }
  };

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | Role
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    if (typeof e === "number") {
      setUserDetails((prev) => ({
        ...prev,
        roleId: e,
      }));
    } else {
      const { name, value } = e.target;
      setUserDetails((prev) => ({
        ...prev,
        [name]: value,
      }));
      handleValidation(name, value);
    }
  };

  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault();
    // 注册逻辑，调用API
    try {
      await saveUser(userDetails);
      toast({
        title: "注册成功",
        description: "您已成功注册，欢迎加入！",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      navigate("/login");
    } catch (error: any) {
      toast({
        title: "注册失败",
        description: error.message || "注册失败",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      minH="100vh"
      minW="100vw"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box width="100%" p={8} boxShadow="md">
        <Heading as="h2" size="lg" textAlign="center" mb={6}>
          注册
        </Heading>
        <form onSubmit={handleRegister}>
          <VStack spacing={4}>
            <FormControl>
              <FormLabel>学生还是老师？</FormLabel>
              <RadioGroup
                defaultValue={String(Role.Student)}
                name="roleId"
                onChange={(value) => handleChange(Number(value) as Role)}
              >
                <HStack spacing={8}>
                  <Radio value={String(Role.Student)}>学生</Radio>
                  <Radio value={String(Role.Teacher)}>老师</Radio>
                </HStack>
              </RadioGroup>
            </FormControl>
            <FormControl isRequired>
              <FormLabel>
                {userDetails.roleId === Role.Student ? "学号" : "工号"}
              </FormLabel>
              <Input
                type="text"
                name="number"
                value={userDetails.number}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl isRequired isInvalid={!!error.password}>
              <FormLabel>密码</FormLabel>
              <Input
                type="password"
                name="password"
                value={userDetails.password}
                onChange={handleChange}
              />
              {error.password && (
                <FormErrorMessage>{error.password}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl isRequired>
              <FormLabel>姓名</FormLabel>
              <Input
                type="text"
                name="name"
                value={userDetails.name}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>学院</FormLabel>
              <Select
                placeholder="选择你的学院"
                value={userDetails.colleageId}
                name="colleageId"
                onChange={handleChange}
              >
                {colleages?.map((colleage) => (
                  <option key={colleage.id} value={colleage.id}>
                    {colleage.name}
                  </option>
                ))}
              </Select>
            </FormControl>
            {userDetails.roleId === Role.Student && (
              <FormControl isRequired>
                <FormLabel>专业</FormLabel>
                <Select
                  placeholder="选择你的专业"
                  value={userDetails.majorId}
                  name="majorId"
                  onChange={handleChange}
                >
                  {majors?.map((major) => (
                    <option key={major.id} value={major.id}>
                      {major.name}
                    </option>
                  ))}
                </Select>
              </FormControl>
            )}
            <FormControl isRequired isInvalid={!!error.phone}>
              <FormLabel>手机号码</FormLabel>
              <Input
                type="phone"
                name="phone"
                value={userDetails.phone}
                onChange={handleChange}
              />
              {error.phone && (
                <FormErrorMessage>{error.phone}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl isRequired>
              <FormLabel>邮箱</FormLabel>
              <Input
                type="email"
                name="email"
                value={userDetails.email}
                onChange={handleChange}
              />
            </FormControl>
            <Button
              colorScheme="blue"
              w="full"
              mt={4}
              type="submit"
              isDisabled={!!error.phone || !!error.password}
            >
              注册
            </Button>
            <Button
              colorScheme="gray"
              w="full"
              textColor="black"
              onClick={() => {
                navigate("/login");
              }}
            >
              去登录
            </Button>
          </VStack>
        </form>
      </Box>
    </Box>
  );
};

export default Register;
