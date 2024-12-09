import React from 'react';
import BusinessSetupPage from '@/onboard/BusinessSetup';
import { ServerProps } from '@/utils/interface';
import { notFound, redirect } from 'next/navigation';

const BusinessSetup: React.FC<ServerProps> = async props => {
	const { searchParams } = props;
	const token = searchParams?.token;
	if (!token) redirect(`/login`);

	return <BusinessSetupPage />;
};

export default BusinessSetup;
