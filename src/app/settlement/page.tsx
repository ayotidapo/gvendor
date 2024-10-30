'use client'

import Button from '@/components/buttons/Button';
import ButtonCard from '@/components/cards/ButtonCard';
import { Status } from '@/components/cards/StatusTag';
import { Icon } from '@/components/icon/icon';
import Dropdown from '@/components/input/dropdown';
import { TableComponent } from '@/components/table/Table';
import PageWrapper from '@/containers/PageWrapper';
import { StatusTypes } from '@/types/types';
import { ORDERSTATUS } from '@/utils/constants';
import React from 'react';

const orderData = [
	{
		id: 1,
        accountName: 'Amos Edos Osas',
		status: 'new',
		type: 'success',
		amount: '1000,000,000',
		dateTime: '14/5/2005 3:01PM',
	},
	{
		id: 5,
        accountName: 'Amos Edos Osas',
		status: 'new',
		type: 'success',
		amount: '1000,000,000',
		dateTime: '14/5/2005 3:01PM',
	},
	{
		id: 2,
        accountName: 'Amos Edos Osas',
		status: 'new',
		type: 'success',
		amount: '1000,000,000',
		dateTime: '14/5/2005 3:01PM',
	},
	{
		id: 3,
        accountName: 'Amos Edos Osas',
		status: 'new',
		type: 'success',
		amount: '1000,000,000',
		dateTime: '14/5/2005 3:01PM',
	},
	{
		id: 4,
        accountName: 'Amos Edos Osas',
		status: 'new',
		type: 'success',
		amount: '1000,000,000',
		dateTime: '14/5/2005 3:01PM',
	},
];

const settlementPage: React.FC = () => {
	return (
		<PageWrapper pageHeader={'Settlement History'}>
			<div className='flex flex-col md:flex-row gap-4 items-center justify-between mb-10'>
				<div className='w-full flex justify-end'>
					<div>
						<Button download label='Export CSV' name='outline' />
					</div>
				</div>
            </div>
            <div className='md:w-[580px] pb-8'>
            <ButtonCard
					count={0}
					text={'WALLET BALANCE'}
					isCurrency={false}
					label={'Withdraw'}
					href='/sales/withdraw'
				/>
            </div>
            <div>
            <TableComponent
					headers={[
						'ACCOUNT NAME',
						'AMOUNT',
						'STATUS',
						'DATE & TIME',
						' ',
						<div
							className='w-full flex justify-end'
							key={`header-controls`}
						></div>,
					]}
					rows={orderData.map(order => ({
						id: order.id,
						content: [
							order.accountName,
							order.amount,

							<Status
								text={order.status}
								type={
									(ORDERSTATUS.find(
										status =>
											status.type.toLowerCase() === order.status.toLowerCase()
									)?.type ?? 'warn') as StatusTypes
								}
							/>,
							order.dateTime,
							<Dropdown
								key={`${order.id}-controls`}
								menuButton={
									<Icon svg='ellipses' height={18} width={18} className='' />
								}
								onClickMenuItem={() => {}}
								menuItems={[
									{
										name: (
											<button className='disabled:opacity-30 w-full text-left'>
												Request delivery
											</button>
										),
										value: '',
									},
								]}
							/>,
						],
					}))}
					name='categories-table'
					loading={false}
					isEmpty={false}
				/>
            </div>
		</PageWrapper>
	);
};

export default settlementPage;
