'use client';

import React, { useEffect, useState } from 'react';
import cx from 'classnames';
import MetricCard from '@/molecules/MetricCard';
import PercentGrowth from './PercentGrowth';
import { SimpleBtn } from '@/atoms/buttons/Button';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Datepicker, { DateValueType } from 'react-tailwindcss-datepicker';
import { constructQuery } from '@/utils/helpers';
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
import './analytics.scss';
import { differenceInDays, subMonths } from 'date-fns';
import { ObjectData } from '@/utils/interface';

Chart.register(...registerables);

const Analytics = () => {
	const router = useRouter();
	const dispatch = useDispatch();

	const sQ = useSearchParams();
	const path = usePathname();

	const duration = sQ.get('duration') || 'day';
	const startDate = sQ.get('startDate') || '';
	const endDate = sQ.get('endDate') || '';

	const { ...analytics } = useSelector(state => state.analytics);

	const [showSales, setShowSales] = useState(true);

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
					title='Total Sales'
					value={
						<PercentGrowth
							amount={`₦${analytics?.totalSales?.totalRevenue?.toLocaleString() || ''}`}
							desc={`${(analytics?.totalSales?.percentageIncrease || 0) / 100}% increase in the past week`}
						/>
					}
				/>
				<MetricCard
					title='Total Orders'
					value={
						<PercentGrowth
							amount={
								analytics?.totalOrders?.ordersCount?.toLocaleString() || ''
							}
							desc={`${(analytics?.totalOrders?.percentageIncrease || 0) / 100}% increase in the past week`}
						/>
					}
				/>
				<MetricCard
					title='Total Customers'
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
					value={
						<PercentGrowth
							amount={`₦${analytics?.averageOrderValue?.averageOrderValue?.toLocaleString() || ''}`}
							desc={`${(analytics?.averageOrderValue?.percentageChange || 0) / 100}% increase in the past week`}
						/>
					}
				/>
			</section>
			<div className='tabs_div'>
				<SimpleBtn
					className={showSales ? 'active' : ''}
					onClick={() => setShowSales(true)}
				>
					Sales (₦)
				</SimpleBtn>
				<SimpleBtn
					className={!showSales ? 'active' : ''}
					onClick={() => setShowSales(false)}
				>
					Order volume
				</SimpleBtn>
			</div>
			{showSales ? (
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
			) : (
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
		</div>
	);
};

export default Analytics;
