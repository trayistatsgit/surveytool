/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { createSliceHook } from '../../../customHooks/createSliceHook';
import { loginPageApi } from '../../../services/auth/auth.service';
export const loginPage = createAsyncThunk('login', async (queryData, { rejectWithValue }) => {
  try {
    const response = await loginPageApi(queryData);
    return response;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});
export default createSliceHook('loginPage', loginPage, {});
