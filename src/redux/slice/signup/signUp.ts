interface SignupInput {
	email: string;
	password: string;
}

import { createAsyncThunk } from '@reduxjs/toolkit';
import { SignupResponse, signupApi } from '../../../services/signup/signup.service';
import { createSliceHook } from '../../../customHooks/createSliceHook';

export const signUpThunk = createAsyncThunk('signup/postSignup', async (data: SignupInput, { rejectWithValue }) => {
	try {
		const response: SignupResponse = await signupApi(data);
		return response;
	} catch (error: any) {
		return rejectWithValue(error.response?.data);
	}
});

export default createSliceHook('signup', signUpThunk, {
	success: false,
	message: '',
	data: {
		sessionToken: '',
		user: {
			id: '',
			email: '',
		},
	},
});
