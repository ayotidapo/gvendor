'use client';

import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
//import Search from '@/components/input/Search';
//import Button from '@/components/buttons/Button';
import PageWrapper from '@/containers/PageWrapper';
import CountCard from '@/components/cards/CountCard';
import { CountCardContainer } from '@/containers/CountCardWrapper';
import { useGetAllOrdersQuery } from '@/redux/orders/orders.slice';
import { OrderDets } from '@/redux/orders/orders.type';
import OrderTable from './OrderTable';

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

	return (
		<PageWrapper pageHeader='Orders'>
			<div>
				<div className='bg-white rounded-md '>
					{/*<div className='flex flex-col md:flex-row gap-4 items-center justify-between mb-10'>
						<div className='w-full md:w-auto md:max-w-[400px]'>
							<Search placeholder='Search orders' />
						</div>
						<div className='w-full md:w-auto'>
							<Button filter label='Order Status' name='outline' />
						</div>
					</div>*/}
					<CountCardContainer
						className='
							grid grid-flow-row
							grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
							gap-10
							my-10
				   '
					>
						<CountCard
							count={orderData?.data?.totalSales ?? 0}
							text={'TOTAL SALES'}
							isCurrency={true}
						/>
						<CountCard
							count={orderData?.data?.totalOrders ?? 0}
							text={'TOTAL ORDER'}
							isCurrency={false}
						/>
					</CountCardContainer>

					<div className='border-b mb-10 border-gray-200'>
						<nav className='-mb-px flex space-x-8' aria-label='Tabs'>
							{tabs.map(tab => (
								<button
									onClick={() => {
										setTabs(
											tabs.map(t => ({
												...t,
												isActive: t.name === tab.name,
											}))
										);
										setActiveTab(tab.name);
									}}
									key={tab.name}
									className={clsx(
										tab.isActive
											? 'border-black text-black'
											: 'border-transparent text-default-gray hover:border-gray-300 hover:text-gray-700',
										'whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium capitalize'
									)}
									aria-current={tab.isActive ? 'page' : undefined}
								>
									{tab.name}
								</button>
							))}
						</nav>
					</div>

					<OrderTable orderData={getTableData()} />
				</div>
			</div>
		</PageWrapper>
	);
};

export default Order;
