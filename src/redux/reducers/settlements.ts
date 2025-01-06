import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { getInventories } from '../apis/inventories';

interface ISettlements {
	docs: any[];
	total: number;
	totalPages: number;
	isSuccess?: boolean;
	isError?: boolean;
	error?: string | undefined;
	loading?: boolean;
}
const initialState: ISettlements = {
	docs: [],
	total: 0,
	totalPages: 0,
};

export const settlementsSlice = createSlice({
	name: 'settlements',

	initialState,

	reducers: {
		setSettlements(state: ISettlements, action) {
			Object.assign(state, action.payload);
		},
	},

	extraReducers: builder => {
		builder
			.addCase(getInventories.pending, state => {
				state.loading = true;
				state.isSuccess = false;
				state.isError = false;
			})
			.addCase(getInventories.fulfilled, (state, action) => {
				state.isSuccess = true;
				state.isError = false;
				state.loading = false;
				Object.assign(state, action.payload?.data);
			})
			.addCase(getInventories.rejected, (state, action) => {
				if (action.error?.message)
					toast.error(`Error occured: ${action.error?.message}`);

				state.isSuccess = false;
				state.isError = true;
				state.loading = false;
				state.error = action.error?.message;
			});
	},
});

export const { setSettlements } = settlementsSlice.actions;
export default settlementsSlice.reducer;
