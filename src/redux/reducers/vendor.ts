import { IVendor } from '@/utils/interface';
import { createSlice } from '@reduxjs/toolkit';
import { registerVendor } from '../apis/vendor';

export interface IUser {}

interface IState extends IVendor {
	_id: string;
	isSuccess?: boolean;
	isError?: boolean;
	error: string | undefined;
	loading: boolean;
}

const initialState: IState = {
	_id: '',
	firstName: '',
	lastName: '',
	email: '',
	phone: '',
	businessName: '',
	servicesOffered: '',
	website: '',
	businessAddress: {},
	error: '',
	loading: false,
};

export const vendorSlice = createSlice({
	name: 'user',

	initialState,

	reducers: {
		setVendor(state: IState, action) {
			console.log({ waoh: action.payload });
			Object.assign(state, action.payload);
		},
	},

	extraReducers: builder => {
		builder
			.addCase(registerVendor.pending, state => {
				state.status = 'pending';
				state.loading = true;
			})
			.addCase(registerVendor.fulfilled, (state, action) => {
				state.isSuccess = true;
				state.isError = false;
				state.loading = false;
				console.log(action.payload?.data?.data, 'der');
				Object.assign(state, action.payload?.data?.data);
			})
			.addCase(registerVendor.rejected, (state, action) => {
				state.isSuccess = false;
				state.isError = true;
				state.loading = false;
				state.error = action.error.message;
			});
	},
});

export const { setVendor } = vendorSlice.actions;
export default vendorSlice.reducer;
