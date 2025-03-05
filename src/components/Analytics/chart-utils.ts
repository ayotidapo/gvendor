import { ObjectData } from '@/utils/interface';
import { ChartOptions } from 'chart.js';

import { format } from 'date-fns';

export const SalesChartOptions: ChartOptions<any> = {
	responsive: true,

	plugins: {
		tooltip: {
			callbacks: {
				title: (tooltipItems: ObjectData[]) => {
					return `${format(tooltipItems[0].dataset.meta[tooltipItems[0].dataIndex], 'EEE MMM d, yyyy. h:mma')}\n`;
				},
				label: (tooltipItem: ObjectData) => {
					const value = tooltipItem.raw;
					return `₦${value.toLocaleString()}`;
				},
				footer: (tooltipItems: ObjectData[]) => {
					return ``;
				},
			},
			bodyFont: {
				size: 16,
				weight: 'bold',
				family: 'Arial',
			},
			titleFont: {
				size: 14,
				weight: 'normal',
			},
		},
		legend: {
			position: 'top',
		},
	},
};

export const OrderChartOptions: ChartOptions<any> = {
	responsive: true,

	plugins: {
		tooltip: {
			callbacks: {
				title: (tooltipItems: ObjectData[]) => {
					return `${format(tooltipItems[0].dataset.meta[tooltipItems[0].dataIndex], 'EEE MMM d, yyyy. h:mma')}\n`;
				},
				label: (tooltipItem: ObjectData) => {
					const value = tooltipItem.raw;
					return `${value.toLocaleString()} Orders`;
				},
				footer: (tooltipItems: ObjectData[]) => {
					return ``;
				},
			},
			bodyFont: {
				size: 16,
				weight: 'bold',
				family: 'Arial',
			},
			titleFont: {
				size: 14,
				weight: 'normal',
			},
		},
		legend: {
			position: 'top',
		},
	},
};

const getTimeDateLabel = (data: ObjectData, period?: string) => {
	const labels = data?.salesChart?.map((item: ObjectData) => {
		let label = '';

		if (period === 'week') label = format(item.dateTime, 'MMM dd');
		else if (period === 'custom' && data?.salesChart?.length > 24)
			label = item.month;
		else if (period === 'month' || period === 'custom') label = item.day;
		else if (period === 'year') label = item.month;
		else label = format(item.dateTime, 'h a');

		return label;
	});
	return labels;
};

export const constructSalesData = (data: ObjectData, period = 'day') => {
	const dataValue = data.salesChart.map((item: ObjectData) => {
		return item.total;
	});

	return {
		labels: getTimeDateLabel(data, period),
		datasets: [
			{
				label: '',
				data: dataValue,
				meta: data.salesChart.map((item: ObjectData) => {
					return item.dateTime;
				}),
				borderColor: '#F45D2C',
				backgroundColor: '#F45D2C',
			},
		],
	};
};

export const constructOrdersData = (data: ObjectData, period = 'day') => {
	const dataValue = data.salesChart.map((item: ObjectData) => {
		return item.count;
	});

	return {
		labels: getTimeDateLabel(data, period),
		datasets: [
			{
				label: '',
				data: dataValue,
				meta: data.salesChart.map((item: ObjectData) => {
					return item.dateTime;
				}),
				borderColor: '#F45D2C',
				backgroundColor: '#F45D2C',
			},
		],
	};
};

export const constructTopSellingData = (data: ObjectData) => {
	const labels = data.topSellingItems.map((item: ObjectData) => {
		return item.name;
	});
	const dataValue = data.topSellingItems.map((item: ObjectData) => {
		return item.amountSold;
	});

	return {
		labels,
		datasets: [
			{
				label: '',
				data: dataValue,
				meta: data.salesChart.map((item: ObjectData) => {
					return item.dateTime;
				}),
				borderColor: '#F45D2C',
				backgroundColor: '#F45D2C',
			},
		],
	};
};

export const constructTopOrderData = (data: ObjectData) => {
	const labels = data.topSellingItems.map((item: ObjectData) => {
		return item.name;
	});
	const dataValue = data.topSellingItems.map((item: ObjectData) => {
		return item.unitsSold;
	});

	return {
		labels,
		dataValue,
		datasets: [
			{
				label: '',
				data: dataValue,
				meta: data.salesChart.map((item: ObjectData) => {
					return item.dateTime;
				}),
				borderColor: '#F45D2C',
				backgroundColor: '#F45D2C',
			},
		],
	};
};

///----For fusionCharts-----
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
