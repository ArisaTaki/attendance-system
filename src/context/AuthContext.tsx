import  { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextType {
	isAuthenticated: boolean;
	login: (token: string) => void;
	logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	// 初始化时检查 localStorage 中是否有 token，并据此设置认证状态
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
		const token = localStorage.getItem('token');
		return !!token;
	});
	
	const login = (token: string) => {
		// 假设获取到的 token 是从登录响应中得来的
		localStorage.setItem('token', token);
		setIsAuthenticated(true);
	};
	
	const logout = () => {
		localStorage.removeItem('token');
		setIsAuthenticated(false);
	};
	
	// 监听 localStorage 变化，更新认证状态
	useEffect(() => {
		const handleStorageChange = () => {
			const token = localStorage.getItem('token');
			setIsAuthenticated(!!token);
		};
		
		window.addEventListener('storage', handleStorageChange);
		
		return () => {
			window.removeEventListener('storage', handleStorageChange);
		};
	}, []);
	
	return (
		<AuthContext.Provider value={{ isAuthenticated, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
};
