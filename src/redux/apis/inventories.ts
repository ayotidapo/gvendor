import { createAsyncThunk } from '@reduxjs/toolkit';
import Fetch from '@/utils/fetch';

export const getInventoriesApi = async (queyString?: string) => {
	const response = await Fetch(`/inventory${queyString}`);

	return response;
};

const getInventories = createAsyncThunk(
	'inventories/getInventories',
	getInventoriesApi
);

export { getInventories };
