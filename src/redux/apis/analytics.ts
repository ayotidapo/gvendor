import { createAsyncThunk } from '@reduxjs/toolkit';
import Fetch from '@/utils/fetch';

export const getAnalyticsApi = async (queyString?: string) => {
	const response = await Fetch(`/report/analytics${queyString}`);

	return response;
};

const getAnalytics = createAsyncThunk(
	'analytics/getAnalytics',
	getAnalyticsApi
);

export { getAnalytics };
