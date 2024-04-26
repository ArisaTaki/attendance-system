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

const LocationComponent: React.FC<LocationComponentProps> = ({
  passLocation,
}) => {
  const [error, setError] = useState<string>("");
  const [isLocationLoading, setIsLocationLoading] = useState<boolean>(false);

  const getLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
    } else {
      setIsLocationLoading(true);
      navigator.geolocation.getCurrentPosition(success, handleError);
    }
  };

  const success = (position: GeolocationPosition) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    setError("");
    fetchAddress(latitude, longitude); // 调用函数获取地址
  };

  const handleError = (error: GeolocationPositionError) => {
    setError("Unable to retrieve your location");
    console.error(error);
  };

  // 新增一个函数来从 OpenStreetMap Nominatim 获取地址
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
      console.error("Failed to fetch address:", error);
      setError("Failed to fetch address");
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
