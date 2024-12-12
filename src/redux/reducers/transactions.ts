import { IAddress, IVendor } from '@/utils/interface';
import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { getTransactions } from '../apis/transactions';

export interface ITransaction {
	_id: string;
	itemsOrdered: string[];
	quantity: number;
	status: string;
	date: string;
	price: number;
	customerFirstName: string;
	customerLastName: string;
}

interface ITransactions {
	totalSales: number;
	totalOrders: number;
	averageOrderValue: number;
	transactions: ITransactions[];
	isSuccess?: boolean;
	isError?: boolean;
	error?: string | undefined;
	loading?: boolean;
}
const initialState: ITransactions = {
	totalSales: 0,
	totalOrders: 0,
	averageOrderValue: 0,
	transactions: [],
};

export const transactionsSlice = createSlice({
	name: 'transactions',

	initialState,

	reducers: {
		setOrders(state: ITransactions, action) {
			Object.assign(state, action.payload);
		},
	},

	extraReducers: builder => {
		builder
			.addCase(getTransactions.pending, state => {
				state.loading = true;
				state.isSuccess = false;
				state.isError = false;
			})
			.addCase(getTransactions.fulfilled, (state, action) => {
				state.isSuccess = true;
				state.isError = false;
				state.loading = false;
				Object.assign(state, action.payload?.data);
			})
			.addCase(getTransactions.rejected, (state, action) => {
				if (action.error?.message)
					toast.error(`Error occured: ${action.error?.message}`);

				state.isSuccess = false;
				state.isError = true;
				state.loading = false;
				state.error = action.error?.message;
			});
	},
});

export const { setOrders } = transactionsSlice.actions;
export default transactionsSlice.reducer;
