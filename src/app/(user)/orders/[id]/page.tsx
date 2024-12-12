'use client';

import { format } from 'date-fns';
import { formatCurrency } from '@/helpers';
import { Header } from '@/atoms/typography/Header';
import { Status } from '@/atoms/cards/StatusTag';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import { useGetOrderDetailMutation } from '@/redux/orders/orders.slice';
import OrderDetailsPage from '@/components/OrderDetails';

const OrderDetails = () => {
	const { id } = useParams();
	//const [getOrderDetail, { data: orderData }] = useGetOrderDetailMutation();

	useEffect(() => {
		// getOrderDetail(id as string);
	}, [id]);
	const getType = (status: string) => {
		if (
			status.toLocaleLowerCase() === 'delivered' ||
			status.toLocaleLowerCase() === 'completed'
		) {
			return 'success';
		}
		return 'warn';
	};
	return <OrderDetailsPage />;
};

export default OrderDetails;
