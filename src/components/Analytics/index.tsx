'use client';

import React, { useEffect, useState } from 'react';
import MetricCard from '@/molecules/MetricCard';
import PercentGrowth from './PercentGrowth';
import { SimpleBtn } from '@/atoms/buttons/Button';
import Fetch from '@/utils/fetch';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { constructQuery } from '@/utils/helpers';
import { registerables, Chart } from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import './analytics.scss';

import {
	OrderChartOptions,
	SalesChartOptions,
	constructOrdersData,
	constructSalesData,
	constructTopOrderData,
	constructTopSellingData,
} from './chart-utils';

Chart.register(...registerables);

const Analytics = () => {
	const router = useRouter();

	const [analytics, setAnalytics] = useState<any>({});
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
	const definedFilter = [
		{ label: '1 day', value: 'day' },
		{ label: '1 week', value: 'week' },
		{ label: '3 months', value: 'month' },
		{ label: '6 months', value: 'month' },
		{ label: '1 year', value: 'year' },
		//{ label: 'custom', value: 'custom' },
	];
	const sQ = useSearchParams();
	const path = usePathname();

	const period = sQ.get('duration') || 'day';

	const getAnalytics = async () => {
		let qS = constructQuery();

		if (!sQ.get('duration')) {
			qS = `?duration=day${qS}`;
		} else {
			qS = `?${qS}`;
		}
		console.log({ qS });
		const response = await Fetch(`/report/analytics${qS}`);

		const data = response?.data;
		setAnalytics(data);

		const sales = constructSalesData(data, period);
		const orders = constructOrdersData(data);

		const topSelling = constructTopSellingData(data);
		const topOrder = constructTopOrderData(data);

		setSalesData(sales);
		setTopSellData(topSelling);
		setOrdersData(orders);
		setTopOrdersData(topOrder);
	};

	useEffect(() => {
		if (period === 'custom') return;
		getAnalytics();
	}, [period]);

	useEffect(() => {
		router.push(`${path}?duration=${dur.value}`);
	}, [dur.label]);

	const onUpdatePeriod = (df: { label: string; value: string }) => {
		setDur(df);
	};

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
			<section className='metric_cards_wrapper'>
				<MetricCard
					title='Total Sales'
					value={
						<PercentGrowth
							amount={`₦${analytics?.totalSales?.totalRevenue || ''}`}
							desc={`${analytics?.totalSales?.percentageIncrease || 0}% increase in the past week`}
						/>
					}
				/>
				<MetricCard
					title='Total Orders'
					value={
						<PercentGrowth
							amount={analytics?.totalOrders?.getPendingOrdersCount || ''}
							desc={`${(analytics?.totalOrders?.percentageIncrease || 0) / 100}% increase in the past week`}
						/>
					}
				/>
				<MetricCard
					title='Total Customers'
					value={<PercentGrowth amount={analytics?.totalCustomers || ''} />}
				/>
				<MetricCard
					title='Average Order Value'
					value={
						<PercentGrowth
							amount={`₦${analytics?.averageOrderValue?.averageOrderValue || ''}`}
							desc={`${analytics?.averageOrderValue?.percentageChange || 0}% increase in the past week`}
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
