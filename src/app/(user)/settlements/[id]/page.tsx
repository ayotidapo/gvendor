import SettlementDetailsPage from '@/components/SettlementDetails';
import Fetch from '@/utils/fetch';
import { ServerProps, sessionUser } from '@/utils/interface';
import options from '@/utils/nextAuthOptions';
import { getServerSession } from 'next-auth';
import React from 'react';

const SettlementDetails: React.FC<ServerProps> = async ({ params }) => {
	const settlementId = params?.id;

	const session = await getServerSession(options);
	const user = session?.user as sessionUser;

	const response = await Fetch(
		`/settlements/${settlementId}`,
		{},
		user?.goodToken
	);
	const details = response?.data;

	return <SettlementDetailsPage details={response?.data} />;
};

export default SettlementDetails;
