import { createSliceHook } from '@/customHooks/createSliceHook';
import { createSurveyApi } from '@/services/survey/createSurvey.service';
import { createAsyncThunk } from '@reduxjs/toolkit';

// import { createSliceHook } from '../../../customHooks/createSliceHook';
export const userSurveyAttemptReportByDate: any = createAsyncThunk('create-survey', async (queryData: any, { rejectWithValue }) => {
	try {
		const response = await createSurveyApi(queryData);
		return response;
	} catch (error: any) {
		return rejectWithValue(error.response.data);
	}
});
export default createSliceHook('userSurveyAttemptReportByDate', userSurveyAttemptReportByDate, {});
