import Cookies from 'js-cookie'
import { combineReducers, configureStore, isRejectedWithValue, Middleware } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer, { signOut } from '../reducers/auth/auth.reducer';
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import { toast } from 'react-toastify';
import { apiSlice } from '../apis/api.slice';


export const rtkQueryResponseFeedbackMiddleware: Middleware =
	() => (next) => (action: unknown) => {
		const dispatch = store.dispatch
		// returns action type: query || mutation

		const actionType = (): string => action?.meta?.arg?.type || '';

		if (actionType() === 'mutation') {
			if (isRejectedWithValue(action)) {
				if (action?.payload?.data?.error?.includes('authorization')) {
					Cookies.remove('@vendor_auth')
					dispatch(signOut())
					toast.error('Session expired, please login', { theme: 'colored' })
				}
			}
		}

		if (actionType() === 'query') {
			if (isRejectedWithValue(action)) {
				if (action?.payload?.data?.error?.includes('authorization')) {
					Cookies.remove('@vendor_auth')
					dispatch(signOut())
				}
			}
		}

		return next(action)
	}

const rootReducer = combineReducers({
	auth: authReducer,
});

const persistConfig = {
	key: 'root',
	storage,
	whitelist: ['auth'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware): any =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}).concat([
			apiSlice.middleware,
			rtkQueryResponseFeedbackMiddleware,
		]),
	devTools: true,
})

//export const store = configureStore({
//	reducer: persistedReducer,
//	middleware: (getDefaultMiddleware) =>
//		getDefaultMiddleware({
//			serializableCheck: {
//				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//			},
//		}),
//	devTools: true,
//});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);