import { createAsyncThunk } from '@reduxjs/toolkit';
import Fetch from '@/utils/fetch';

export const getInventoryDetailsApi = async (inventoryId: string) => {
	const response = await Fetch(`/inventory/${inventoryId}`);

	return response;
};

const getInventoryDetails = createAsyncThunk(
	'inventory_details/getInventoryDetails',
	getInventoryDetailsApi
);

export { getInventoryDetails };
