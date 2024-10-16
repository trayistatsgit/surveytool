import { createAsyncThunk } from '@reduxjs/toolkit';
import { createSliceHook } from '../../../customHooks/createSliceHook';
import { createSurveyIdApi } from '../../../services/survey/createSurvey.service';
export const createSurveyId = createAsyncThunk('create-survey-id', async (_, { rejectWithValue }) => {
	try {
		const response = await createSurveyIdApi();
		return response;
	} catch (error: any) {
		return rejectWithValue(error.response.data);
	}
});
export default createSliceHook('createSurveyId', createSurveyId, {});
