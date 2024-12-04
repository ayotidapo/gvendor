import { IAddress, IVendor } from '@/utils/interface';
import { createSlice } from '@reduxjs/toolkit';
import { createBiz } from '../apis/business';

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
			console.log({ waoh: action.payload });
			Object.assign(state, action.payload);
		},
	},

	extraReducers: builder => {
		builder
			.addCase(createBiz.pending, state => {
				state.loading = true;
			})
			.addCase(createBiz.fulfilled, (state, action) => {
				state.isSuccess = true;
				state.isError = false;
				state.loading = false;
				console.log(action.payload?.data?.data, 'der');
				Object.assign(state, action.payload?.data?.data);
			})
			.addCase(createBiz.rejected, (state, action) => {
				state.isSuccess = false;
				state.isError = true;
				state.loading = false;
				state.error = action.error.message;
			});
	},
});

export const { setBusiness } = businessSlice.actions;
export default businessSlice.reducer;
