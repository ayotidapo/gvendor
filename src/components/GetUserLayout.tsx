'use client';
import React, { useEffect } from 'react';
//import { getMessaging, onMessage } from 'firebase/messaging';
import { useDispatch } from '@/redux/hooks';
import { requestToken, initializeFirebase } from '@/utils/fcmPushNotification';
import { setVendor } from '@/redux/reducers/vendor';
import { IVendor, ObjectData } from '@/utils/interface';
import { updateVendor } from '@/redux/apis/vendor';

const GetUserLayout: React.FC<{
	children: React.ReactNode;
	vendor: IVendor;
}> = ({ children, vendor }) => {
	const dispatch = useDispatch();

	const startPushNotification = async () => {
		const { onMessage } = await import('firebase/messaging');
		const messaging = await initializeFirebase();

		const token = await requestToken();

		const userDeviceTokens = vendor?.deviceToken || [];
		const existingFcmToken = localStorage?.fcm || '';

		const validDeviceTokens = userDeviceTokens.filter(
			(itemToken: string) => itemToken !== existingFcmToken
		);
		validDeviceTokens.unshift(token);

		const action = await dispatch(
			updateVendor({ deviceTokens: validDeviceTokens })
		);

		if (updateVendor?.rejected?.match(action)) {
			console.log('device token not updated');
		}
		onMessage(messaging, payload => {
			console.log('Message received in foreground:', payload);
		});
	};

	useEffect(() => {
		localStorage.t_ = vendor?.goodToken;
		dispatch(setVendor(vendor));
	}, []);

	useEffect(() => {
		startPushNotification();
		// const messaging = getMessaging();
		// onMessage(messaging, payload => {
		// 	console.log('Message received in foreground:', payload);
		// });
	}, []);

	return <>{children}</>;
};

export default GetUserLayout;
