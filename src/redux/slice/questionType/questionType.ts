import { createSliceHook } from '../../../customHooks/createSliceHook';
import { getQuestionTypesApi } from '../../../services/questionType/questionType.service';
import { createAsyncThunk } from '@reduxjs/toolkit';
export interface QuestionType {
	id: number;
	name: string;
}

export const questionTypeThunk = createAsyncThunk('questionType', async (_, { rejectWithValue }) => {
	try {
		const response = await getQuestionTypesApi();
		return response;
	} catch (error: unknown) {
		return rejectWithValue(error || 'An error occurred');
	}
});

export default createSliceHook('questionType', questionTypeThunk, {});
