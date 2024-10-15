// src/store/questionType/questionTypeSlice.ts
import { createSliceHook } from '../../../customHooks/createSliceHook';
import { getQuestionTypesApi } from '../../../services/questionType/questionType.service';
import { createAsyncThunk } from '@reduxjs/toolkit';

// src/types/questionType.ts
export interface QuestionType {
	id: number; // or string, depending on your data structure
	name: string;
}

// export interface questionTypeData {
// 	questionTypes: QuestionType;
// }

// Define the async thunk

export const createQuestionType = createAsyncThunk('create-questionType', async (_, { rejectWithValue }) => {
	try {
		const response = await getQuestionTypesApi();
		return response;
	} catch (error: unknown) {
		return rejectWithValue(error || 'An error occurred');
	}
});

// Create a slice using the createSliceHook
export default createSliceHook('questionType', createQuestionType, {});
