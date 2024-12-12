'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import './inventory-table.scss';
import Tag from '@/atoms/Tag';

const InventoryTable = () => {
	const router = useRouter();

	const onNavigate = () => {
		router.push(`/inventory/9`);
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
					<td className='flex items-center'>
						<div className='relative  h-10 w-10 mr-2'>
							<Image src='/assets/image68.png' alt='' fill />
						</div>
						<span>BI21DDC25XD2V</span>
					</td>
					<td>#15285047</td>
					<td>VYGYUFT67</td>
					<td>
						<Tag title='Active' className='completed' />
					</td>
					<td>27/10/2024 2:49PM</td>
				</tr>
				<tr onClick={onNavigate}>
					<td className='flex items-center'>
						<div className='relative  h-10 w-10 mr-2'>
							<Image src='/assets/image68.png' alt='' fill />
						</div>
						<span>BI21DDC25XD2V</span>
					</td>
					<td>#15285047</td>
					<td>VYGYUFT67</td>
					<td>
						<Tag title='Inactive' className='new' />
					</td>
					<td>27/10/2024 2:49PM</td>
				</tr>
				<tr onClick={onNavigate}>
					<td className='flex items-center'>
						<div className='relative  h-10 w-10 mr-2'>
							<Image src='/assets/image68.png' alt='' fill />
						</div>
						<span>BI21DDC25XD2V</span>
					</td>
					<td>#15285047</td>
					<td>VYGYUFT67</td>
					<td>
						<Tag title='Inactive' className='new' />
					</td>
					<td>27/10/2024 2:49PM</td>
				</tr>
			</tbody>
		</table>
	);
};

export default InventoryTable;
