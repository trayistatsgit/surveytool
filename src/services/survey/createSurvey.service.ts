import axiosInstance from '../axios.helper';

export const createSurveyApi = async () => {
	const response = await axiosInstance.post(`survey/create-survey-id`, {});
	return response.data;
};
