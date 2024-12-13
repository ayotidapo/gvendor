import { createSlice } from '@reduxjs/toolkit';

import { toast } from 'react-toastify';
import { getOrders } from '../apis/orders';
import { ObjectData } from '@/utils/interface';

export interface IOrderItem {
	productId: string;
	quantity: number;
	variants: any[];
	comboItems: any[];
	name: string;
	price: number;
}
export interface IOrderDetails {
	_id: string;
	userId: string;
	vendorId?: string;
	amount?: number;
	serviceCharge?: number;
	currency?: string;
	paymentStatus?: string;
	orderNumber?: string;
	delivery?: {
		type?: string;
		charge?: number;
		address?: string;
		contact?: string;
		contactNumber?: string;
		contactCondition?: string;
	};
	personalInformation: {
		firstName?: string;
		lastName?: string;
		email?: string;
		phone?: string;
		emailNotifications?: boolean;
	};
	buyForSelf?: boolean;
	status: string;
	metadata?: {
		deliveryChargeEstimateId?: string;
	};
	createdAt?: string;
	updatedAt?: string;
	__v?: 0;
	totalAmount: number;
	orderitems?: IOrderItem[];
	isSuccess?: boolean;
	isError?: boolean;
	error?: string | undefined;
	loading?: boolean;
}

const initialState: IOrderDetails = {
	_id: '',
	userId: '',
	status: '',
	personalInformation: {},
	totalAmount: 0,
};

export const orderDetailsSlice = createSlice({
	name: 'order_details',

	initialState,

	reducers: {
		setOrderDetails(state: IOrderDetails, action) {
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

export const { setOrderDetails } = orderDetailsSlice.actions;
export default orderDetailsSlice.reducer;
