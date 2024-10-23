import axiosInstance from '../axios.helper';

export const createSurveyIdApi = async <T>(): Promise<T> => {
	const response = await axiosInstance.post(`survey/create-survey-id`, {});
	return response.data as T;
};
export interface ISurveyDetail {
	currentPage: number;
}

export const surveyDetailApi = async <T>(details: ISurveyDetail): Promise<T> => {
	const { currentPage } = details;
	const response = await axiosInstance.get(`survey/survey-detail`, {
		params: { currentPage },
	});

	return response.data as T;
};
export interface IUpdateSurvey {
	surveyId: string;
	surveyName: string;
	surveyDescription: string;
	logo?: File;
}
export const updateSurveyApi = async <T>(bodyData: IUpdateSurvey): Promise<T> => {
	const formData = new FormData();

	Object.entries(bodyData).forEach(([key, value]) => {
		formData.append(key, value);
	});

	// Send the FormData in a PATCH request
	const response = await axiosInstance.post(`survey/update-survey`, formData, {
		headers: {
			'Content-Type': 'multipart/form-data',
		},
	});
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
export const getSurveyByIdApi = async <T>(surveyId: string): Promise<T> => {
	const response = await axiosInstance.get(`survey/get-survey/${surveyId}`);
	return response.data as T;
};
type Option = string | number | number[];

export interface Question {
	questionId: number;
	questionType: number;
	options: Option;
}

export interface IAttemptSurveyBody {
	surveyId: string;
	participantUrl: string;
	questions: Question[];
}
export const attemptSurveyApi = async <T>(surveyData: IAttemptSurveyBody): Promise<T> => {
	const response = await axiosInstance.post(`survey/survey-attempt`, { ...surveyData });
	return response.data as T;
};
