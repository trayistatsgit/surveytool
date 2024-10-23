/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { createSliceHook } from '../../../customHooks/createSliceHook';
import { surveyDetailApi } from '../../../services/survey/survey.service';
export const surveyDetail = createAsyncThunk('survey-detail', async (queryData, { rejectWithValue }) => {
	try {
		const response = await surveyDetailApi(queryData);
		return response;
	} catch (error: any) {
		return rejectWithValue(error.response.data);
	}
});
export default createSliceHook('surveyDetail', surveyDetail, {});
