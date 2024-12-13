import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { getInventories } from '../apis/inventories';

export interface ISettlement {
	_id: string;
	name: string;
	category: string;
	inStock: number;
	status: string;
	date: string;
	price: number;
}

export interface IBestSeller {
	_id: string;
	name: string;
	category: any;
	unitsSold: number;
	price: number;
	amountSold: number;
}

interface ISettlements {
	totalUnitsSold: number;
	productsInStock: number;
	bestSellers: IBestSeller[];
	products: ISettlement[];
	isSuccess?: boolean;
	isError?: boolean;
	error?: string | undefined;
	loading?: boolean;
}
const initialState: ISettlements = {
	totalUnitsSold: 0,
	productsInStock: 0,
	bestSellers: [],
	products: [],
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
