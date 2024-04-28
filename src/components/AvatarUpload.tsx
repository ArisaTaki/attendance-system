import { Box, Button, Image, Input } from "@chakra-ui/react";
import { ChangeEvent, useState, FC, useEffect } from "react";
import { uploadAvatar } from "../api/user";
import { useUser } from "../hook/useUser";

interface AvatarUploadProps {
  onFileSelected: (base64: string) => void; // 修改为传递 Base64 字符串
  initPreview: string;
  userId: string;
}

/**
 * AvatarUpload组件用于上传用户头像。
 *
 * @component
 * @param {Object} props - 组件属性
 * @param {Function} props.onFileSelected - 当文件被选中时调用的回调函数
 * @param {string} props.initPreview - 初始预览图像的Base64编码字符串
 * @param {string} props.userId - 用户ID
 * @returns {JSX.Element} AvatarUpload组件
 */
const AvatarUpload: FC<AvatarUploadProps> = ({
  onFileSelected,
  initPreview,
  userId,
}) => {
  // 状态钩子
  const [preview, setPreview] = useState<string>("");

  // 用户钩子
  const { updateUserInfo } = useUser();

  // 初始化预览图像
  useEffect(() => {
    if (!initPreview) {
      setPreview("");
    } else {
      if (initPreview.startsWith("data:image/")) {
        setPreview(initPreview);
      } else {
        setPreview(`data:image/png;base64,${initPreview}`);
      }
    }
  }, [initPreview]);

  /**
   * 处理文件变化事件
   *
   * @param {ChangeEvent<HTMLInputElement>} event - 文件变化事件对象
   */
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      uploadAvatar({ file, userId }).then(() => {
        // 创建文件读取器
        const reader = new FileReader();
        // 当文件读取完成时...
        reader.onloadend = () => {
          // 使用图像数据更新预览图像
          const base64String = reader.result as string;
          setPreview(base64String);
          updateUserInfo({ avatar: base64String });
          // 调用onFileSelected函数并传递Base64字符串
          onFileSelected(base64String);
        };
        // 以Data URL（Base64）格式读取文件
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
