import React from 'react';
import AnalyticsPage from '@/components/Analytics';
import options from '@/utils/nextAuthOptions';
import { ObjectData, sessionUser } from '@/utils/interface';
import { getServerSession } from 'next-auth';
import Fetch from '@/utils/fetch';

const Analytics = async () => {
	const session = await getServerSession(options);
	const user = session?.user as sessionUser;

	const response = await Promise.allSettled([
		Fetch(`/settlements`, {}, user.goodToken),
		Fetch(`/order/total-sold-products`, {}, user.goodToken),
		Fetch(`/report/top-viewed-products`, {}, user.goodToken),
	]);

	const [settlementData, totalActive, topViewed] = response as ObjectData[];

	const metrics = {
		totalRevenue: settlementData?.value?.data?.totalRevenue,
		totalSold: totalActive?.value?.data?.totalSoldProductsCount,
		totalProducts: totalActive?.value?.data?.totalProductsCount,
		topViewed: topViewed?.value?.data?.products?.[0]?.viewCount,
	};
	return (
		<div>
			<AnalyticsPage
				metrics={metrics}
				topViewedProducts={topViewed?.value?.data}
			/>
		</div>
	);
};

export default Analytics;
