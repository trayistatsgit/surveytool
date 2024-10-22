import { createAsyncThunk } from '@reduxjs/toolkit';
import { createSliceHook } from '../../../customHooks/createSliceHook';
import { loginApi } from '../../../services/auth/auth.service';
export const loginThunk = createAsyncThunk('login', async (querydata: any, { rejectWithValue }) => {
	try {
		const response = await loginApi(querydata);
		return response;
	} catch (error: any) {
		return rejectWithValue(error.response.data);
	}
});
export default createSliceHook('login', loginThunk, {});
