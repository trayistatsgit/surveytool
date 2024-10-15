import axios from '../axios.helper';

export const createSurveyApi = async (bodyData: any) => {
	const response = await axios.post(`survey/create-survey`, { ...bodyData });
	return response.data;
};
