import React, { Suspense } from 'react';
import BusinessSetupPage from '@/onboard/BusinessSetup';
import { ServerProps } from '@/utils/interface';
import { notFound } from 'next/navigation';

const BusinessSetup: React.FC<ServerProps> = async props => {
	const { searchParams } = props;
	const ck_token = searchParams?.ck_token;
	if (!ck_token) notFound();

	return <BusinessSetupPage />;
};

export default BusinessSetup;
