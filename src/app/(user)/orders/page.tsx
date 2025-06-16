import React from 'react';
import OrdersPage from '@/components/Orders';
import Fetch from '@/utils/fetch';
import { getServerSession } from 'next-auth';
import { ObjectData, sessionUser } from '@/utils/interface';
import options from '@/utils/nextAuthOptions';

const Order: React.FC = async () => {
	const session = await getServerSession(options);
	const user = session?.user as sessionUser;

	const response = await Promise.allSettled([
		Fetch(`/order/all`, {}, user.goodToken),
		Fetch(`/order/total-sold-products`, {}, user.goodToken),
		Fetch(`/report/top-viewed-products`, {}, user.goodToken),
	]);

	const [orders, totalActive, topViewed] = response as ObjectData[];

	const metrics = {
		orders: orders?.value?.data,
		totalSold: totalActive?.value?.data?.totalSoldProductsCount,
		totalProducts: totalActive?.value?.data?.totalProductsCount,
		topViewed: topViewed?.value?.data?.products?.[0]?.viewCount,
	};
	return <OrdersPage metrics={metrics} />;
};

export default Order;
