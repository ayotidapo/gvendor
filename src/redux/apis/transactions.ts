import { createAsyncThunk } from '@reduxjs/toolkit';
import Fetch from '@/utils/fetch';

export const getTransactionsApi = async (queyString?: string) => {
	const response = await Fetch(`/transaction/all${queyString}`);

	return response;
};

const getTransactions = createAsyncThunk(
	'transactions/getTransaction',
	getTransactionsApi
);

export { getTransactions };
