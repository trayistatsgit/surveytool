import { createAsyncThunk } from '@reduxjs/toolkit';
import { createSliceHook } from '../../../customHooks/createSliceHook';
import { attemptSurveyApi, IAttemptSurveyBody } from '../../../services/survey/survey.service';
export const attemptSurveyThunk = createAsyncThunk('survey/attemptSurvey', async (surveyData: IAttemptSurveyBody, { rejectWithValue }) => {
	try {
		const response = await attemptSurveyApi(surveyData);
		return response;
	} catch (error: any) {
		return rejectWithValue(error.response.data);
	}
});
export default createSliceHook('survey/attemptSurvey', attemptSurveyThunk, {});
