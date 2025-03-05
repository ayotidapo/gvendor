'use client';

import Tag from '@/atoms/Tag';
import React from 'react';
import { useRouter } from 'next/navigation';
import { Icon } from '@/atoms/icon/icon';
import './settlement.scss';
import { ObjectData } from '@/utils/interface';
import { format } from 'date-fns';
import { orderStatus } from '@/utils/data';

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
		<>
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
					{settlements.map((stlmnt: ObjectData, i: number) => (
						<tr onClick={() => onNavigate(stlmnt?._id)} key={i}>
							<td>#{stlmnt?.transactionId || 'N/A'}</td>
							<td>#{stlmnt?.order?.orderId || 'N/A'}</td>
							<td>₦{stlmnt?.amount?.toLocaleString()}</td>
							<td>
								<Tag
									title={stlmnt?.status?.toLowerCase()}
									className={orderStatus[stlmnt?.status]}
								/>
							</td>
							<td>{format(stlmnt?.createdAt, 'dd/MM/yyyy hh:mm aa')}</td>
						</tr>
					))}
				</tbody>
			</table>
		</>
	);
};

export default SettlementTable;
