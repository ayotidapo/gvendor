'use client';
import LoadingPage from '@/molecules/LoadingPage';
import { signOut } from 'next-auth/react';

import React, { useEffect } from 'react';

const AuthValidate = () => {
	useEffect(() => {
		const handler = setTimeout(() => {
			signOut({ callbackUrl: '/auth/login' });
		}, 1000);
		return () => {
			clearTimeout(handler);
		};
	}, []);
	return <LoadingPage />;
};

export default AuthValidate;
