'use client';

import React, { useEffect, useState } from 'react';
import cx from 'classnames';
import MetricCard from '@/molecules/MetricCard';
import PercentGrowth from './PercentGrowth';
import { SimpleBtn } from '@/atoms/buttons/Button';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Datepicker, { DateValueType } from 'react-tailwindcss-datepicker';
import { constructQuery, formatAmount } from '@/utils/helpers';
import { registerables, Chart } from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';

import {
	OrderChartOptions,
	SalesChartOptions,
	constructOrdersData,
	constructSalesData,
	constructTopOrderData,
	constructTopSellingData,
} from './chart-utils';
import { useDispatch, useSelector } from '@/redux/hooks';
import { getAnalytics } from '@/redux/apis/analytics';
import { toast } from 'react-toastify';
import LoadingPage from '@/molecules/LoadingPage';
import { definedFilter } from '@/utils/data';
import { differenceInDays, subMonths } from 'date-fns';
import { ObjectData } from '@/utils/interface';
import './analytics.scss';
import ViewsTable from './ViewsTable';
import Pagination from '@/molecules/Pagination';
import { Serializer } from 'v8';

Chart.register(...registerables);

interface Props {
	metrics: ObjectData;
	topViewedProducts: ObjectData;
}

const Analytics: React.FC<Props> = props => {
	const router = useRouter();
	const dispatch = useDispatch();
	const limit = 20;
	const sQ = useSearchParams();
	const path = usePathname();
	console.log({ u: props.topViewedProducts });
	const duration = sQ.get('duration') || 'day';
	const startDate = sQ.get('startDate') || null;
	const endDate = sQ.get('endDate') || null;
	const page = sQ.get('page') || 1;

	const { ...analytics } = useSelector(state => state.analytics);

	const [tab, setTab] = useState('sales');

	const [salesData, setSalesData] = useState<any>({
		datasets: [],
	});

	const [topSellData, setTopSellData] = useState<any>({
		datasets: [],
	});
	const [ordersData, setOrdersData] = useState<any>({
		datasets: [],
	});
	const [topOrderData, setTopOrdersData] = useState<any>({
		datasets: [],
	});

	const [date, setDate] = useState<DateValueType>({
		startDate: startDate ? new Date(startDate) : null,
		endDate: endDate ? new Date(endDate) : null,
	});

	const [durObj, setDurObj] = useState<ObjectData>({});

	const onGetAnalytics = async () => {
		try {
			let qS = constructQuery();

			qS = `?${qS}`;

			const action = await dispatch(getAnalytics(qS));

			if (getAnalytics.fulfilled.match(action)) {
				const data = action?.payload?.data;

				const sales = constructSalesData(data, duration);
				const orders = constructOrdersData(data, duration);

				const topSelling = constructTopSellingData(data);
				const topOrder = constructTopOrderData(data);

				setSalesData(sales);
				setTopSellData(topSelling);
				setOrdersData(orders);
				setTopOrdersData(topOrder);
			} else if (getAnalytics.rejected.match(action)) {
				toast.error(`Error: ${action?.error?.message}`);
			}
		} catch (e: any) {
			toast.error(`Error: ${e?.message}`);
		}
	};

	useEffect(() => {
		onGetAnalytics();
	}, [duration, startDate, endDate]);

	useEffect(() => {
		if (durObj?.value === 'custom') document.getElementById('date_')?.focus();

		if (date?.startDate && date?.endDate)
			router.push(
				`${path}?startDate=${date?.startDate?.toISOString()}&endDate=${date?.endDate?.toISOString()}&duration=${duration}`
			);
		else router.push(`${path}?duration=${durObj?.value || 'day'}`);
	}, [durObj?.value, date?.startDate, date?.endDate]);

	const onSetDuration = (durObj: { label: string; value: string }) => {
		setDate({ startDate: null, endDate: null });
		setDurObj(durObj);
	};

	const onChangeDate = (newValue: DateValueType) => {
		const customDays = Math.abs(
			differenceInDays(newValue?.startDate as Date, newValue?.endDate as Date)
		);
		if (customDays > 365)
			return toast.error(`Custom filter above ONE YEAR is not allowed`);
		setDate(newValue);
	};

	const onPageChange = (page: { selected: number }) => {
		const { selected } = page;
		router.push(`${path}?page=${selected + 1}`);
	};

	const { totalRevenue, topViewed, totalSold, totalProducts } = props?.metrics;
	const len = props.topViewedProducts?.products?.length;
	if (analytics.loading) return <LoadingPage />;

	return (
		<div className='analytics'>
			<div className='page-title_div '>
				<h2 className='title'>Analytics</h2>
			</div>
			<div className='period_filter'>
				{definedFilter.map(durObj => (
					<SimpleBtn
						className={duration === durObj.value ? 'active' : ''}
						onClick={() => onSetDuration(durObj)}
						key={durObj.label}
					>
						{durObj.label}
					</SimpleBtn>
				))}
			</div>
			<Datepicker
				containerClassName={cx('dp__wrapper', {
					show__dp: duration === 'custom',
				})}
				popoverDirection='down'
				inputId='date_'
				value={date}
				onChange={onChangeDate}
				showShortcuts={true}
				displayFormat='MMM D, YYYY'
				startFrom={subMonths(new Date(), 2)}
				maxDate={new Date()}
			/>
			<section className='metric_cards_wrapper'>
				<MetricCard
					title='Total Settled Amount'
					iconDesc='Amount paid to your account after Good’s commission is deducted.'
					value={
						<PercentGrowth
							amount={`₦${totalRevenue?.toLocaleString() || ''}`}
							desc={`${(Math.abs(analytics?.totalSales?.percentageIncrease) || 0).toFixed(2)}% ${analytics?.totalSales?.growth} in the past week`}
							className={analytics?.totalSales?.growth}
						/>
					}
				/>

				<MetricCard
					title='Total Orders'
					iconDesc='Number of completed sales.'
					value={
						<PercentGrowth
							amount={
								analytics?.totalOrders?.ordersCount?.toLocaleString() || ''
							}
							desc={`${(Math.abs(analytics?.totalOrders?.percentageIncrease) || 0).toFixed(2)}%  ${analytics?.totalOrders?.percentageIncrease > 0 ? 'increase' : 'decrease'} in the past week`}
							className={analytics?.totalOrders?.growth}
						/>
					}
				/>
				<MetricCard
					title='Total Customers'
					iconDesc='Number of unique buyers.'
					value={
						<PercentGrowth
							amount={
								analytics?.totalCustomers?.totalNoOfCustomers?.toLocaleString() ||
								''
							}
						/>
					}
				/>
				<MetricCard
					title='Average Order Value'
					iconDesc='This is the average amount each customer spends per order'
					value={
						<PercentGrowth
							amount={`₦${formatAmount(analytics?.averageOrderValue?.averageOrderValue) || ''}`}
							desc={`${(Math.abs(analytics?.averageOrderValue?.percentageChange) || 0).toFixed(2)}%  ${analytics?.averageOrderValue?.percentageChange > 0 ? 'increase' : 'decrease'} in the past week`}
							className={analytics?.averageOrderValue?.growth}
						/>
					}
				/>
				<MetricCard
					title='Active Product'
					iconDesc='Product bought by customers'
					value={
						<>
							{totalSold?.toLocaleString() || 0}/
							{totalProducts?.toLocaleString() || 0}
						</>
					}
				/>
			</section>
			<div className='tabs_div'>
				<SimpleBtn
					className={tab === 'sales' ? 'active' : ''}
					onClick={() => setTab('sales')}
				>
					Sales (₦)
				</SimpleBtn>
				<SimpleBtn
					className={tab === 'orders' ? 'active' : ''}
					onClick={() => setTab('orders')}
				>
					Order volume
				</SimpleBtn>
				<SimpleBtn
					className={tab === 'views' ? 'active' : ''}
					onClick={() => setTab('views')}
				>
					Views
				</SimpleBtn>
			</div>
			<section className='mt-10'>
				{tab === 'sales' && (
					<>
						<section className='graph_div'>
							<h2 className='title_h'>Sales</h2>
							<Line data={salesData} options={SalesChartOptions} />
						</section>
						<section className='graph_div'>
							<h2 className='title_h'>Top Selling Items</h2>
							<Bar data={topSellData} options={SalesChartOptions} />;
						</section>
					</>
				)}
				{tab === 'orders' && (
					<>
						<section className='graph_div'>
							<h2 className='title_h'>Orders</h2>

							<Line data={ordersData} options={OrderChartOptions} />
						</section>
						<section className='graph_div'>
							<h2 className='title_h'>Most Ordered Items</h2>
							<Bar data={topOrderData} options={OrderChartOptions} />;
						</section>
					</>
				)}
				{tab === 'views' && (
					<>
						{len < 1 && !analytics.loading && (
							<h2 className='empty__state'>No data to display</h2>
						)}

						<section className='table_wrapper'>
							<ViewsTable
								topViewedProducts={props.topViewedProducts?.products}
							/>
						</section>
						<Pagination
							onPageChange={onPageChange}
							page={Number(page)}
							limit={limit}
							totalItems={props.topViewedProducts?.products?.length} // this will still change to totalItem or count
							curItemsLen={len}
						/>
					</>
				)}
			</section>
		</div>
	);
};

export default Analytics;
