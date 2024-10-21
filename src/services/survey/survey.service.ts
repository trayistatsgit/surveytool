import axiosInstance from '../axios.helper';

export const createSurveyIdApi = async <T>(): Promise<T> => {
	const response = await axiosInstance.post(`survey/create-survey-id`, {});
	return response.data as T;
};

export const surveyDetailApi = async <T>(): Promise<T> => {
	const response = await axiosInstance.get(`survey/survey-detail`, {});
	return response.data as T;
};
export interface IUpdateSurvey {
	surveyId: string;
	surveyName: string;
	surveyDescription: string;
}
export const updateSurveyApi = async <T>(bodyData: IUpdateSurvey): Promise<T> => {
	const response = await axiosInstance.patch(`survey/update-survey`, { ...bodyData, surveyId: '29f9d348-3f91-4188-a61d-86b3b58e98c0' });
	return response.data as T;
};
export interface IUpsertSurveyQuestion {
	surveyId: string;
	questionName: string;
	questionId: number | null;
	questionType: number;
}
export const upsertSurveyQuestionApi = async <T>(bodyData: IUpsertSurveyQuestion): Promise<T> => {
	const response = await axiosInstance.post(`survey/upsert-survey-question`, { ...bodyData });
	return response.data as T;
};
