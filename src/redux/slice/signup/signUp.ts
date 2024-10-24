// src/redux/slice/signup/signUp.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import { postSignupApi } from '../../../services/signup/signup.service';
import { createSliceHook } from '../../../customHooks/createSliceHook';
export const signupApi = createAsyncThunk('signup/postSignup', async (data: { email: string; password: string }, { rejectWithValue }) => {
	try {
		const response = await postSignupApi(data);
		if (response.data && response.data.sessionToken) {
			localStorage.setItem('access', response.data.sessionToken);
		}
		return response;
	} catch (error: any) {
		return rejectWithValue(error.response.data);
	}
});
export default createSliceHook('signup', signupApi, {
	message: '',
	data: Response,
});
