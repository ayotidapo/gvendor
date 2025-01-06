import { createAsyncThunk } from '@reduxjs/toolkit';
import Fetch from '@/utils/fetch';

export const getSettlementsApi = async (queyString?: string) => {
	const response = await Fetch(`/settlements${queyString}`);
	console.log( response.data ,'ppp');
	return response;
};

const getSettlements = createAsyncThunk(
	'settlements/getSettlements',
	getSettlementsApi
);

export { getSettlements };
