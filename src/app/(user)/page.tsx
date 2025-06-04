import HomePage from '@/components/Home';

import Fetch from '@/utils/fetch';
import { ObjectData, sessionUser } from '@/utils/interface';
import options from '@/utils/nextAuthOptions';
import { getServerSession } from 'next-auth';

export default async function Home() {
	const session = await getServerSession(options);
	const user = session?.user as sessionUser;

	const response = await Promise.allSettled([
		Fetch(`/settlements`, {}, user.goodToken),
		Fetch(`/order/all?status=FULFILLED`, {}, user.goodToken),
		Fetch(`/order/all?status=ONGOING`, {}, user.goodToken),
		Fetch(`/report/top-viewed-products`, {}, user.goodToken),
		Fetch(`/inventory`, {}, user.goodToken),
	]);

	const [settlementData, fulfiledOrder, ongoingOrder, topViewed, itemsSold] =
		response as ObjectData[];

	const metrics = {
		totalRevenue: settlementData?.value?.data?.totalRevenue,
		totalNewOrders: fulfiledOrder?.value?.data?.totalOrders,
		totalNewSales: fulfiledOrder?.value?.data?.totalSales,
		totalProcessingOrders: ongoingOrder?.value?.data?.totalOrders,
		totalProcessingSales: ongoingOrder?.value?.data?.totalSales,
		totalViewed: topViewed?.value?.data?.totalViews,
		itemsSold: itemsSold?.value?.data?.totalUnitsSold,
	};

	return <HomePage metrics={metrics} />;
}
