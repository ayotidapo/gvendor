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

//Backend Implementation

// const admin = require('firebase-admin');
// const express = require('express');
// const app = express();

// const serviceAccount = require('./path/to/serviceAccountKey.json');

// admin.initializeApp({
// 	credential: admin.credential.cert(serviceAccount),
// });

// // Body parsing middleware
// app.use(express.json());

// // Endpoint to send push notification
// app.post('/send', async (req, res) => {
// 	const { token, title, body } = req.body;

// 	const message = {
// Target the device using the token
//      token: "YOUR_DEVICE_REGISTRATION_TOKEN",
// Notification payload
//   notification: {
//     title: "Hello!",
//     body: "This is a test message.",
//     "icon": "https://yourdomain.com/icons/icon-96x96.png"
//   },
// Custom data payload
//   data: {
//     key1: "value1",
//     key2: "value2",
//     customKey: "some custom value",
//   },
//
// 	};

// 	try {
// 		const response = await admin.messaging().send(message);
// 		console.log('Successfully sent message:', response);
// 		res.status(200).json({ success: true, response });
// 	} catch (error) {
// 		console.error('Error sending message:', error);
// 		res.status(500).json({ success: false, error: error.message });
// 	}
// });

// // Start server
// app.listen(3000, () => console.log('Server running on port 3000'));
