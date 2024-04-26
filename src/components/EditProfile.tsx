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

const EditProfile: React.FC = () => {
  const { getUserInfo, updateUserInfo } = useUser();
  const userInfo = getUserInfo();
  const [userData, setUserData] = useState<UserData>({
    email: userInfo.email,
    phone: userInfo.phone,
    number: userInfo.account,
  });
  const toast = useToast();

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateUser(userData);
      updateUserInfo(userData);
      toast({
        title: "更新成功",
        description: "Your profile has been successfully updated.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error: any) {
      toast({
        title: "更新失败",
        description: error.message || "Failed to update profile.",
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
            Update Profile
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default EditProfile;
