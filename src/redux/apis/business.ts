import { createAsyncThunk } from '@reduxjs/toolkit';
import Fetch from '@/utils/fetch';

export const updateBizApi = async (body: Record<string, any>) => {
	const response = await Fetch(`/vendor/business-record`, {
		body,
		method: 'put',
	});

	return response;
};

export const updateBankAccountApi = async (body: Record<string, any>) => {
	const response = await Fetch(`/vendor/account`, {
		body,
		method: 'put',
	});

	return response;
};

const updateBiz = createAsyncThunk('vendor/createBiz', updateBizApi);

const updateAccount = createAsyncThunk(
	'vendor/bankAccount',
	updateBankAccountApi
);

export { updateBiz, updateAccount };
