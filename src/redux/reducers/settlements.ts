import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { getSettlements } from '../apis/settlements';

interface ISettlements {
	docs: any[];
	total: number;
	totalPages: number;
	totalRevenue?: number;
	isSuccess?: boolean;
	isError?: boolean;
	error?: string | undefined;
	loading?: boolean;
	isFetching?: boolean;
}
const initialState: ISettlements = {
	docs: [],
	total: 0,
	totalPages: 0,
	totalRevenue: 0,
	loading: true,
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
			.addCase(getSettlements.pending, state => {
				state.loading = !state.isSuccess && !state.isError;
				state.isFetching = true;
				state.isSuccess = false;
				state.isError = false;
			})
			.addCase(getSettlements.fulfilled, (state, action) => {
				state.isSuccess = true;
				state.isError = false;
				state.loading = false;
				state.isFetching = false;
				Object.assign(state, action.payload?.data);
			})
			.addCase(getSettlements.rejected, (state, action) => {
				if (action.error?.message)
					toast.error(`Error occured: ${action.error?.message}`);

				state.isSuccess = false;
				state.isError = true;
				state.loading = false;
				state.isFetching = false;
				state.error = action.error?.message;
			});
	},
});

export const { setSettlements } = settlementsSlice.actions;
export default settlementsSlice.reducer;
