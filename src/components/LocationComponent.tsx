import React, { useState } from "react";
import { Button, Box, Text } from "@chakra-ui/react";

export interface LocationState {
  latitude: number | null;
  longitude: number | null;
  address?: string; // 添加一个用于存储地址信息的状态
}

interface LocationComponentProps {
  passLocation: (location: LocationState) => void;
}

/**
 * 地理位置组件
 * @param passLocation 传递位置信息的回调函数
 */
const LocationComponent: React.FC<LocationComponentProps> = ({
  passLocation,
}) => {
  const [error, setError] = useState<string>("");
  const [isLocationLoading, setIsLocationLoading] = useState<boolean>(false);

  /**
   * 获取当前位置
   */
  const getLocation = () => {
    if (!navigator.geolocation) {
      setError("您的浏览器不支持地理定位");
    } else {
      setIsLocationLoading(true);
      navigator.geolocation.getCurrentPosition(success, handleError);
    }
  };

  /**
   * 获取位置成功的回调函数
   * @param position 地理位置信息
   */
  const success = (position: GeolocationPosition) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    setError("");
    fetchAddress(latitude, longitude); // 调用函数获取地址
  };

  /**
   * 获取位置失败的回调函数
   * @param error 错误信息
   */
  const handleError = (error: GeolocationPositionError) => {
    setError("无法获取您的位置");
    console.error(error);
  };

  /**
   * 从 OpenStreetMap Nominatim 获取地址
   * @param latitude 纬度
   * @param longitude 经度
   */
  const fetchAddress = async (latitude: number, longitude: number) => {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;

    try {
      const response = await fetch(url, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
        }, // 注意: Nominatim 要求标识用户代理
      });
      const data = await response.json();
      if (data.address) {
        setIsLocationLoading(false);
        passLocation({ latitude, longitude, address: data.display_name }); // 传递地址信息
      }
    } catch (error) {
      console.error("获取地址失败:", error);
      setError("获取地址失败");
    }
  };

  return (
    <Box p={4}>
      <Button
        onClick={getLocation}
        colorScheme="blue"
        isLoading={isLocationLoading}
      >
        获取位置
      </Button>
      {error && <Text color="red.500">{error}</Text>}
    </Box>
  );
};

export default LocationComponent;
