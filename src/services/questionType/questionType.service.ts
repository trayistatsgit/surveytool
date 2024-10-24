import axiosInstance from '../axios.helper';
export interface QuestionType {
  id: number; // or string, depending on your data structure
  name: string;
}
export const getQuestionTypesApi = async <T>(): Promise<T> => {
  const response = await axiosInstance.get('question/question-type');
  return response.data;
};
