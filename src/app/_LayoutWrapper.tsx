'use client';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from '@/redux/hooks';
import { getVendor } from '@/redux/apis/vendor';

import { notFound, redirect, useSearchParams } from 'next/navigation';
import Navbar from './_Navbar';
import LoadingPage from '@/molecules/LoadingPage';

const LayoutWrapper: React.FC<{
	children: React.ReactNode;
}> = ({ children }) => {
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(false);
	const sQ = useSearchParams();

	const ck_token = sQ.get('ck_token');

	const onGetVendor = async () => {
		if (ck_token) {
			setLoading(true);
			try {
				localStorage.t_ = ck_token;
				const action = await dispatch(getVendor());
				if (getVendor.fulfilled.match(action)) {
					console.log('Success:', action.payload);
				} else if (getVendor.rejected.match(action)) {
					console.error('Error:', action.error.message);
				}
			} catch (e) {
				redirect(`/auth/login`);
			} finally {
				setLoading(false);
			}
		}
	};

	useEffect(() => {
		onGetVendor();
	}, [ck_token]);

	if (loading) return <LoadingPage />;

	return (
		<>
			<Navbar />
			<main className='pt-16'>{children}</main>
		</>
	);
};

export default LayoutWrapper;
