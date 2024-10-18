import { createAsyncThunk } from '@reduxjs/toolkit';
import { createSliceHook } from '../../../customHooks/createSliceHook';
import { upsertSurveyQuestionApi } from '../../../services/survey/survey.service';
export const upsertSurveyQuestionThunk = createAsyncThunk('upsert-survey-question', async (bodyData: any, { rejectWithValue }) => {
	try {
		const response = await upsertSurveyQuestionApi(bodyData);
		return response;
	} catch (error: any) {
		return rejectWithValue(error.response.data);
	}
});
export default createSliceHook('upsertSurveyQuestion', upsertSurveyQuestionThunk, {});
