import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import business from './reducers/business';
import vendor from './reducers/vendor';
import orders from './reducers/orders';
import transactions from './reducers/transactions';

export const makeStore = () => {
	return configureStore({
		reducer: {
			business,
			vendor,
			orders,
			transactions,
		},
		middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger),
	});
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
