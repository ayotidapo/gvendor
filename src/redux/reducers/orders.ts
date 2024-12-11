import { IAddress, IVendor } from '@/utils/interface';
import { createSlice } from '@reduxjs/toolkit';
import { updateBiz } from '../apis/business';
import { toast } from 'react-toastify';
import { getOrders } from '../apis/orders';

export interface IOrder {
	_id: string;
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
	error?: string | undefined;
	loading?: boolean;
}
const initialState: IOrders = {
	totalSales: 0,
	totalOrders: 0,
	averageOrderValue: 0,
	orders: [],
};

export const orderSlice = createSlice({
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
				state.loading = true;
				state.isSuccess = false;
				state.isError = false;
			})
			.addCase(getOrders.fulfilled, (state, action) => {
				state.isSuccess = true;
				state.isError = false;
				state.loading = false;
				Object.assign(state, action.payload?.data);
			})
			.addCase(getOrders.rejected, (state, action) => {
				if (action.error?.message)
					toast.error(`Error occured: ${action.error?.message}`);

				state.isSuccess = false;
				state.isError = true;
				state.loading = false;
				state.error = action.error?.message;
			});
	},
});

export const { setOrders } = orderSlice.actions;
export default orderSlice.reducer;
