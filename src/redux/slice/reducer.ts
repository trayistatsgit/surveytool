import { getQuestionTypesApi } from '../../services/questionType/questionType.service';
import clearStoreReducer from './common/clearStore.slice';
import createSurveyIdSlice from './survey/createSurvey';

const reducer = {
	clearStoreReducer,
	getQuestionTypesApi,
	createSurveyIdSlice,
};

export default reducer;
