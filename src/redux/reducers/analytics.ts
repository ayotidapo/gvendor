import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { getAnalytics } from '../apis/analytics';
import { ObjectData } from '@/utils/interface';

interface IAnalytics {
	salesChart: ObjectData[];
	topSellingItems: ObjectData[];
	totalSales: { totalRevenue: number; percentageIncrease: number };
	totalOrders: {
		ordersCount: number;
		percentageIncrease: number;
	};
	totalCustomers: {
		totalNoOfCustomers: number;
	};
	averageOrderValue: {
		averageOrderValue: number;
		percentageChange: number;
	};
	isSuccess?: boolean;
	isError?: boolean;
	error?: string | undefined;
	loading?: boolean;
}
const initialState: IAnalytics = {
	salesChart: [],
	topSellingItems: [],
	totalSales: { totalRevenue: 0, percentageIncrease: 0 },
	totalOrders: {
		ordersCount: 0,
		percentageIncrease: 0,
	},
	totalCustomers: {
		totalNoOfCustomers: 0,
	},
	averageOrderValue: {
		averageOrderValue: 0,
		percentageChange: 0,
	},
	loading: true,
};

export const analyticsSlice = createSlice({
	name: 'analytics',

	initialState,

	reducers: {
		setAnalytics(state: IAnalytics, action) {
			Object.assign(state, action.payload);
		},
	},

	extraReducers: builder => {
		builder
			.addCase(getAnalytics.pending, state => {
				state.loading = !state.isSuccess && !state.isError;
				state.isSuccess = false;
				state.isError = false;
			})
			.addCase(getAnalytics.fulfilled, (state, action) => {
				state.isSuccess = true;
				state.isError = false;
				state.loading = false;
				Object.assign(state, action.payload?.data);
			})
			.addCase(getAnalytics.rejected, (state, action) => {
				if (action.error?.message)
					toast.error(`Error occured: ${action.error?.message}`);

				state.isSuccess = false;
				state.isError = true;
				state.loading = false;
				state.error = action.error?.message;
			});
	},
});

export const { setAnalytics } = analyticsSlice.actions;
export default analyticsSlice.reducer;
