import { Auth, AuthResponse } from '@/types/types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const initialState: Auth = {
	signedIn: false,
	user: {
		email: '',
		firstname: '',
		lastname: '',
		password: '',
		phoneNumber: '',
	},
	token: undefined,
};

/**
 * @description: Handle Authentication reducers in the store
 */
export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		updateLogin: (state, action) => updateAuthStatus(state, action),
		updateUserWithAuth: (state, action) => setUserData(state, action),
		signOut: state => purgeUserData(state),
		updateUserNoAuth: (state, action) => {
			state.user = action.payload;
		},
	},
});

const updateAuthStatus = (state: Auth, action: PayloadAction<boolean>) => {
	state.signedIn = action.payload;
};

const setUserData = (state: Auth, action: PayloadAction<AuthResponse>) => {
	state.user = action.payload.data.user;
	state.signedIn = true;
	Cookies.set('@vendor_auth', JSON.stringify(action.payload));
};

const purgeUserData = (state: Auth) => {
	state.user = initialState.user;
	state.signedIn = false;
	Cookies.remove('@vendor_auth');
	Cookies.set('good_social_auth', '{}', {
		expires: -2,
	});
};

export const { updateUserWithAuth, signOut, updateUserNoAuth } =
	authSlice.actions;
export default authSlice.reducer;
