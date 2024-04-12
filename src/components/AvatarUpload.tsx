// src/components/AvatarUpload.tsx
import { Box, Button, Image, Input } from '@chakra-ui/react';
import { ChangeEvent, useState, FC } from 'react';

interface AvatarUploadProps {
	onFileSelected: (file: File) => void; // 为这个函数提供类型定义
}

const AvatarUpload: FC<AvatarUploadProps> = ({ onFileSelected }) => {
	const [preview, setPreview] = useState<string>('');
	
	const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files ? event.target.files[0] : null;
		if (file) {
			setPreview(URL.createObjectURL(file));
			onFileSelected(file);
		}
	};
	
	return (
		<Box textAlign="center">
			<Box margin="auto" width="fit-content" p={2}>
				{preview ? (
					<Image src={preview} alt="avatar preview" borderRadius="full" boxSize="100px" objectFit="cover" />
				) : (
					<Box width="100px" height="100px" backgroundColor="gray.200" borderRadius="full"></Box>
				)}
			</Box>
			<Input
				type="file"
				accept="image/*"
				onChange={handleFileChange}
				p={1.5}
				display="none"
				id="file-upload"
			/>
			<Button as="label" htmlFor="file-upload" size="sm" mt={2} colorScheme="blue">
				上传头像
			</Button>
		</Box>
	);
};

export default AvatarUpload;
