'use client';

import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
//import Search from '@/atoms/input/Search';
//import Button from '@/atoms/buttons/Button';
import PageWrapper from '@/containers/PageWrapper';
import CountCard from '@/atoms/cards/CountCard';
import { CountCardContainer } from '@/containers/CountCardWrapper';
import { useGetAllOrdersQuery } from '@/redux/orders/orders.slice';
import { OrderDets } from '@/redux/orders/orders.type';
import MetricCard from '@/molecules/MetricCard';
import { Input } from '@/atoms/input/Input';
import { SimpleBtn } from '@/atoms/buttons/Button';
import { Icon } from '@/atoms/icon/icon';
import OrdersPage from '@/components/Orders';

const Order: React.FC = () => {
	const [tabs, setTabs] = useState([
		{ name: 'pending', isActive: true },
		{ name: 'processing', isActive: false },
		{ name: 'fulfilled', isActive: false },
	]);
	const [activeTab, setActiveTab] = useState('pending');
	const { data: orderData } = useGetAllOrdersQuery({});
	const [pendingData, setPendingData] = useState<OrderDets[]>();
	const [completeData, setCompleteData] = useState<OrderDets[]>();
	const [processingData, setProcessingData] = useState<OrderDets[]>();

	useEffect(() => {
		if (orderData?.data) {
			const pending: OrderDets[] = [];
			const complete: OrderDets[] = [];
			const processing: OrderDets[] = [];
			orderData.data.orders.forEach(order => {
				if (order.status.toLocaleLowerCase() === 'completed') {
					complete.push(order);
				} else if (order.status.toLocaleLowerCase() === 'pending') {
					pending.push(order);
				} else {
					processing.push(order);
				}
			});

			setPendingData(pending);
			setCompleteData(complete);
			setProcessingData(processing);
		}
	}, [orderData]);

	const getTableData = () => {
		if (activeTab === 'pending') {
			return pendingData;
		}
		if (activeTab === 'processing') {
			return processingData;
		}
		return completeData;
	};

	return <OrdersPage />;
};

export default Order;
