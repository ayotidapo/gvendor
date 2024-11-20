import Tag from '@/atoms/Tag';
import React from 'react';
import './order-table.scss';
import { useRouter } from 'next/navigation';
import { Icon } from '@/atoms/icon/icon';

const OrdersTable = () => {
	const router = useRouter();

	const onNavigate = () => {
		router.push(`/orders/9`);
	};
	return (
		<table className='table_'>
			<thead>
				<tr className='th_row'>
					<th>_</th>
					<th>ORDER ID</th>
					<th>AMOUNT</th>
					<th>DATE & TIME</th>
					<th>ORDER STATUS</th>
					<th>Actions</th>
				</tr>
			</thead>
			<tbody>
				<tr onClick={onNavigate}>
					<td>_</td>
					<td>#15285058</td>
					<td>₦48,500.00</td>
					<td>27/10/2024 3:01PM</td>
					<td>
						<Tag title='New' className='new' />
					</td>
					<td onClick={e => e.stopPropagation()}>
						<Icon id='ellipsis' />
					</td>
				</tr>
				<tr>
					<td>_</td>
					<td>#15285058</td>
					<td>₦48,500.00</td>
					<td>27/10/2024 3:01PM</td>
					<td>
						<Tag title='New' className='new' />
					</td>
					<td></td>
				</tr>
				<tr>
					<td>_</td>
					<td>#15285058</td>
					<td>₦48,500.00</td>
					<td>27/10/2024 3:01PM</td>
					<td>
						<Tag title='New' className='new' />
					</td>
					<td></td>
				</tr>
			</tbody>
		</table>
	);
};

export default OrdersTable;
