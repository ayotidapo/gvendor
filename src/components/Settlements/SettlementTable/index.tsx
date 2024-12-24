'use client';

import Tag from '@/atoms/Tag';
import React from 'react';
import { useRouter } from 'next/navigation';
import { Icon } from '@/atoms/icon/icon';
import './settlement.scss';
import { ObjectData } from '@/utils/interface';

interface Props {
	settlements: ObjectData[];
}

const SettlementTable: React.FC<Props> = props => {
	const { settlements } = props;
	const router = useRouter();

	const onNavigate = (id: string) => {
		router.push(`/settlements/${id}`);
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
				{settlement.map((stlmnt: ObjectData, i: number) => (
					<tr onClick={() => onNavigate(stlmnt?._id)} key={i}>
						<td>BI21DDC25XD2V</td>
						<td>#15285047</td>
						<td>₦95,700.00</td>
						<td>
							<Tag title='Successful' className='completed' />
						</td>
						<td>{/* {format(order?.date, 'dd/MM/yyyy hh:mm aa')}*/}</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default SettlementTable;
