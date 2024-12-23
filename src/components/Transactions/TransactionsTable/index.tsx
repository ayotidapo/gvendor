'use client';

import Tag from '@/atoms/Tag';
import React from 'react';
import './transaction-table.scss';
import { useRouter } from 'next/navigation';

const TransactionsTable = () => {
	const router = useRouter();

	const onNavigate = () => {
		router.push(`/transactions/9`);
	};
	return (
		<table className='table_'>
			<thead>
				<tr className='th_row'>
					<th>TRANSACTION ID</th>
					<th>PAYMENT ID</th>
					<th>AMOUNT SETTLED</th>
					<th>PAYMENT REFERENCE</th>
					<th>DATE & TIME</th>
				</tr>
			</thead>
			<tbody>
				<tr onClick={onNavigate}>
					<td>BI21DDC25XD2V</td>
					<td>#15285047</td>
					<td>VYGYUFT67</td>
					<td>₦95,700.00</td>
					<td>27/10/2024 2:49PM</td>
				</tr>
				<tr onClick={onNavigate}>
					<td>BI21DDC25XD2V</td>
					<td>#15285047</td>
					<td>VYGYUFT67</td>
					<td>₦95,700.00</td>
					<td>27/10/2024 2:49PM</td>
				</tr>
				<tr onClick={onNavigate}>
					<td>BI21DDC25XD2V</td>
					<td>#15285047</td>
					<td>VYGYUFT67</td>
					<td>₦95,700.00</td>
					<td>27/10/2024 2:49PM</td>
				</tr>
			</tbody>
		</table>
	);
};

export default TransactionsTable;
