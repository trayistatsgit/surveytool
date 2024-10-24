import { createAsyncThunk } from '@reduxjs/toolkit';
import { createSliceHook } from '../../../customHooks/createSliceHook';
import { surveyResultApi } from '../../../services/survey/survey.service';
export const surveyResultThunk = createAsyncThunk('survey/survey-result', async (surveyId: string, { rejectWithValue }) => {
  try {
    const response = await surveyResultApi(surveyId);
    return response;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});
export default createSliceHook('survey/survey-result', surveyResultThunk, {});
