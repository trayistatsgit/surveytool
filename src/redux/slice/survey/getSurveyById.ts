import { createAsyncThunk } from '@reduxjs/toolkit';
import { createSliceHook } from '../../../customHooks/createSliceHook';
import { getSurveyByIdApi } from '../../../services/survey/survey.service';
export const getSurveyByIdThunk = createAsyncThunk('survey/surveyById', async (surveyId: string, { rejectWithValue }) => {
	try {
		const response = await getSurveyByIdApi(surveyId);
		return response;
	} catch (error: any) {
		return rejectWithValue(error.response.data);
	}
});
export default createSliceHook('survey/surveyById', getSurveyByIdThunk, {});
