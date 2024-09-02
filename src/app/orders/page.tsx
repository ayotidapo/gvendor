import React from 'react';
import PageWrapper from '@/containers/PageWrapper';
import Search from '@/components/input/Search';
import Button from '@/components/buttons/Button';
import CountCard from '@/components/cards/CountCard';
import { TableComponent } from '@/components/table/Table';

const tableData = [
	{
		id: '1',
		price: '$100',
		orderStatus: 'Delivered',
		paymentStatus: 'Paid',
		dateTime: '2021-09-10 12:00:00',
	},
	{
		id: '2',
		price: '$200',
		orderStatus: 'Pending',
		paymentStatus: 'Unpaid',
		dateTime: '2021-09-10 12:00:00',
	},
	{
		id: '3',
		price: '$300',
		orderStatus: 'Processing',
		paymentStatus: 'Paid',
		dateTime: '2021-09-10 12:00:00',
	},
	{
		id: '4',
		price: '$400',
		orderStatus: 'Delivered',
		paymentStatus: 'Paid',
		dateTime: '2021-09-10 12:00:00',
	},
	{
		id: '5',
		price: '$500',
		orderStatus: 'Delivered',
		paymentStatus: 'Paid',
		dateTime: '2021-09-10 12:00:00',
	},
];

const Orders: React.FC = () => {
	return (
		<PageWrapper pageHeader='Orders'>
			<div className='pb-10 flex justify-between'>
				<div>
					<Search placeholder='Search orders' />
				</div>
				<div className=''>
					<Button filter label='Order Status' name='outline' />
				</div>
			</div>
			<div className='grid grid-cols-4 gap-4'>
				<CountCard count={0} text={'TOTAL SALES'} isCurrency={false} />
				<CountCard count={0} text={'TOTAL ORDER'} isCurrency={false} />
			</div>
			<TableComponent
				headers={[
					'ORDER ID',
					'PRICE',
					'ORDER STATUS',
					'PAYMENT STATUS',
					'DATE & TIME',
				]}
				rows={tableData.map(data => ({
					id: data.id,
					content: [
						data.id,
						data.price,
						data.orderStatus,
						data.paymentStatus,
						data.dateTime,
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
