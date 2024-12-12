import { createAsyncThunk } from '@reduxjs/toolkit';
import Fetch from '@/utils/fetch';

export const getOrdersApi = async (queyString?: string) => {
	console.log(`/order/all${queyString}`, 'pouyt');
	const response = await Fetch(`/order/all${queyString}`);

	return response;
};

const getOrders = createAsyncThunk('orders/getOrders', getOrdersApi);

export { getOrders };