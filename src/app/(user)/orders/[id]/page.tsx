'use client';

import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import OrderDetailsPage from '@/components/OrderDetails';

const OrderDetails = () => {
	const { id } = useParams();
	//const [getOrderDetail, { data: orderData }] = useGetOrderDetailMutation();

	useEffect(() => {
		// getOrderDetail(id as string);
	}, [id]);

	return <OrderDetailsPage />;
};

export default OrderDetails;
