export interface Question {
  questionId: number | null;
  questionName: string;
  questionType: number;
  options?: IQuestionName[];
}
interface IQuestionName {
  optionId?: number | null;
  optionText: string;
}

export interface SurveyInitialData {
  surveyName: string;
  surveyDescription: string;
  logo: null | string;
  pageNo: number;
  surveyId: string;
  surveyQuestions: Question[];
}
export interface QuestionTypesResponse {
  id: number;
  name: string;
}

export interface IQuestionType {
  id: number;
  name: string;
}
