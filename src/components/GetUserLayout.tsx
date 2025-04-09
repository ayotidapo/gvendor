'use client';
import React, { useEffect } from 'react';
//import { getMessaging, onMessage } from 'firebase/messaging';
import { useDispatch } from '@/redux/hooks';
import {
	requestToken,
	firebaseConfig,
	initializeFirebase,
} from '@/utils/fcmPushNotification';
import { setVendor } from '@/redux/reducers/vendor';
import { IVendor } from '@/utils/interface';

const GetUserLayout: React.FC<{
	children: React.ReactNode;
	vendor: IVendor;
}> = ({ children, vendor }) => {
	const dispatch = useDispatch();

	const startPushNotification = async () => {
		const { onMessage } = await import('firebase/messaging');
		const messaging = await initializeFirebase();

		await requestToken();
		onMessage(messaging, payload => {
			console.log('Message received in foreground:', payload);
		});
	};

	useEffect(() => {
		localStorage.t_ = vendor?.goodToken;
		dispatch(setVendor(vendor));
	}, []);
	console.log(vendor, 98777777);
	useEffect(() => {
		// startPushNotification();
		// const messaging = getMessaging();
		// onMessage(messaging, payload => {
		// 	console.log('Message received in foreground:', payload);
		// });
	}, []);

	return <>{children}</>;
};

export default GetUserLayout;
