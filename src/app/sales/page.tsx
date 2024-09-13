import React from 'react';
import PageWrapper from '@/containers/PageWrapper';
import Search from '@/components/input/Search';
import Button from '@/components/buttons/Button';
import CountCard from '@/components/cards/CountCard';
import SectionCard from '@/components/cards/SectionCard';
import { Header } from '@/components/typography/Header';
import ButtonCard from '@/components/cards/ButtonCard';
import LineChart from '@/components/charts/LineChart';
import { TableComponent } from '@/components/table/Table';
import { CountCardContainer } from '@/containers/CountCardWrapper';

const data = [
	{
		time: 12,
		total: 1771001,
		count: 500,
	},
	{
		time: 1,
		total: 713500,
		count: 100,
	},
	{
		time: 2,
		total: 240501,
		count: 500,
	},
	{
		time: 3,
		total: 56500,
		count: 100,
	},
	{
		time: 4,
		total: 0,
		count: 200,
	},
	{
		time: 5,
		total: 49000,
		count: 200,
	},
	{
		time: 6,
		total: 411000,
		count: 300,
	},
	{
		time: 7,
		total: 4110,
		count: 400,
	},
	{
		time: 8,
		total: 41100,
		count: 300,
	},
	{
		time: 9,
		total: 41000,
		count: 100,
	},
	{
		time: 10,
		total: 4000,
		count: 500,
	},
	{
		time: 11,
		total: 411000,
		count: 200,
	},
];

const tableData = [
	{
		id: '#15285047',
		method: 'Card',
		amount: 500,
		dateTime: '14/5/2005 3:01PM',
	},
	{
		id: '#15285047',
		method: 'Card',
		amount: 500,
		dateTime: '14/5/2005 3:01PM',
	},
	{
		id: '#15285047',
		method: 'Card',
		amount: 500,
		dateTime: '14/5/2005 3:01PM',
	},
	{
		id: '#15285047',
		method: 'Card',
		amount: 500,
		dateTime: '14/5/2005 3:01PM',
	},
	{
		id: '#15285047',
		method: 'Card',
		amount: 500,
		dateTime: '14/5/2005 3:01PM',
	},
];

const labels = data.map(item => item.total);
const values1 = data.map(item => item.count);

const Sales: React.FC = () => {
	return (
		<PageWrapper pageHeader='Sales'>
			<div className='flex flex-col md:flex-row gap-4 items-center justify-between mb-10'>
				<div className='w-full md:w-auto md:max-w-[400px]'>
					<Search placeholder='Search sales' />
				</div>
				<div className='w-full md:w-auto flex space-x-4'>
					<div>
						<Button label='Today' name='outline' arrow />
					</div>
					<div>
						<Button download label='Export CSV' name='outline' />
					</div>
				</div>
			</div>
			<CountCardContainer>
			<div className='grid grid-cols-1 space-y-7 max-w-lg gap-0'>
				<ButtonCard
					count={0}
					text={'WALLET BALANCE'}
					isCurrency={false}
					label={'Withdraw'}
				/>
				<CountCard count={0} text={'SALES(TODAY)'} isCurrency={false} />
				</div>
				</CountCardContainer>
			<div className='pt-6'>
				<SectionCard
					header={
						<div className=''>
							<Header header={'Sales Chart Today'} />
						</div>
					}
					content={
						<div className='pt-6'>
							<LineChart responsive labels={labels} data={values1} />
						</div>
					}
				/>
			</div>
			<div className='pt-6'>
				<Header className='pl-6' header={'Transaction Breakdown'} />
				<TableComponent
					headers={['ORDER ID', 'PAYMENT METHOD', 'AMOUNT', 'DATE AND TIME']}
					rows={tableData.map(data => ({
						id: data.id,
						content: [data.id, data.method, data.amount, data.dateTime],
					}))}
					name='categories-table'
					loading={false}
					isEmpty={false}
				/>
			</div>
		</PageWrapper>
	);
};

export default Sales;
