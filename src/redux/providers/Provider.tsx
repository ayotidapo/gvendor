'use client';
import React, { FC, ReactNode } from 'react';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
interface Iprops {
	children: ReactNode;
}
const persistor = persistStore(store);

export const Providers: FC<Iprops> = ({ children }) => {
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				{children}
			</PersistGate>
		</Provider>
	);
};
