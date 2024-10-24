import axiosInstance from '../axios.helper';
export interface ILoginPage {
  email: string;
  password: string;
}

export const loginPageApi = async <T>(details: ILoginPage): Promise<T> => {
  const response = await axiosInstance.get(`auth/login-page`, {
    params: { details },
  });
  return response.data as T;
};
