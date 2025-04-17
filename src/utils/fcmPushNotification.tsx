import { Messaging, getMessaging, getToken } from 'firebase/messaging';
import { initializeApp } from 'firebase/app';

export const firebaseConfig = {
	apiKey: 'AIzaSyBEn8UHTa9qhnt-TNR6x749J6O-fPJkwUg',
	authDomain: 'goodvendor-e5a34.firebaseapp.com',
	projectId: 'goodvendor-e5a34',
	storageBucket: 'goodvendor-e5a34.firebasestorage.app',
	messagingSenderId: '80632280697',
	appId: '1:80632280697:web:58a8925c6c942e677c46a8',
	measurementId: 'G-Y5Z2JSG6HQ',
};

export const initializeFirebase = async () => {
	const { initializeApp, getApp, getApps } = await import('firebase/app');
	const { getMessaging } = await import('firebase/messaging');

	const app =
		getApps().length === 0
			? initializeApp(firebaseConfig) // If no apps are initialized, initialize the app
			: getApp();

	const messaging = getMessaging(app);

	return messaging;
};

const requestForToken = async () => {
	let devToken;
	try {
		const messaging = await initializeFirebase();

		const token = await getToken(messaging, {
			vapidKey:
				'BDxLzIyVgYE2nCFGmaLrpIU1M9caMKVV0SaTAF0zbFW0u7WT1Q98-r2r_w2d7qcMAXIOPAopJPXwvqjWd7CuSM4',
		});

		if (token) {
			console.log('FCM Token:', token);
			devToken = token;
			localStorage.fcm = token;
			// Send this token to your backend or use it to send push notifications
		} else {
			alert('Unable to load token, refresh the browser');
			//console.log('No FCM token available.');
		}
	} catch (error) {
		console.error('Error requesting notification permission:', error);
	}

	return devToken;
};

export const requestToken = async () => {
	if (typeof window === 'undefined') return;

	if ('serviceWorker' in navigator) {
		try {
			const registration = await navigator.serviceWorker.register(
				'/firebase-messaging-sw.js'
			);
			console.log('Service Worker registered:', registration);
		} catch (e) {
			console.log('Service Worker registration failed:', e);
		} finally {
			if (!('Notification' in window)) {
				console.info('This browser does not support desktop notification');
				return false;
			}
			const permission = await Notification.requestPermission();
			if (permission === 'granted') {
				return requestForToken();
			} else if (permission === 'default') {
				const permission = await Notification.requestPermission();
				if (permission === 'granted') {
					return requestForToken();
				}
			}
		}
	}
};
