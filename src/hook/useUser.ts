import {useAuth} from "../context/AuthContext.tsx";

export const useUser = () => {
	const { isAuthenticated } = useAuth();
	
	const getUserInfo = () => {
		if (!isAuthenticated) {
			return null;
		}
		
		const tokenString = localStorage.getItem('token');
		if (!tokenString) {
			return null;
		}
		
		try {
			const userLoginResponse = JSON.parse(tokenString);
			return userLoginResponse.userInfo;
		} catch (error) {
			console.error('Failed to parse user data:', error);
			return null;
		}
	};
	
	const updateUserInfo = (userInfo: any) => {
		if (!isAuthenticated) {
			return;
		}
		
		const tokenString = localStorage.getItem('token');
		if (!tokenString) {
			return;
		}
		
		try {
			const userLoginResponse = JSON.parse(tokenString);
			userLoginResponse.userInfo = userInfo;
			localStorage.setItem('token', JSON.stringify(userLoginResponse));
		} catch (error) {
			console.error('Failed to parse user data:', error);
		}
	}
	
	return {getUserInfo, updateUserInfo};
};
