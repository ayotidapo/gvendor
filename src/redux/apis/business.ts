import { createAsyncThunk } from '@reduxjs/toolkit';
import Fetch from '@/utils/fetch';

export const createBizApi = async (body: Record<string, any>) => {
	const response = await Fetch(`/vendor/business-record`, {
		body,
		method: 'post',
	});

	return response;
};
// Async thunk to handle the API call

const createBiz = createAsyncThunk(
	'vendor/createBiz', // action type
	createBizApi
);

export { createBiz };
