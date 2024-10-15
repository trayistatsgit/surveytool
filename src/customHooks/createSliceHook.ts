import { createSlice, PayloadAction, AsyncThunk, Draft } from '@reduxjs/toolkit';

interface AsyncState<T> {
	loading: boolean;
	error: string | null;
	data: T;
}

export const createSliceHook = <T, Args = void>(name: string, asyncThunk: AsyncThunk<T, Args, any>, initialData: T) => {
	const initialState: AsyncState<T> = {
		loading: false,
		error: null,
		data: initialData,
	};

	const slice = createSlice({
		name,
		initialState,
		reducers: {},
		extraReducers: (builder) => {
			builder
				.addCase(asyncThunk.pending, (state) => {
					state.loading = true;
					state.error = null;
				})
				.addCase(asyncThunk.fulfilled, (state, action: PayloadAction<T>) => {
					state.loading = false;
					state.data = action.payload as Draft<T>;
				})
				.addCase(asyncThunk.rejected, (state, action: PayloadAction<any>) => {
					state.loading = false;
					state.error = action.payload;
				});
		},
	});

	return slice.reducer;
};
