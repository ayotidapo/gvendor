'use client';
import React, { useEffect } from 'react';
//import { getMessaging, onMessage } from 'firebase/messaging';
import { useDispatch } from '@/redux/hooks';
import { requestToken, initializeFirebase } from '@/utils/fcmPushNotification';
import { setVendor } from '@/redux/reducers/vendor';
import { IVendor, ObjectData } from '@/utils/interface';
import { updateVendor, updateVendorApi } from '@/redux/apis/vendor';

const GetUserLayout: React.FC<{
	children: React.ReactNode;
	vendor: IVendor;
}> = ({ children, vendor }) => {
	const dispatch = useDispatch();

	const startPushNotification = async () => {
		try {
			const { onMessage } = await import('firebase/messaging');
			const messaging = await initializeFirebase();

			const token = await requestToken();

			const userDeviceTokens = vendor?.deviceToken || [];
			const existingFcmToken = localStorage?.fcm || '';

			const validDeviceTokens = userDeviceTokens.filter(
				(itemToken: string) => itemToken !== existingFcmToken
			);

			validDeviceTokens.unshift(token);

			const response = await updateVendorApi({
				deviceTokens: validDeviceTokens,
			});
			console.log({ response });
			dispatch(setVendor(response?.data));
			onMessage(messaging, payload => {
				console.log('Message received in foreground:', payload);
			});
		} catch (e: any) {
			console.log(e?.message);
		}
	};

	useEffect(() => {
		localStorage.t_ = vendor?.goodToken;
		dispatch(setVendor(vendor));
	}, []);

	useEffect(() => {
		//startPushNotification();
		// const messaging = getMessaging();
		// onMessage(messaging, payload => {
		// 	console.log('Message received in foreground:', payload);
		// });
	}, []);

	return <>{children}</>;
};

export default GetUserLayout;
