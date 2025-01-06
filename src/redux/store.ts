import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import business from './reducers/business';
import vendor from './reducers/vendor';
import orders from './reducers/orders';
import inventories from './reducers/inventories';
import settlements from './reducers/settlements';
import orderDetails from './reducers/order_details';
import inventoryDetails from './reducers/inventory_details';

export const makeStore = () => {
	return configureStore({
		reducer: {
			business,
			vendor,
			orders,
			inventories,
			settlements,
			orderDetails,
			inventoryDetails,
		},
		middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger),
	});
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
