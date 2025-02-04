'use client';

import Tag from '@/atoms/Tag';
import React from 'react';
import './under-review.scss';
import { useRouter } from 'next/navigation';
import { ObjectData } from '@/utils/interface';
import { Icon } from '@/atoms/icon/icon';

interface Props {
	variants: { _id: string; value: string; price: number; variant: string }[];
}

const UnderReviewTable: React.FC<Props> = ({ variants }) => {
	const router = useRouter();

	const onNavigate = () => {
		//router.push(`/transactions/9`);
	};
	return (
		<table className='table_'>
			<thead>
				<tr className='th_row'>
					<th>VARIANT NAME</th>
					<th>VARIANT TYPE</th>
					<th>PRICE</th>
					<th>QUANTITY IN STOCK</th>
					<th>STATUS</th>
					<th>ACTIONS</th>
				</tr>
			</thead>
			<tbody>
				{variants?.map((vart: ObjectData, i: number) => (
					<tr onClick={onNavigate} key={i}>
						<td>{vart?.name || 'N/A'}</td>
						<td>{vart?.value}</td>
						<td>{vart?.price}</td>
						<td>{vart?.inStock || 'N/A'}</td>
						<td>
							{vart?.status ? (
								<Tag title={vart?.status} className='processing' />
							) : (
								'N/A'
							)}
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

export default UnderReviewTable;
