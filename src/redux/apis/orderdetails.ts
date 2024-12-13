import { createAsyncThunk } from '@reduxjs/toolkit';
import Fetch from '@/utils/fetch';

export const getOrdersDetailsApi = async (orderId: string) => {
	const response = await Fetch(`/order/details/${orderId}`);

	return response;
};

const getOrderDetails = createAsyncThunk(
	'order_details/getOrderDetails',
	getOrdersDetailsApi
);

export { getOrderDetails };
