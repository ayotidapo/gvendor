'use client';

import CountCard from '@/components/cards/CountCard';
import PageWrapper from '@/containers/PageWrapper';
import Button from '@/components/buttons/Button';
import React from 'react';
import BarChart from '@/components/charts/BarChart';
import SectionCard from '@/components/cards/SectionCard';
import { Header } from '@/components/typography/Header';
import { CountCardContainer } from '@/containers/CountCardWrapper';
import {
	useGetDashboardMetricsCountQuery,
	// useGetDashboardSalesValueQuery,
	//useGetRecentOrdersQuery,
	useGetTopSellersQuery,
} from '@/redux/dashboard/dashboard.slice';
import { useGetInventoryQuery } from '@/redux/inventory/inventory.slice';

const HomePage: React.FC = () => {
	//const { data: salesValue } = useGetDashboardSalesValueQuery();
	const { data: metricsData } = useGetDashboardMetricsCountQuery({
		startDate: '2024-08-20',
		endDate: '2023-08-07',
	});
	const { data: inventoryData } = useGetInventoryQuery();
	// const { data: recentOrders } = useGetRecentOrdersQuery();

	const labels = metricsData?.data?.result.map(item => item.day) || [];
	const values1 = metricsData?.data?.result.map(item => item.total) || [];

	//useEffect(() => {
	//	console.log({ salesValue, topSellers,metricsData, recentOrders});
	//}, [salesValue, topSellers,metricsData, recentOrders]);

	// const sales = { salesValue?.data }

	return (
		<PageWrapper pageHeader='Home'>
			<div className='w-full flex justify-end'>
				<div className='pb-10 w-32 '>
					<Button label='Today' name='outline' arrow />
				</div>
			</div>
			<CountCardContainer
				className='
					grid grid-flow-row
					grid-cols-1 sm:grid-cols-2 lg:grid-cols-4
					gap-10

		   '
			>
				<CountCard count={0} text={'TOTAL ORDER'} isCurrency={false} />
				<CountCard count={0} text={'COMPLETED ORDER'} isCurrency={false} />
				<CountCard count={0} text={'PENDING ORDER'} isCurrency={false} />
				<CountCard count={0} text={'PROCESSING ORDER'} isCurrency={false} />
				<CountCard count={0} text={'TOTAL ORDER COUNT'} isCurrency={false} />
				<CountCard count={0} text={'PENDING ORDER COUNT'} isCurrency={false} />
				<CountCard
					count={0}
					text={'PROCESSING ORDER COUNT'}
					isCurrency={false}
				/>
			</CountCardContainer>

			<div
				className='
					grid grid-flow-row
					grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
					gap-10

		   '
			>
				<SectionCard
					header={
						<div className='space-y-3'>
							<div className=''>
								<Header header={'Total Orders'} />
							</div>
							<div className=''>320</div>
						</div>
					}
					content={
						<div>
							<div className='pt-6'>
								<BarChart
									responsive
									labels={labels}
									data={values1}
									barThickness={5}
									yGridDisplay={true}
								/>
							</div>
							<div className='flex flex-col md:flex-row gap-4 items-center justify-between'>
								<div>
									<Button
										label='View detailed report'
										name='transparent'
										right
									/>
								</div>
								<div className=''>
									<span className=''>20 Aug</span>
								</div>
							</div>
						</div>
					}
				/>

				<SectionCard
					header={
						<div className='flex space-x-6'>
							<div className='flex pb-8 flex-col md:flex-row gap-4 items-center justify-between'>
								<Header header={'Sales Analysis'} />
							</div>
							<div className=''>
								<Button label='Today' name='outline' arrow />
							</div>
						</div>
					}
					content={
						<div>
							<div className=''>
								<BarChart
									responsive
									labels={labels}
									data={values1}
									barThickness={5}
									yGridDisplay={true}
								/>
							</div>
							<div className='flex flex-col md:flex-row gap-4 items-center justify-between'>
								<div className=''>
									<Button
										label='View detailed report'
										name='transparent'
										right
									/>
								</div>
								<div className=''>
									<span className=''>20 Aug</span>
								</div>
							</div>
						</div>
					}
				/>

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
		</PageWrapper>
	);
};

export default HomePage;
