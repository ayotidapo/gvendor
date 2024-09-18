'use client';

import React from 'react';
import PageWrapper from '@/containers/PageWrapper';
import Search from '@/components/input/Search';
import Button from '@/components/buttons/Button';
import CountCard from '@/components/cards/CountCard';
import { TableComponent } from '@/components/table/Table';
import { CountCardContainer } from '@/containers/CountCardWrapper';
import { Status } from '@/components/cards/StatusTag';
import Dropdown from '@/components/input/dropdown';
import { Icon } from '@/components/icon/icon';
import { formatCurrency } from '@/helpers';
import { StatusTypes } from '@/types/types';

const tableData = [
	{
		id: '1',
		price: 100,
		orderStatus: 'Fulfilled',
		type: 'success',
		paymentStatus: 'Paid',
		dateTime: '2021-09-10 12:00:00',
	},
	{
		id: '2',
		price: 200,
		orderStatus: 'Processing',
		type: 'warn',
		paymentStatus: 'Unpaid',
		dateTime: '2021-09-10 12:00:00',
	},
	{
		id: '3',
		price: 300,
		orderStatus: 'Processing',
		type: 'warn',
		paymentStatus: 'Paid',
		dateTime: '2021-09-10 12:00:00',
	},
	{
		id: '4',
		price: 400,
		orderStatus: 'New',
		type: 'fail',
		paymentStatus: 'Paid',
		dateTime: '2021-09-10 12:00:00',
	},
	{
		id: '5',
		price: 500,
		orderStatus: 'Delivered',
		type: 'success',
		paymentStatus: 'Paid',
		dateTime: '2021-09-10 12:00:00',
	},
];

const Orders: React.FC = () => {
	return (
		<PageWrapper pageHeader='Orders'>
			<div className='flex flex-col md:flex-row gap-4 items-center justify-between mb-10'>
				<div className='w-full md:w-auto md:max-w-[400px]'>
					<Search placeholder='Search orders' />
				</div>
				<div className='w-full md:w-auto'>
					<Button filter label='Order Status' name='outline' />
				</div>
			</div>

			<CountCardContainer
				className='
							grid grid-flow-row
							grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
							gap-10

				   '
			>
				<CountCard count={0} text={'TOTAL SALES'} isCurrency={false} />
				<CountCard count={0} text={'TOTAL ORDER'} isCurrency={false} />
			</CountCardContainer>

			<TableComponent
				headers={[
					'ORDER ID',
					'PRICE',
					'ORDER STATUS',
					'PAYMENT STATUS',
					'DATE & TIME',
					' ',
					<div
						className='w-full flex justify-end'
						key={`header-controls`}
					></div>,
				]}
				rows={tableData.map(data => ({
					id: data.id,
					content: [
						data.id,
						`${formatCurrency(data.price)}`,
						<div
							key={data.id}
							className='flex items-center gap-2 overflow-visible'
						>
							<Status type={data.type as StatusTypes} text={data.orderStatus} />
						</div>,
						<Status
							key={data.id}
							text={data.paymentStatus ? 'Unpaid' : 'Paid'}
							type={data.paymentStatus ? 'fail' : 'success'}
						/>,
						data.dateTime,
						<Dropdown
							key={`${data.id}-controls`}
							menuButton={
								<Icon svg='ellipses' height={18} width={18} className='' />
							}
							onClickMenuItem={() => { }}
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
		</PageWrapper>
	);
};

export default Orders;
