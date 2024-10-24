/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { createSliceHook } from '../../../customHooks/createSliceHook';
import { ISurveyDetail, surveyDetailApi } from '../../../services/survey/survey.service';
export const surveyDetailThunk = createAsyncThunk('survey-detail', async (queryData: ISurveyDetail, { rejectWithValue }) => {
  try {
    const response = await surveyDetailApi(queryData);
    return response;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});
export default createSliceHook('surveyDetail', surveyDetailThunk, {});
