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
	
	return getUserInfo();
};
