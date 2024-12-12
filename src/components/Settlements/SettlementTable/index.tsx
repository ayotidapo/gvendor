'use client';

import Tag from '@/atoms/Tag';
import React from 'react';
import { useRouter } from 'next/navigation';
import { Icon } from '@/atoms/icon/icon';
import './settlement.scss';

const SettlementTable = () => {
	const router = useRouter();

	const onNavigate = () => {
		router.push(`/settlements/9`);
	};
	return (
		<table className='table_'>
			<thead>
				<tr className='th_row'>
					<th>TRANSACTION ID</th>
					<th>ORDER ID</th>
					<th>AMOUNT SETTLED</th>
					<th>TRANSACTION STATUS</th>
					<th>DATE & TIME</th>
				</tr>
			</thead>
			<tbody>
				<tr onClick={onNavigate}>
					<td>BI21DDC25XD2V</td>
					<td>#15285047</td>
					<td>₦95,700.00</td>
					<td>
						<Tag title='Successful' className='completed' />
					</td>
					<td>27/10/2024 2:49PM</td>
				</tr>
				<tr onClick={onNavigate}>
					<td>BI21DDC25XD2V</td>
					<td>#15285047</td>
					<td>₦95,700.00</td>
					<td>
						<Tag title='Pending' className='processing' />
					</td>
					<td>27/10/2024 2:49PM</td>
				</tr>
				<tr onClick={onNavigate}>
					<td>BI21DDC25XD2V</td>
					<td>#15285047</td>
					<td>₦95,700.00</td>
					<td>
						<Tag title='Successful' className='completed' />
					</td>
					<td>27/10/2024 2:49PM</td>
				</tr>
			</tbody>
		</table>
	);
};

export default SettlementTable;
