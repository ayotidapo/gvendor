import { createAsyncThunk } from '@reduxjs/toolkit';
import Fetch from '@/utils/fetch';
import { ObjectData } from '@/utils/interface';

export const getSettlementsApi = async (queyString?: string) => {
	const response = await Fetch(`/settlements${queyString}`);
	console.log(response.data, 'ppp');
	return response;
};

const getSettlements = createAsyncThunk(
	'settlements/getSettlements',
	getSettlementsApi
);

const getAllBanks = async () => {
	const response = await Fetch(`/vendor/banks`);
	const banks = response?.data?.data?.map((bank: ObjectData) => ({
		label: bank?.name,
		value: bank?.code,
	}));
	return banks;
};

export { getSettlements, getAllBanks };
