import { getQuestionTypesApi } from '../../services/questionType/questionType.service';
import clearStoreReducer from './common/clearStore.slice';
import createSurveyIdSlice from './survey/createSurvey';
import getSurveyByIdSlice from './survey/getSurveyById';
import surveyDetailSlice from './survey/surveyDetail';
import upsertSurveyQuestionSlice from './survey/upsertSurveyQuestion';

const reducer = {
	clearStoreReducer,
	getQuestionTypesApi,
	createSurveyIdSlice,
	upsertSurveyQuestionSlice,
	getSurveyByIdSlice,
	surveyDetailSlice,
};

export default reducer;
