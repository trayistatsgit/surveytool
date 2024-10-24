import axiosInstance from '../axios.helper';
interface SignupResponse {
	data: any;
	message: string; // Adjust based on your API response structure
	user?: {
		email: string;
		password: string | number;
	};
}
export const postSignupApi = async (data: { email: string; password: string }): Promise<SignupResponse> => {
	const response = await axiosInstance.post('/auth/authRegister', data);
	return response.data;
};
