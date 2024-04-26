import { Box, Button, Image, Input } from "@chakra-ui/react";
import { ChangeEvent, useState, FC, useEffect } from "react";
import { uploadAvatar } from "../api/user";
import { useUser } from "../hook/useUser";

interface AvatarUploadProps {
  onFileSelected: (base64: string) => void; // 修改为传递 Base64 字符串
  initPreview: string;
  userId: string;
}

const AvatarUpload: FC<AvatarUploadProps> = ({
  onFileSelected,
  initPreview,
  userId,
}) => {
  const [preview, setPreview] = useState<string>("");
  const { updateUserInfo } = useUser();

  useEffect(() => {
    if (initPreview.startsWith("data:image/")) {
      setPreview(initPreview);
    } else {
      setPreview(`data:image/png;base64,${initPreview}`);
    }
  }, [initPreview]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      uploadAvatar({ file, userId }).then(() => {
        // Create a file reader
        const reader = new FileReader();
        // When the file has been read...
        reader.onloadend = () => {
          // Update the preview with the image data
          const base64String = reader.result as string;
          setPreview(base64String);
          updateUserInfo({ avatar: base64String });
          // Call onFileSelected with the base64 string
          onFileSelected(base64String);
        };
        // Read the file as a Data URL (Base64)
        reader.readAsDataURL(file);
      });
    }
  };

  return (
    <Box textAlign="center">
      <Box margin="auto" width="fit-content" p={2}>
        {preview ? (
          <Image
            src={preview}
            alt="avatar preview"
            borderRadius="full"
            boxSize="100px"
            objectFit="cover"
          />
        ) : (
          <Box
            width="100px"
            height="100px"
            backgroundColor="gray.200"
            borderRadius="full"
          ></Box>
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
      <Button
        as="label"
        htmlFor="file-upload"
        size="sm"
        mt={2}
        colorScheme="blue"
      >
        上传头像
      </Button>
    </Box>
  );
};

export default AvatarUpload;
