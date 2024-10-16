import { createSlice } from '@reduxjs/toolkit';

const initialState = {};
const clearStoreSlice = createSlice({
	name: 'clear-store',
	initialState,
	reducers: {
		clearStore: () => {
			return initialState;
		},
	},
});

// Export the action
export const { clearStore } = clearStoreSlice.actions;

// Export the reducer
export default clearStoreSlice.reducer;
