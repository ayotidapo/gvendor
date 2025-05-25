importScripts(
	'https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js'
);
importScripts(
	'https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging-compat.js'
);

const app = firebase.initializeApp({
	apiKey: 'AIzaSyBBE_Ewi3jrQp3CufWtiP_F01TD7L69O2Y',
	authDomain: 'pwa-test-c4c7c.firebaseapp.com',
	databaseURL: 'https://pwa-test-c4c7c.firebaseio.com',
	projectId: 'pwa-test-c4c7c',
	storageBucket: 'pwa-test-c4c7c.firebasestorage.app',
	messagingSenderId: '1079733060280',
	appId: '1:1079733060280:web:3da899723fe8f6f862aa4d',
});
const messaging = firebase.messaging(app);

// Handle background messages
messaging.onBackgroundMessage(messaging, payload => {
	console.log('Message received in background:', payload);
	self.registration.showNotification(payload.notification.title, {
		body: payload.notification.body,
		icon: payload.notification.icon || '/favicon.ico',
	});
});

self.addEventListener('notificationclick', event => {
	// ('Notification click event: ', event);
	event.notification.close();

	// Open a URL when the notification is clicked
	event.waitUntil(
		clients
			// https://developer.mozilla.org/en-US/docs/Web/API/Clients/matchAll
			.matchAll({ type: 'window', includeUncontrolled: true })
			.then(function (clientList) {
				const url = event.notification.data.url;

				if (!url) return;
				for (const client of clientList) {
					if (client.url === url && 'focus' in client) {
						return client.focus();
					}
				}

				if (clients.openWindow) {
					// console.log('OPENWINDOW ON CLIENT');
					return clients.openWindow(url);
				}
			})
	);
});
