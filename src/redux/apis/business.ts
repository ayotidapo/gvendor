import { createAsyncThunk } from '@reduxjs/toolkit';
import Fetch from '@/utils/fetch';
import { setVendor } from '../reducers/vendor';

export const updateBizApi = async (
	body: Record<string, any>,
	{ getState, dispatch }: any
) => {
	const vendor = getState().vendor;

	const response = await Fetch(`/vendor/business-record`, {
		body,
		method: 'put',
	});

	const bizdetails = vendor?.businessDetails;
	dispatch(
		setVendor({ ...vendor, businessDetails: { ...bizdetails, ...body } })
	);
	return response;
};

export const updateBankAccountApi = async (body: Record<string, any>) => {
	const response = await Fetch(`/vendor/account`, {
		body,
		method: 'put',
	});

	return response;
};

const updateBiz = createAsyncThunk('vendor/updateBiz', updateBizApi);

const updateAccount = createAsyncThunk(
	'vendor/bankAccount',
	updateBankAccountApi
);

export { updateBiz, updateAccount };
