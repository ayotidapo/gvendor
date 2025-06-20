'use client';

import Tag from '@/atoms/Tag';
import React from 'react';
import './views-table.scss';
import { useRouter } from 'next/navigation';
import { IOrder } from '@/redux/reducers/orders';
import { format } from 'date-fns';
import { orderStatus } from '@/utils/data';
import { ObjectData } from '@/utils/interface';
import { formatAmount } from '@/utils/helpers';

interface Props {
	topViewedProducts: IOrder[];
}
const OrdersTable: React.FC<Props> = ({ topViewedProducts }) => {
	const router = useRouter();

	return (
		<table className='table_ '>
			<thead>
				<tr className='th_row'>
					<th>ITEM NAME</th>
					<th>PRICE</th>
					<th>VIEWS</th>
					<th>STATUS</th>
				</tr>
			</thead>
			<tbody>
				{topViewedProducts?.map((item: ObjectData, i) => {
					return (
						<tr key={i}>
							<td>{item?.product?.name}</td>
							<td>&#8358;{formatAmount(item?.product?.price)}</td>
							<td>{item?.viewCount}</td>
							<td>
								<Tag
									title={item?.product?.isActive ? 'active' : 'inactive'}
									className={item?.product?.isActive ? 'completed' : 'new'}
								/>
							</td>
						</tr>
					);
				})}
			</tbody>
		</table>
	);
};

export default OrdersTable;
