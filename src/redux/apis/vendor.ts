import Fetch from '@/utils/fetch';
import { IVendor } from '@/utils/interface';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getInvitedVendorApi = async (id: string) => {
	const response = await Fetch(`/vendors/invitations/${id}`);

	return response;
};

export const registerVendorApi = async (body: IVendor) => {
	const { reference, ...payload } = body;
	const qS = reference ? `?reference?${reference}` : '';
	console.log({ reference }, `/auth/register${qS}`);
	const response = await Fetch(`/auth/register${qS}`, {
		body: payload,
		method: 'post',
	});

	return response;
};

export const createPasswordApi = async (body: Record<string, any>) => {
	const { password, vendorId } = body;

	const response = await Fetch(`/auth/set-password/${vendorId}`, {
		body: { password },
		method: 'post',
	});

	return response;
};

export const createBizApi = async (body: Record<string, any>) => {
	const response = await Fetch(`/vendor/business-record`, {
		body,
		method: 'post',
	});

	return response;
};
// Async thunk to handle the API call
const getInvitedVendor = createAsyncThunk(
	'vendor/getInvited', // action type
	getInvitedVendorApi
);

const registerVendor = createAsyncThunk(
	'vendor/register', // action type
	registerVendorApi
);

export { getInvitedVendor, registerVendor };

//
