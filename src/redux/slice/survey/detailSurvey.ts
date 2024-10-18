import { createAsyncThunk } from '@reduxjs/toolkit';
import { createSliceHook } from '../../../customHooks/createSliceHook';
import { detailSurveyApi } from '../../../services/survey/survey.service';
export const detailSurveyThunk = createAsyncThunk('survey-detail', async (_, { rejectWithValue }) => {
	try {
		const response = await detailSurveyApi();
		console.log(response, 'nikhil');
		return response;
	} catch (error: any) {
		return rejectWithValue(error.response.data);
	}
});
export default createSliceHook('survey/updateSurvey', detailSurveyThunk, {});
