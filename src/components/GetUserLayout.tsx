'use client';
import React, { useEffect } from 'react';
import { useDispatch } from '@/redux/hooks';

import { setVendor } from '@/redux/reducers/vendor';
import { IVendor } from '@/utils/interface';

const GetUserLayout: React.FC<{
	children: React.ReactNode;
	vendor: IVendor;
}> = ({ children, vendor }) => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(setVendor(vendor));
	}, []);

	return <>{children}</>;
};

export default GetUserLayout;
