import { getQuestionTypesApi } from '../../services/questionType/questionType.service';
import clearStoreReducer from './common/clearStore.slice';
import createSurveyIdSlice from './survey/createSurvey';
import upsertSurveyQuestionSlice from './survey/upsertSurveyQuestion';

const reducer = {
	clearStoreReducer,
	getQuestionTypesApi,
	createSurveyIdSlice,
	upsertSurveyQuestionSlice,
};

export default reducer;
