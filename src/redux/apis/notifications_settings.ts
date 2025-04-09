import { createAsyncThunk } from '@reduxjs/toolkit';
import Fetch from '@/utils/fetch';
import { ObjectData } from '@/utils/interface';

export const getNotifSettingsApi = async () => {
	const response = await Fetch(`/notification/settings`);

	return response;
};

export const updateNotifSettingsApi = async (body: ObjectData) => {
	const response = await Fetch(`/notification/settings`, {
		body,
		method: 'put',
	});

	return response;
};

const updateNotifSettings = createAsyncThunk(
	'notifSettings/updateNotifSettings',
	updateNotifSettingsApi
);

const getNotifSettings = createAsyncThunk(
	'notifSettings/getNotifSettings',
	getNotifSettingsApi
);

export { getNotifSettings, updateNotifSettings };
