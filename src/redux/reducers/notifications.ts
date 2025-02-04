import { createSlice } from '@reduxjs/toolkit';
import { getNotifSettings } from '../apis/notifications';

interface INotifSettings {
	newOrder: {
		email: boolean | string;
		pushNotification: boolean | string;
	};
	settlementAndWithdrawal: {
		email: boolean | string;
		pushNotification: boolean | string;
	};
	lowStockAlerts: {
		email: boolean | string;
		pushNotification: boolean | string;
	};
	signInActivity: {
		email: boolean | string;
		pushNotification: boolean | string;
	};
	isSuccess?: boolean;
	isError?: boolean;
	error: string | undefined;
	loading: boolean;
}

const initialState: INotifSettings = {
	newOrder: {
		email: false,
		pushNotification: false,
	},
	settlementAndWithdrawal: {
		email: false,
		pushNotification: false,
	},
	lowStockAlerts: {
		email: false,
		pushNotification: false,
	},
	signInActivity: {
		email: false,
		pushNotification: false,
	},
	isSuccess: false,
	isError: false,
	error: '',
	loading: false,
};

export const notifSettingsSlice = createSlice({
	name: 'notifSettings',

	initialState,

	reducers: {
		setNotifSettings(state: INotifSettings, action) {
			Object.assign(state, action.payload);
		},
	},

	extraReducers: builder => {
		builder
			.addCase(getNotifSettings.pending, state => {
				state.isSuccess = false;
				state.isError = false;
				state.loading = true;
			})
			.addCase(getNotifSettings.fulfilled, (state, action) => {
				state.isSuccess = true;
				state.isError = false;
				state.loading = false;
				Object.assign(state, action.payload?.data);
			})
			.addCase(getNotifSettings.rejected, (state, action) => {
				state.isSuccess = false;
				state.isError = true;
				state.loading = false;
				state.error = action.error.message;
			});
	},
});

export const { setNotifSettings } = notifSettingsSlice.actions;
export default notifSettingsSlice.reducer;
