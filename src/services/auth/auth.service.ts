import axiosInstance from '../axios.helper';
export interface ILogin {
	password: string;
	email: string;
}
export const loginApi = async <T>(querydata: ILogin): Promise<T> => {
	const response = await axiosInstance.post(`auth/login`, { ...querydata });
	return response.data as T;
};
