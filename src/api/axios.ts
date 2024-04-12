import axios from 'axios';

const axiosInstance = axios.create({
	baseURL: 'https://jsonplaceholder.typicode.com',
	headers: {
		'Content-Type': 'application/json',
	},
	timeout: 1000,
});

export default axiosInstance;
