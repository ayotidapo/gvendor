import { createSlice } from '@reduxjs/toolkit';

import { toast } from 'react-toastify';
import { getOrders } from '../apis/orders';

export interface IOrder {
	_id: string;
	orderId: string;
	itemsOrdered: string[];
	quantity: number;
	status: string;
	date: string;
	price: number;
	customerFirstName: string;
	customerLastName: string;
}

interface IOrders {
	totalSales: number;
	totalOrders: number;
	averageOrderValue: number;
	orders: IOrder[];
	isSuccess?: boolean;
	isError?: boolean;
	error?: string;
	loading?: boolean;
	fetching?: boolean;
}
const initialState: IOrders = {
	totalSales: 0,
	totalOrders: 0,
	averageOrderValue: 0,
	orders: [],
	loading: true,
	fetching: false,
};

export const ordersSlice = createSlice({
	name: 'orders',

	initialState,

	reducers: {
		setOrders(state: IOrders, action) {
			Object.assign(state, action.payload);
		},
	},

	extraReducers: builder => {
		builder
			.addCase(getOrders.pending, state => {
				state.loading = !state.isSuccess && !state.isError;
				state.fetching = true;
				state.isSuccess = false;
				state.isError = false;
			})
			.addCase(getOrders.fulfilled, (state, action) => {
				state.isSuccess = true;
				state.isError = false;
				state.loading = false;
				state.fetching = false;

				Object.assign(state, action.payload?.data);
			})
			.addCase(getOrders.rejected, (state, action) => {
				if (action.error?.message)
					toast.error(`Error occured: ${action.error?.message}`);

				state.isSuccess = false;
				state.isError = true;
				state.loading = false;
				state.fetching = false;
				state.error = action.error?.message;
			});
	},
});

export const { setOrders } = ordersSlice.actions;
export default ordersSlice.reducer;
