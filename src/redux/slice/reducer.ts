import { getQuestionTypesApi } from '../../services/questionType/questionType.service';
import clearStoreReducer from './common/clearStore.slice';

const reducer = {
	clearStoreReducer,
	getQuestionTypesApi,
};

export default reducer;
