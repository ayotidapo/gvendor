'use client';

import React from 'react';
import { TableComponent } from '@/components/table/Table';
import { Status } from '@/components/cards/StatusTag';
import Dropdown from '@/components/input/dropdown';
import { Icon } from '@/components/icon/icon';
import { format } from 'date-fns';
import { formatCurrency } from '@/helpers';
import { StatusTypes } from '@/types/types';
import { ORDERSTATUS } from '@/utils/constants';
import { OrderDets } from '@/redux/orders/orders.type';
import Link from 'next/link';

const OrderTable = ({ orderData }: { orderData?: OrderDets[] }) => {
	return (
		<div>
			<TableComponent
				headers={[
					'ORDER ID',
					'PRICE',
					'ORDER STATUS',
					'DATE & TIME',
					' ',
					<div
						className='w-full flex justify-end'
						key={`header-controls`}
					></div>,
				]}
				rows={(orderData || []).map(order => ({
					id: order._id,
					content: [
						<Link
							className='text-primary'
							key={order._id}
							href={`order-detail/${order._id}`}
						>
							{order._id}
						</Link>,
						`${formatCurrency(order.price)}`,
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
						`${format(order.date, 'yyyy-MM-dd')}`,
						<Dropdown
							key={`${order._id}-controls`}
							menuButton={
								<Icon svg='ellipses' height={18} width={18} className='' />
							}
							onClickMenuItem={() => {}}
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

export default OrderTable;
