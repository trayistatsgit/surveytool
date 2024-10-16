import { createAsyncThunk } from '@reduxjs/toolkit';
import { createSliceHook } from '../../../customHooks/createSliceHook';
import { createSurveyApi } from '../../../services/survey/createSurvey.service';
export const createSurveyId = createAsyncThunk('create-survey', async (_, { rejectWithValue }) => {
	try {
		const response = await createSurveyApi();
		return response;
	} catch (error: any) {
		return rejectWithValue(error.response.data);
	}
});
export default createSliceHook('create-survey', createSurveyId, {});
