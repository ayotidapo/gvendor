'use client';

import CountCard from '@/components/cards/CountCard';
import PageWrapper from '@/containers/PageWrapper';
import Button from '@/components/buttons/Button';
import React, { useEffect } from 'react';
import { format } from 'date-fns';
import { formatCurrency } from '@/helpers';
import BarChart from '@/components/charts/BarChart';
import SectionCard from '@/components/cards/SectionCard';
import { Header } from '@/components/typography/Header';
import { CountCardContainer } from '@/containers/CountCardWrapper';
import { PaymentTypes, StatusTypes } from '@/types/types';
import {
	useGetDashboardMetricsCountQuery,
	useGetDashboardSalesValueQuery,
} from '@/redux/dashboard/dashboard.slice';
import { useGetInventoryQuery } from '@/redux/inventory/inventory.slice';
import { Icon } from '@/components/icon/icon';
import Dropdown from '@/components/input/dropdown';
import { Status } from '@/components/cards/StatusTag';
import { ORDERSTATUS, PAYMENTSTATUS } from '@/utils/constants';
import { TableComponent } from '@/components/table/Table';
import { useGetAllOrdersQuery } from '@/redux/orders/orders.slice';
import Link from 'next/link';
import DoughnutChart from '@/components/charts/Doughnut';
import CategoryList from './CategoriesList';

const orderData = [
	{
		id: '#15285047',
		status: 'new',
		type: 'success',
		name: 'Ahmed Johnson',
		address: 'West Street, Ikoyi, Lagos',
		dateTime: '14/5/2005 3:01PM',
	},
	{
		id: '#15285047',
		status: 'new',
		type: 'success',
		name: 'Ahmed Johnson',
		address: 'West Street, Ikoyi, Lagos',
		dateTime: '14/5/2005 3:01PM',
	},
	{
		id: '#15285047',
		status: 'new',
		type: 'success',
		name: 'Ahmed Johnson',
		address: 'West Street, Ikoyi, Lagos',
		dateTime: '14/5/2005 3:01PM',
	},
	{
		id: '#15285047',
		status: 'new',
		type: 'success',
		name: 'Ahmed Johnson',
		address: 'West Street, Ikoyi, Lagos',
		dateTime: '14/5/2005 3:01PM',
	},
	{
		id: '#15285047',
		status: 'new',
		type: 'success',
		name: 'Ahmed Johnson',
		address: 'West Street, Ikoyi, Lagos',
		dateTime: '14/5/2005 3:01PM',
	},
];

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

const categories = [
	{
		name: 'Food',
		percentage: 25,
		color: '#F45D2C',
		productCount: 1359,
	},
	{
		name: 'Drinks',
		percentage: 20,
		color: '#F45D2C',
		productCount: 135,
	},
	{
		name: 'Dessert',
		percentage: 15,
		color: '#F45D2C80',
		productCount: 359,
	},
];

const HomePage: React.FC = () => {
	// const { data: metricsData } = useGetDashboardMetricsCountQuery({
	// 	startDate: '2024-08-20',
	// 	endDate: '2023-08-07',
	// });
	// const { data: orderData } = useGetAllOrdersQuery({});
	const labels = data.map(item => item.total);
	const values1 = data.map(item => item.count);
	const { data: inventoryData } = useGetInventoryQuery();
	// const labels = metricsData?.data?.result.map(item => item.day) || [];
	// const values1 = metricsData?.data?.result.map(item => item.total) || [];
	const { data: totalValue } = useGetDashboardSalesValueQuery('');
	const { data: completeValue } = useGetDashboardSalesValueQuery('COMPLETED');
	const { data: pendingValue } = useGetDashboardSalesValueQuery('PENDING');
	const { data: processingValue } =
		useGetDashboardSalesValueQuery('PROCESSING');

	return (
		<PageWrapper pageHeader='Home'>
			<div className='w-full flex justify-end'>
				<div className='pb-10 w-32 '>
					<Button label='Today' name='outline' arrow />
				</div>
			</div>
			<div className='grid grid-row grid-cols-2 gap-5'>
				<div className='my-8 g'>
					<SectionCard
						header={
							<div>
								<Header header={'Total Sales'} />
							</div>
						}
						content={
							<BarChart
								xGridDisplay={true}
								yGridDisplay={false}
								responsive
								labels={labels ?? []}
								data={values1 ?? []}
								barThickness={24}
							/>
						}
					/>
				</div>
				<CountCardContainer
					className='
					grid grid-flow-row
					grid-cols-1 sm:grid-cols-2 lg:grid-cols-2
					gap-10 

		   '
				>
					{/* <CountCard count={totalValue?.data?.totalSaleValue ?? 0} text={'TOTAL ORDER'} isCurrency={false} />
				<CountCard count={completeValue ?.data?.totalSaleValue ?? 0} text={'COMPLETED ORDER'} isCurrency={false} />
				<CountCard count={pendingValue?.data?.totalSaleValue ?? 0} text={'PENDING ORDER'} isCurrency={false} /> */}
					<CountCard
						count={processingValue?.data?.totalSaleValue ?? 0}
						text={'PROCESSING ORDER'}
						isCurrency={false}
					/>
					<CountCard
						count={totalValue?.data?.noOfOrders ?? 0}
						text={'TOTAL ORDER COUNT'}
						isCurrency={false}
					/>
					<CountCard
						count={pendingValue?.data?.noOfOrders ?? 0}
						text={'PENDING ORDER COUNT'}
						isCurrency={false}
					/>
					<CountCard
						count={processingValue?.data?.noOfOrders ?? 0}
						text={'PROCESSING ORDER COUNT'}
						isCurrency={false}
					/>
				</CountCardContainer>
			</div>

			<div
				className='
					grid grid-flow-row
					grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
					gap-10

		   '
			>
				<div className='col-span-2'>
					<SectionCard
						header={
							<div className='space-y-3'>
								<div className=''>
									<Header header={'Sales by Category'} />
								</div>
							</div>
						}
						content={
							<div className='grid grid-cols-2 gap-4 pt-6'>
								<div className='flex flex-col justify-center items-start'>
								<CategoryList categories={categories} />
								</div>
								<div className='pt-6'>
									<DoughnutChart
										data={[300, 50, 100]}
										width={400}
										height={400}
										responsive={true}
									/>
								</div>
							</div>
						}
					/>
				</div>

				<SectionCard
					header={
						<Header
							className='text-center'
							header={'Top products by units sold'}
						/>
					}
					content={
						<div>
							{inventoryData?.data?.inventory?.Products?.map(product => (
								<div className='mt-6 flex justify-between' key={product._id}>
									<div>{product.name}</div>
									<div className='text-secondary-black'>
										{product.unitsSold}
									</div>
								</div>
							))}
						</div>
					}
				/>
			</div>
			<div className='pt-6'>
				<div className='flex justify-between items-center'>
					<div>
						<Header className='pb-4' header={'Recent Orders'} />
					</div>
					<div className='text-default-blue'>
						<Link href={''}>View all</Link>
					</div>
				</div>
				<TableComponent
					headers={[
						'ORDER ID',
						'CUSTOMER NAME',
						'CUSTOMER ADDRESS',
						'PAYMENT STATUS',
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
							order.id,
							order.name,
							order.address,

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

export default HomePage;
