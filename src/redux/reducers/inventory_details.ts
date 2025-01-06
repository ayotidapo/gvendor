import { createSlice } from '@reduxjs/toolkit';

import { toast } from 'react-toastify';
import { getOrders } from '../apis/orders';
import { ObjectData } from '@/utils/interface';

export interface IInventoryDetails {
	_id: string;
	totalUnitsSold: number;
	name: string;
	isSuccess?: boolean;
	isError?: boolean;
	error?: string | undefined;
	loading?: boolean;
	[key: string]: any;
}

const initialState: IInventoryDetails = {
	_id: '',
	name: '',
	totalUnitsSold: 0,
};

export const InventoryDetailsSlice = createSlice({
	name: 'inventory_details',

	initialState,

	reducers: {
		setInventoryDetails(state: IInventoryDetails, action) {
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

export const { setInventoryDetails } = InventoryDetailsSlice.actions;
export default InventoryDetailsSlice.reducer;
