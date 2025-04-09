import { createAsyncThunk } from '@reduxjs/toolkit';
import Fetch from '@/utils/fetch';

export const getNotificationsApi = async () => {
	const response = await Fetch(`/notification`);

	return response;
};

const getNotifications = createAsyncThunk(
	'notifications/getNotifications',
	getNotificationsApi
);

export { getNotifications };
