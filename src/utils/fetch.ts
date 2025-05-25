import { signOut } from 'next-auth/react';

const isValidUrl = (url: string): boolean => {
	try {
		new URL(url);
		return true;
	} catch (error) {
		return false;
	}
};

const Fetch = async (
	path: string,
	config: RequestInit | Record<string, any> = {},
	headerToken?: string
) => {
	try {
		let fullPath;

		if (isValidUrl(path as string)) fullPath = path;
		else fullPath = `${process.env.NEXT_PUBLIC_API_BASE_URL}${path}`;

		let authorizationToken = '';

		if (typeof global.window !== 'undefined') {
			const token = localStorage?.t_;
			authorizationToken = `Bearer ${token}`;
		} else {
			authorizationToken = `Bearer ${headerToken}`;
		}

		const response = await fetch(fullPath, {
			...config,
			headers: {
				Authorization: authorizationToken,
				'Content-Type': 'application/json',
				...config?.headers,
			},
			body: JSON.stringify(config.body),
		});

		const cType = response.headers.get('Content-Type');
		const xlsx =
			'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
		if (!response.ok) {
			if (response.status === 401 && typeof global.window !== 'undefined') {
				return signOut({ callbackUrl: '/auth/login' });
			}

			let responseErr;

			if (cType === xlsx) responseErr = await response.blob();
			else responseErr = await response.json();

			const errMessage =
				responseErr.message || response.statusText || responseErr.error;
			throw { status: response.status, message: errMessage };
		}

		let result;

		if (cType === xlsx) result = await response.blob();
		else result = await response.json();

		return result;
	} catch (e: any) {
		// if (e.status === 401 ) {
		// 	//console.log('e')
		// }

		throw { message: e.message, status: e.status };
	}
};

export default Fetch;
