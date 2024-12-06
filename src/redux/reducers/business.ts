import { IAddress, IVendor } from '@/utils/interface';
import { createSlice } from '@reduxjs/toolkit';
import { updateBiz } from '../apis/business';
import { toast } from 'react-toastify';

export interface IUser {}

interface IBusiness {
	businessName: string;
	businessAddress: IAddress;
	website: string;
	socialMediaLinks: string[] | string;
	servicesOffered: string[] | string;
	businessStructure?: string;
	yearsOfExperince?: string;
	annualTurnOver?: number;
	cacNumber?: string;
	tinNumber?: string;
	nafdacNumber?: boolean;
	sonNumber?: boolean;
	isSuccess?: boolean;
	isError?: boolean;
	error?: string | undefined;
	loading?: boolean;
}

const initialState: IBusiness = {
	businessName: '',
	businessAddress: { address: '', longitude: '', latitude: '' },
	website: '',
	socialMediaLinks: [''],
	servicesOffered: [''],
	businessStructure: '',
	yearsOfExperince: '',
	annualTurnOver: 0,
	cacNumber: '',
	nafdacNumber: false,
	tinNumber: '',
	sonNumber: false,
};

export const businessSlice = createSlice({
	name: 'user',

	initialState,

	reducers: {
		setBusiness(state: IBusiness, action) {
			Object.assign(state, action.payload);
		},
	},

	extraReducers: builder => {
		builder
			.addCase(updateBiz.pending, state => {
				state.loading = true;
			})
			.addCase(updateBiz.fulfilled, (state, action) => {
				state.isSuccess = true;
				state.isError = false;
				state.loading = false;
				Object.assign(state, action.payload?.data?.data);
			})
			.addCase(updateBiz.rejected, (state, action) => {
				if (action.error?.message)
					toast.error(`Error occured: ${action.error?.message}`);

				state.isSuccess = false;
				state.isError = true;
				state.loading = false;
				state.error = action.error?.message;
			});
	},
});

export const { setBusiness } = businessSlice.actions;
export default businessSlice.reducer;
