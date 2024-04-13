import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, useToast } from '@chakra-ui/react';
import { useUser } from '../hook/useUser';
import AvatarUpload from './AvatarUpload';

const EditProfile: React.FC = () => {
	const { getUserInfo, updateUserInfo } = useUser();
	const userInfo = getUserInfo()
	const [userData, setUserData] = useState({
		email: userInfo.email,
		phone: userInfo.phone,
		avatar: userInfo.avatar,
		password: '',
	});
	const toast = useToast();
	
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setUserData({ ...userData, [name]: value });
	};
	
	const handleAvatarChange = (base64: string) => {
		setUserData({ ...userData, avatar: base64 });
	};
	
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		// TODO: Call API to update user info
		console.log('Updated User Data:', userData);
		updateUserInfo(userData);
		toast({
			title: "Profile Updated",
			description: "Your profile has been successfully updated.",
			status: "success",
			duration: 5000,
			isClosable: true,
		});
	};
	
	return (
		<Box p={4} maxWidth="500px" mx="auto">
			<form onSubmit={handleSubmit}>
				<FormControl isRequired>
					<FormLabel>邮箱</FormLabel>
					<Input name="email" type="email" value={userData.email} onChange={handleInputChange} />
				</FormControl>
				<FormControl isRequired>
					<FormLabel>电话</FormLabel>
					<Input name="phone" type="tel" value={userData.phone} onChange={handleInputChange} />
				</FormControl>
				<FormControl>
					<FormLabel>密码</FormLabel>
					<Input name="password" type="password" value={userData.password} onChange={handleInputChange} />
				</FormControl>
				<FormControl>
					<FormLabel>头像</FormLabel>
					<AvatarUpload onFileSelected={handleAvatarChange} />
				</FormControl>
				<Box width="full" display="flex" justifyContent="center">
					<Button mt={4} colorScheme="blue" type="submit">Update Profile</Button>
				</Box>
			</form>
		</Box>
	);
};

export default EditProfile;
