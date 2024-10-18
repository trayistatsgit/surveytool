import { createAsyncThunk } from '@reduxjs/toolkit';
import { createSliceHook } from '../../../customHooks/createSliceHook';
import { IUpdateSurvey, updateSurveyApi } from '../../../services/survey/survey.service';
export const updateSurveyThunk = createAsyncThunk('survey/updateSurvey', async (surveyUpdatedData: IUpdateSurvey, { rejectWithValue }) => {
	try {
		const response = await updateSurveyApi(surveyUpdatedData);
		return response;
	} catch (error: any) {
		return rejectWithValue(error.response.data);
	}
});
export default createSliceHook('survey/updateSurvey', updateSurveyThunk, {});
