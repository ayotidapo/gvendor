'use client';

import React from 'react';
import CountCard from '@/components/cards/CountCard';
import { TableComponent } from '@/components/table/Table';
import { CountCardContainer } from '@/containers/CountCardWrapper';
import { Status } from '@/components/cards/StatusTag';
import Dropdown from '@/components/input/dropdown';
import { Icon } from '@/components/icon/icon';
import { format } from 'date-fns';
import { formatCurrency } from '@/helpers';
import { PaymentTypes, StatusTypes } from '@/types/types';
import { useGetAllOrdersQuery } from '@/redux/orders/orders.slice';
import { ORDERSTATUS, PAYMENTSTATUS } from '@/utils/constants';
import { useGetPendingOrderQuery, useGetTotalRevenueQuery } from '@/redux/dashboard/dashboard.slice';

const Processing: React.FC = () => {
	const { data: orderData } = useGetAllOrdersQuery({});
	const { data: totalRevenue } = useGetTotalRevenueQuery({ startDate: '2024-09-13', endDate: '2024-09-23' });
	const { data: pendingValue } = useGetPendingOrderQuery({ startDate: '2024-09-13', endDate: '2024-09-23' });



	return (
		<div>
			<CountCardContainer
				className='
							grid grid-flow-row
							grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
							gap-10

				   '
			>
				<CountCard count={totalRevenue?.data?.percentageIncrease ?? 0} text={'TOTAL SALES'} isCurrency={false} />
				<CountCard count={pendingValue?.data?.getPendingOrderCount ?? 0} text={'TOTAL ORDER'} isCurrency={false} />
			</CountCardContainer>

			<TableComponent
				headers={[
					'ORDER ID',
					'PRICE',
					'ORDER STATUS',
					'PAYMENT STATUS',
					'DATE & TIME',
					' ',
					<div
						className='w-full flex justify-end'
						key={`header-controls`}
					></div>,
				]}
				rows={(orderData?.data.docs || []).map(order => ({
					id: order._id,
					content: [
						order._id,
						`${formatCurrency(order.amount)}`,
						<div
							key={order._id}
							className='flex items-center gap-2 overflow-visible'
						>
							<Status
								text={order.status}
								type={
									(ORDERSTATUS.find(
										status =>
											status.orderStatus.toLowerCase() ===
											order.status.toLowerCase()
									)?.type ?? 'warn') as StatusTypes
								}
							/>
						</div>,
						<Status
							key={order._id}
							text={order.paymentStatus}
							type={
								(PAYMENTSTATUS.find(
									status =>
										status.name.toLowerCase() ===
										order.paymentStatus.toLocaleLowerCase()
								)?.type ?? 'fail') as PaymentTypes
							}
						/>,
						`${format(order.createdAt, 'yyyy-mm-dd h:mm:a')}`,
						<Dropdown
							key={`${order._id}-controls`}
							menuButton={
								<Icon svg='ellipses' height={18} width={18} className='' />
							}
							onClickMenuItem={() => { }}
							menuItems={[
								{
									name: (
										<button className='disabled:opacity-30 w-full text-left'>
											Request delivery
										</button>
									),
									value: '',
								},
							]}
						/>,
					],
				}))}
				name='categories-table'
				loading={false}
				isEmpty={false}
			/>
		</div>

	);
};

export default Processing;
