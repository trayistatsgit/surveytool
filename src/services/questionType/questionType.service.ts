// import axios from 'axios';

import axiosInstance from '../axios.helper';

// With query parameters
export interface QuestionType {
	id: number; // or string, depending on your data structure
	name: string;
}
export const getQuestionTypesApi = async () => {
	const response = await axiosInstance.get('question/question-type');
	return response.data;
};
