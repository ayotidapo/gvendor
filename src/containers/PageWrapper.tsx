'use client';

import { Header } from '@/components/typography/Header';
import { useAppSelector } from '@/hooks/reduxHooks';
import { authSelector } from '@/redux/reducers/auth/auth.selector';
import { useRouter } from 'next/navigation';
import React, { ReactNode, useEffect } from 'react';

interface PageWrapperProps {
	children: ReactNode;
	pageHeader: string;
}

const PageWrapper: React.FC<PageWrapperProps> = ({ children, pageHeader }) => {
	const router = useRouter();
	const authData = useAppSelector(authSelector);

	useEffect(() => {
		if (!authData.signedIn) {
			router.push('/auth/login');
		}
	}, [authData.signedIn]);

	return (
		<div className='m-auto lg:ml-72 mt-20 p-8'>
			<Header header={pageHeader} />
			<div className='my-10'>{children}</div>
		</div>
	);
};

export default PageWrapper;
