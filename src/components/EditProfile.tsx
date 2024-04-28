import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import { useUser } from "../hook/useUser";
import AvatarUpload from "./AvatarUpload";
import { updateUser } from "../api/user";

interface UserData {
  email: string;
  phone: string;
  number: string;
  password?: string;
}

/**
 * 编辑个人资料组件
 * @component
 */
const EditProfile: React.FC = () => {
  /**
   * 获取用户信息和更新用户信息的钩子函数
   */
  const { getUserInfo, updateUserInfo } = useUser();

  /**
   * 用户信息
   */
  const userInfo = getUserInfo();

  /**
   * 用户数据状态和更新函数
   */
  const [userData, setUserData] = useState<UserData>({
    email: userInfo.email,
    phone: userInfo.phone,
    number: userInfo.account,
  });

  /**
   * Toast 提示
   */
  const toast = useToast();

  /**
   * 处理输入框变化的事件处理函数
   * @param e - 输入框变化事件对象
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "password" && value === "") {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...updatedUserData } = userData;
      setUserData(updatedUserData);
    } else {
      setUserData({ ...userData, [name]: value });
    }
  };

  /**
   * 提交表单的事件处理函数
   * @param e - 表单提交事件对象
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateUser(userData);
      updateUserInfo(userData);
      toast({
        title: "更新成功",
        description: "您的个人资料已成功更新。",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error: any) {
      toast({
        title: "更新失败",
        description: error.message || "个人资料更新失败。",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }
  };

  return (
    <Box p={4} maxWidth="500px" mx="auto">
      <form onSubmit={handleSubmit}>
        <FormControl isRequired>
          <FormLabel>邮箱</FormLabel>
          <Input
            name="email"
            type="email"
            value={userData.email}
            onChange={handleInputChange}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>电话</FormLabel>
          <Input
            name="phone"
            type="tel"
            value={userData.phone}
            onChange={handleInputChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel>密码</FormLabel>
          <Input
            name="password"
            type="password"
            value={userData.password}
            onChange={handleInputChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel>头像</FormLabel>
          <AvatarUpload
            onFileSelected={() => {}}
            initPreview={userInfo.avatar}
            userId={userInfo.account}
          />
        </FormControl>
        <Box width="full" display="flex" justifyContent="center">
          <Button mt={4} colorScheme="blue" type="submit">
            更新个人资料
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default EditProfile;
