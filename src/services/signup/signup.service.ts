import axiosInstance from '../axios.helper';
export interface SignupResponse {
	success: boolean;
	message: string;
	data: {
		sessionToken: string;
		user: {
			id: string;
			email: string;
		};
	};
}
export const signupApi = async (data: { email: string; password: string }): Promise<SignupResponse> => {
	const response = await axiosInstance.post('/auth/authRegister', data);
	return response.data;
};
// export interface ISignUpData {
// 	id: string;
// 	email: string;
// }
// import axiosInstance from '../axios.helper';
// export interface SignupResponse {
// 	email: string;
// 	password: string;
// }
// export const signUpApi = async <T>(data: ISignUpData): Promise<T> => {
// 	const response = await axiosInstance.post('/auth/authRegister', { ...data });
// 	return response.data as T;
// };
