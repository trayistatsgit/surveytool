import clearStoreReducer from './common/clearStore.slice';
import questionTypeSlice from './questionType/questionType';
import attemptSurveySlice from './survey/attemptSurvey';
import createSurveyIdSlice from './survey/createSurvey';
import getSurveyByIdSlice from './survey/getSurveyById';
import surveyDetailSlice from './survey/surveyDetail';
import surveyResultSlice from './survey/surveyResult';
import upsertSurveyQuestionSlice from './survey/upsertSurveyQuestion';

const reducer = {
	clearStoreReducer,
	createSurveyIdSlice,
	questionTypeSlice,
	upsertSurveyQuestionSlice,
	getSurveyByIdSlice,
	surveyDetailSlice,
	surveyResultSlice,
	attemptSurveySlice,
};

export default reducer;
