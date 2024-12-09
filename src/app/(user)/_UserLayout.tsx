'use client';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from '@/redux/hooks';
import { getVendor } from '@/redux/apis/vendor';

const _UserLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const dispatch = useDispatch();
	const { loading } = useSelector(state => state?.vendor);
	useEffect(() => {
		dispatch(getVendor());
	}, []);

	return <>{children}</>;
};

export default _UserLayout;
