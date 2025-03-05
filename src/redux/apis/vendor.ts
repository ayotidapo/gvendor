import Fetch from '@/utils/fetch';
import { IVendor } from '@/utils/interface';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getInvitedVendorApi = async (id: string) => {
	const response = await Fetch(`/vendors/invitations/${id}`);

	return response;
};

export const registerVendorApi = async (body: IVendor) => {
	const { reference, ...payload } = body;
	const qS = reference ? `?reference=${reference}` : '';

	const response = await Fetch(`/auth/register${qS}`, {
		body: payload,
		method: 'post',
	});

	return response;
};

export const updateVendorApi = async (body: IVendor) => {
	const response = await Fetch(`/vendor`, {
		body,
		method: 'put',
	});

	return response;
};

export const createPasswordApi = async (body: Record<string, any>) => {
	const { password, token } = body;

	const response = await Fetch(`/auth/set-password/${token}`, {
		body: { password },
		method: 'post',
	});

	return response;
};

export const changePasswordApi = async (body: Record<string, any>) => {
	const { newPassword2, ...payload } = body;

	const response = await Fetch(`/profile/change-password`, {
		body: payload,
		method: 'patch',
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

export const getVendorApi = async (token = '') => {
	const response = await Fetch(`/vendor`, {}, token);

	return response;
};

export const loginApi = async (body: Record<string, any>) => {
	const response = await Fetch(`/auth/login`, {
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

const getVendor = createAsyncThunk(
	'vendor/getVendor', // action type
	getVendorApi
);

const registerVendor = createAsyncThunk('vendor/register', registerVendorApi);
const updateVendor = createAsyncThunk('vendor/update', registerVendorApi);
const login = createAsyncThunk('vendor/login', loginApi);

export { getInvitedVendor, getVendor, registerVendor, updateVendor, login };

//
