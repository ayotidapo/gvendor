'use client';

import Tag from '@/atoms/Tag';
import React from 'react';
import './order-table.scss';
import { useRouter } from 'next/navigation';
import { Icon } from '@/atoms/icon/icon';
import { IOrder } from '@/redux/reducers/orders';
import { format } from 'date-fns';
import { orderStatus } from '@/utils/data';

interface Props {
	orders: IOrder[];
}
const OrdersTable: React.FC<Props> = ({ orders }) => {
	const router = useRouter();

	const onNavigate = (orderId: string) => {
		router.push(`/orders/${orderId}`);
	};
	return (
		<table className='table_  '>
			<thead>
				<tr className='th_row'>
					<th></th>
					<th>ORDER ID</th>
					<th>AMOUNT</th>
					<th>DATE & TIME</th>
					<th>ORDER STATUS</th>
					<th>Actions</th>
				</tr>
			</thead>
			<tbody>
				{orders?.map((order, i) => (
					<tr onClick={() => onNavigate(order?._id)} key={i}>
						<td></td>
						<td>#{order?.orderId}</td>
						<td>₦{order?.price?.toLocaleString()}</td>
						<td>{format(order?.date, 'dd/MM/yyyy hh:mm aa')}</td>
						<td>
							<Tag
								title={order?.status?.toLowerCase()}
								className={`${orderStatus[order?.status]} capitalize`}
							/>
						</td>
						<td onClick={e => e.stopPropagation()}>
							<Icon id='ellipsis' />
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default OrdersTable;
