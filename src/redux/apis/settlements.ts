import { createAsyncThunk } from '@reduxjs/toolkit';
import Fetch from '@/utils/fetch';

export const getInventoriesApi = async (queyString?: string) => {
	const response = await Fetch(`/settlement${queyString}`);

	return response;
};

const getSettlements = createAsyncThunk(
	'settlements/getSettlements',
	getInventoriesApi
);

export { getSettlements };
