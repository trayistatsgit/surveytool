import axios, { AxiosInstance, AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
// Create an Axios instance
const baseURL = 'http://localhost:4002/api/v1/';
const clientTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
const axiosInstance: AxiosInstance = axios.create({
	baseURL: baseURL,
	headers: {
		'Content-Type': 'application/json', // Set default Content-Type to application/json
	},
});
// Add a request interceptor to set additional headers
axiosInstance.interceptors.request.use(
	(config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
		// Retrieve the token from sessionStorage or localStorage
		const token = localStorage.getItem('access');
		config.headers['Authorization'] = `Bearer ${token}`;
		config.headers['partner-id'] = '2';
		config.headers['client-time-zone'] = clientTimeZone;
		return config;
	},
	(error: AxiosError): Promise<AxiosError> => {
		// Do something with request error
		return Promise.reject(error);
	}
);

// Add a response interceptor if needed
axiosInstance.interceptors.response.use(
	(response: AxiosResponse): AxiosResponse => {
		// Any status code within the range of 2xx will cause this function to trigger
		// Do something with the response data
		return response;
	},
	(error: AxiosError): Promise<AxiosError> => {
		if (error.response?.status === 401) {
			localStorage.clear();
			localStorage.removeItem('redux-root');
			sessionStorage.clear();
			window.stop();
			window.location.href = '/';
		}
		return Promise.reject(error);
	}
);
export default axiosInstance;
