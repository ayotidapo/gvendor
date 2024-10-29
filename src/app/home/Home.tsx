'use client';

import React, { useEffect, useState } from 'react';
import PageWrapper from '@/containers/PageWrapper';
import Button from '@/components/buttons/Button';
import { formatCurrency } from '@/helpers';
import BarChart from '@/components/charts/BarChart';
import SectionCard from '@/components/cards/SectionCard';
import { Header } from '@/components/typography/Header';
import { CountCardContainer } from '@/containers/CountCardWrapper';
import { StatusTypes } from '@/types/types';
import {
	useGetDashboardMetricsCountQuery,
	useGetPendingOrderQuery,
	useGetRecentOrdersQuery,
	useGetSalesQuery,
	useGetTotalProductsQuery,
	useGetTotalRevenueQuery,
	useGetTotalTransactionsQuery,
} from '@/redux/dashboard/dashboard.slice';
// import { useGetInventoryQuery } from '@/redux/inventory/inventory.slice';
import { Status } from '@/components/cards/StatusTag';
import { ORDERSTATUS } from '@/utils/constants';
import { TableComponent } from '@/components/table/Table';
import Link from 'next/link';
import DoughnutChart from '@/components/charts/Doughnut';
import CategoryList from './CategoriesList';
import PercentageCard from '@/components/cards/PercentageCard';

type salesByCat = {
	category: string;
	percentage: number;
	color: string;
	noOfProducts: number;
};

const HomePage: React.FC = () => {
	const { data: metricsData } = useGetDashboardMetricsCountQuery({
		startDate: '2024-09-13',
		endDate: '2024-09-23',
		status: 'COMPLETED',
		duration: 'day',
	});
	// const { data: inventoryData } = useGetInventoryQuery();
	const { data: recentOrder } = useGetRecentOrdersQuery();
	const labels =
		metricsData?.data?.result.map((item: { day: string }) => item.day) || [];
	const values1 =
		metricsData?.data?.result.map((item: { total: number }) => item.total) ||
		[];
	const { data: totalProducts } = useGetTotalProductsQuery();
	const { data: totalRevenue } = useGetTotalRevenueQuery({
		startDate: '2024-09-13',
		endDate: '2024-09-23',
	});
	const { data: salesData } = useGetSalesQuery();
	const { data: pendingValue } = useGetPendingOrderQuery({
		startDate: '2024-09-13',
		endDate: '2024-09-23',
	});
	const { data: totalTransactions } = useGetTotalTransactionsQuery();

	const [salesByCategoryArray, setSalesByCategoryArray] = useState<
		salesByCat[]
	>([]);

	useEffect(() => {
		if (salesData?.data.length) {
			const salesCat = salesData.data.map((cat: salesByCat) => ({
				category: cat.category,
				percentage: cat.percentage,
				color: `rgba(244, 93, 44, ${cat.percentage / 100})`,
				noOfProducts: cat.noOfProducts,
			}));
			setSalesByCategoryArray(salesCat);
		}
	}, [salesData]);

	return (
		<PageWrapper pageHeader='Home'>
			<div className='w-full flex justify-end'>
				<div className='pb-10 w-32 '>
					<Button label='Today' name='outline' arrow />
				</div>
			</div>
			<div className='grid grid-row grid-cols-2 gap-5'>
				<div>
					<SectionCard
						header={
							<div className='mb-4'>
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
				<div>
					<CountCardContainer
						className='
					grid
					grid-cols-1 sm:grid-cols-2 lg:grid-cols-2

		   '
					>
						<PercentageCard
							count={totalTransactions?.data?.totalRevenue ?? 0}
							text={'Total Transactions'}
							isCurrency={true}
							//percentageChange={totalTransactions?.data?.percentageIncrease ?? 0}
							//percentageText={' increase in the past 28 days'}
						/>

						<PercentageCard
							count={totalProducts?.data?.totalRevenue ?? 0}
							text={'Total Products'}
							isCurrency={true}
							//percentageChange={totalProducts?.data?.percentageIncrease ?? 0}
							//percentageText={'increase in the past 28 days'}
						/>
						<PercentageCard
							count={totalRevenue?.data?.totalRevenue ?? 0}
							text={'Total Revenue'}
							isCurrency={true}
							//percentageChange={totalRevenue?.data?.percentageIncrease ?? 0}
							//percentageText={'increase in the past 28 days'}
						/>
						<PercentageCard
							count={pendingValue?.data?.getPendingOrderCount ?? 0}
							text={'Pending Order Count'}
							isCurrency={false}
							//percentageChange={pendingValue?.data?.percentageIncrease ?? 0}
							//percentageText={'increase in the past 28 days'}
						/>
					</CountCardContainer>
				</div>
			</div>

			<div
				className='
					grid grid-flow-row
					grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
					gap-10

		   '
			>
				{salesByCategoryArray.length ? (
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
										<CategoryList categories={salesByCategoryArray} />
									</div>
									<div className='pt-6'>
										<DoughnutChart
											data={salesByCategoryArray.map(cat => cat.percentage)}
											responsive={true}
										/>
									</div>
								</div>
							}
						/>
					</div>
				) : null}

				{/*<SectionCard
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
							)
							)}
						</div>
					}
				/>*/}
			</div>
			<div className='pt-6'>
				<div className='flex justify-between items-center'>
					<div>
						<Header className='pb-4' header={'Recent Orders'} />
					</div>
					<div className='text-default-blue'>
						<Link href={'/orders'}>View all</Link>
					</div>
				</div>
				<TableComponent
					headers={[
						'ORDER ID',
						'ITEMS ORDERED',
						'QUANTITY',
						'STATUS',
						'DATE & TIME',
						'PRICE',
						<div
							className='w-full flex justify-end'
							key={`header-controls`}
						></div>,
					]}
					rows={(recentOrder?.data || []).map(recent => ({
						id: recent._id,
						content: [
							recent._id,
							recent.itemsOrdered,
							recent.quantity,

							<Status
								key={recent._id}
								text={recent.status}
								type={
									(ORDERSTATUS.find(
										status =>
											status?.orderStatus?.toLowerCase() ===
											recent?.status?.toLowerCase()
									)?.type ?? 'warn') as StatusTypes
								}
							/>,
							recent.date,
							`${formatCurrency(recent.price)}`,
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
