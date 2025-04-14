import { IVendor, ObjectData } from '@/utils/interface';
import { createSlice } from '@reduxjs/toolkit';
import { getVendor, registerVendor } from '../apis/vendor';

interface IVState extends IVendor {
	businessDetails: { availableHours: ObjectData; [key: string]: any };
	isSuccess?: boolean;
	isRegSuccess?: boolean;
	isRegError?: boolean;
	isRegLoading?: boolean;
	isError?: boolean;
	error: string | undefined;
	regError: string | undefined;
	loading: boolean;
}

const initialState: IVState = {
	_id: '',
	businessDetails: {
		availableHours: {},
		businessAddress: { address: '', longitude: '', latitude: '' },
	},
	firstName: '',
	lastName: '',
	email: '',
	phone: '',
	businessName: '',
	servicesOffered: [''],
	website: '',
	businessAddress: { address: '', longitude: '', latitude: '' },
	error: '',
	regError: '',
	loading: false,
};

export const vendorSlice = createSlice({
	name: 'user',

	initialState,

	reducers: {
		setVendor(state: IVState, action) {
			Object.assign(state, action.payload);
		},
	},

	extraReducers: builder => {
		builder
			.addCase(registerVendor.pending, state => {
				state.status = 'pending';
				state.isRegLoading = true;
				state.isRegSuccess = false;
				state.isRegError = false;
			})
			.addCase(registerVendor.fulfilled, (state, action) => {
				state.isRegSuccess = true;
				state.isRegError = false;
				state.isRegLoading = false;
				Object.assign(state, action.payload?.data);
			})
			.addCase(registerVendor.rejected, (state, action) => {
				state.isRegSuccess = false;
				state.isRegError = true;
				state.isRegLoading = false;
				state.regError = action.error.message;
			})
			.addCase(getVendor.pending, state => {
				state.isSuccess = false;
				state.isError = false;
				state.loading = true;
			})
			.addCase(getVendor.fulfilled, (state, action) => {
				state.isSuccess = true;
				state.isError = false;
				state.loading = false;
				Object.assign(state, action.payload?.data);
			})
			.addCase(getVendor.rejected, (state, action) => {
				state.isSuccess = false;
				state.isError = true;
				state.loading = false;
				state.error = action.error.message;
			});
	},
});

export const { setVendor } = vendorSlice.actions;
export default vendorSlice.reducer;
