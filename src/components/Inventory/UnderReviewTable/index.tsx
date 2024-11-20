'use client';

import Tag from '@/atoms/Tag';
import React from 'react';
import './under-review.scss';
import { useRouter } from 'next/navigation';

const UnderReviewTable = () => {
	const router = useRouter();

	const onNavigate = () => {
		router.push(`/transaction/9`);
	};
	return (
		<table className='table_'>
			<thead>
				<tr className='th_row'>
					<th>ITEM NAME</th>
					<th>PRICE</th>
					<th>QUANTITY IN STOCK</th>
					<th>STATUS</th>
					<th>ACTIONS</th>
				</tr>
			</thead>
			<tbody>
				<tr onClick={onNavigate}>
					<td>BI21DDC25XD2V</td>
					<td>#15285047</td>
					<td>VYGYUFT67</td>
					<td>
						<Tag title='Pending' className='processing' />
					</td>
					<td>27/10/2024 2:49PM</td>
				</tr>
				<tr onClick={onNavigate}>
					<td>BI21DDC25XD2V</td>
					<td>#15285047</td>
					<td>VYGYUFT67</td>
					<td>
						<Tag title='Declined' className='new' />
					</td>
					<td>27/10/2024 2:49PM</td>
				</tr>
				<tr onClick={onNavigate}>
					<td>BI21DDC25XD2V</td>
					<td>#15285047</td>
					<td>VYGYUFT67</td>
					<td>
						<Tag title='Approved' className='completed' />
					</td>
					<td>27/10/2024 2:49PM</td>
				</tr>
			</tbody>
		</table>
	);
};

export default UnderReviewTable;
