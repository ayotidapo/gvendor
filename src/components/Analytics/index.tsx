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
import 'react-datepicker/dist/react-datepicker.css';
import './analytics.scss';

Chart.register(...registerables);

const Analytics = () => {
	const router = useRouter();
	const dispatch = useDispatch();
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

	const [dur, setDur] = useState({ label: '1 day', value: 'day' });

	const [date, setDate] = useState<DateValueType>({
		startDate: null,
		endDate: null,
	});

	const sQ = useSearchParams();
	const path = usePathname();

	const period = sQ.get('duration') || '';

	const onGetAnalytics = async () => {
		try {
			let qS = constructQuery();

			if (!sQ.get('duration')) {
				qS = `?duration=day${qS}`;
			} else {
				qS = `?${qS}`;
			}
			const action = await dispatch(getAnalytics(qS));

			if (getAnalytics.fulfilled.match(action)) {
				const data = action?.payload?.data;

				const sales = constructSalesData(data, period);
				const orders = constructOrdersData(data, period);

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
		if (period === 'custom' && !date?.startDate && !date?.endDate) return;
		onGetAnalytics();
	}, [period, date?.startDate, date?.endDate]);

	useEffect(() => {
		if (dur.value === 'custom' && date?.startDate && date?.endDate)
			router.push(
				`${path}?startDate=${date?.startDate?.toISOString()}&endDate=${date?.endDate?.toISOString()}`
			);
		if (dur.value !== 'custom') router.push(`${path}?duration=${dur.value}`);
	}, [dur.label, date?.startDate, date?.endDate]);

	const onUpdatePeriod = (df: { label: string; value: string }) => {
		setDur(df);
	};

	if (analytics.loading) return <LoadingPage />;

	return (
		<div className='analytics'>
			<div className='page-title_div '>
				<h2 className='title'>Analytics</h2>
			</div>
			<div className='period_filter'>
				{definedFilter.map(df => (
					<SimpleBtn
						className={df.label === dur.label ? 'active' : ''}
						onClick={() => onUpdatePeriod(df)}
						key={df.label}
					>
						{df.label}
					</SimpleBtn>
				))}
			</div>

			<Datepicker
				containerClassName={cx('dp__wrapper', {
					show__dp: dur?.value === 'custom',
				})}
				popoverDirection='down'
				value={date}
				onChange={newValue => {
					console.log(newValue);
					setDate(newValue);
				}}
				showShortcuts={true}
				displayFormat='DD-MM-YYYY'
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
								analytics?.totalOrders?.getPendingOrdersCount?.toLocaleString() ||
								''
							}
							desc={`${(analytics?.totalOrders?.percentageIncrease || 0) / 100}% increase in the past week`}
						/>
					}
				/>
				<MetricCard
					title='Total Customers'
					value={
						<PercentGrowth
							amount={analytics?.totalCustomers?.toLocaleString() || ''}
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

// const initDataSource = {
// 	chart: {
// 		caption: '',
// 		yaxisname: 'Orders',
// 		anchorradius: '5',
// 		plottooltext: '$label \n <b>$dataValue orders</b>',
// 		showhovereffect: '1',
// 		showToolTipShadow: '1',
// 		useSmartLabels: '1',
// 		toolTipPosition: 'bottom',
// 		showBorder: '0',
// 		showvalues: '0',
// 		bgColor: '#ffffff',
// 		numbersuffix: '',
// 		lineColor: '#FF5733',
// 		theme: 'umber',
// 		showAlternateHGridColor: '0', // Disable alternate horizontal grid lines
// 		showAlternateVGridColor: '0', // Disable alternate vertical grid lines

// 		numVDivLines: '10',
// 		vDivLineColor: '#cccccc',
// 		vDivLineThickness: '1',
// 		vDivLineAlpha: '50',

// 		drawAnchors: '1', // Enable anchors (dots)
// 		anchorBgColor: '#FF5733',
// 		anchorHoverColor: '#FF5733',
// 		palettecolors: '#72D7B2',

// 		borderColor: '#FFFFFF', // Set border color to white (if you want to keep the space)
// 		borderThickness: '0',
// 	},
// 	data: [],
// };
