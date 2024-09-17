'use client'

import CountCard from '@/components/cards/CountCard';
import PageWrapper from '@/containers/PageWrapper';
import Button from '@/components/buttons/Button';
import React, { useEffect } from 'react';
import BarChart from '@/components/charts/BarChart';
import SectionCard from '@/components/cards/SectionCard';
import { Header } from '@/components/typography/Header';
import { CountCardContainer } from '@/containers/CountCardWrapper';
import { useGetDashboardSalesValueQuery, useGetDashboardMetricsCountQuery } from '@/redux/dashboard/dashboard.slice';

const unitsSold = [
	{ product: 'Stanley cups', quantity: '30' },
	{ product: 'Fish pie', quantity: '30' },
	{ product: 'Sunscreen', quantity: '30' },
	{ product: 'Table cloth', quantity: '30' },
	{ product: 'Refrigerator', quantity: '30' },
	{ product: 'Cars', quantity: '30' },
];

const data = [
	{ total: 1771001, count: 500 },
	{ total: 713500, count: 100 },
	{ total: 240501, count: 500 },
	{ total: 56500, count: 100 },
	{ total: 0, count: 200 },
	{ total: 411000, count: 200 },
	{ total: 411000, count: 300 },
	{ total: 4110, count: 400 },
	{ total: 41100, count: 300 },
	{ total: 41000, count: 100 },
	{ total: 4000, count: 500 },
	{ total: 411000, count: 200 },
];


const labels = data.map(item => item.total);
const values1 = data.map(item => item.count);

// const labels = metricsData?.data.map(item => item.day) || [];
// const values = metricsData?.data.map(item => item.total) || [];

const HomePage: React.FC = () => {

	const { data: salesValue } = useGetDashboardSalesValueQuery()
	const { data: metricsData } = useGetDashboardMetricsCountQuery({
		startDate: '2024-08-20',
		endDate: '2023-08-07',
	});

	useEffect(() => {
		console.log({ salesValue, metricsData })
	}, [salesValue, metricsData])

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

		   '>
				{/* <div className='grid grid-cols-4 gap-4'> */}
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
				{/* </div> */}
			</CountCardContainer>

			<div
				className='
					grid grid-flow-row
					grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
					gap-10

		   '
			>
				<div>
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
				</div>
				<div>
					<div className=''>
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
					</div>
				</div>
				<div>
					<SectionCard
						header={
							<Header
								className='text-center'
								header={'Top products by units sold'}
							/>
						}
						content={
							<div>
								{unitsSold.map(item => (
									<div
										className='mt-6 flex justify-between'
										key={item.quantity}
									>
										<div>{item.product}</div>
										<div className='text-secondary-black'>{item.quantity}</div>
									</div>
								))}
							</div>
						}
					/>
				</div>
			</div>
		</PageWrapper>
	);
};

export default HomePage;
