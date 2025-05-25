import { createSlice } from '@reduxjs/toolkit';
import { getNotifications } from '../apis/notifications';

type INotification = {
	_id: string;
	title: string;
	message: string;
	updatedAt: string;
	[key: string]: any;
}[];
interface InotificationState {
	notifications: INotification;
	[key: string]: any;
}
const initialState: InotificationState = {
	notifications: [{ _id: '', title: '', message: '', updatedAt: '' }],
	isSuccess: false,
	isError: false,
	error: '',
	loading: false,
};

export const notificationsSlice = createSlice({
	name: 'notifications',

	initialState,

	reducers: {
		setNotifications(state: InotificationState, action) {
			Object.assign(state, action.payload);
		},
	},

	extraReducers: builder => {
		builder
			.addCase(getNotifications.pending, state => {
				state.isSuccess = false;
				state.isError = false;
				state.loading = true;
			})
			.addCase(getNotifications.fulfilled, (state, action) => {
				state.isSuccess = true;
				state.isError = false;
				state.loading = false;
				Object.assign(state, { notifications: [...action.payload?.data] });
			})
			.addCase(getNotifications.rejected, (state, action) => {
				state.isSuccess = false;
				state.isError = true;
				state.loading = false;
				state.error = action.error.message;
			});
	},
});

export const { setNotifications } = notificationsSlice.actions;
export default notificationsSlice.reducer;
