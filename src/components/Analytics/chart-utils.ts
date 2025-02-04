import { ObjectData } from '@/utils/interface';
import { ChartOptions } from 'chart.js';
import { format } from 'date-fns';

export const SalesChartOptions: ChartOptions<'line' | 'bar'> = {
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

export const OrderChartOptions: ChartOptions<'line' | 'bar'> = {
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
		else if (period === 'month') label = item.day;
		else if (period === 'year') label = item.month;
		else label = format(item.dateTime, 'h a');
		console.log('huyugyyu', label, period);
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
				borderColor: 'rgb(255, 99, 132)',
				backgroundColor: 'rgba(255, 99, 132, 0.5)',
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
				borderColor: 'rgb(255, 99, 132)',
				backgroundColor: 'rgba(255, 99, 132, 0.5)',
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
				borderColor: 'rgb(255, 99, 132)',
				backgroundColor: 'rgba(255, 99, 132, 0.5)',
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
				borderColor: 'rgb(255, 99, 132)',
				backgroundColor: 'rgba(255, 99, 132, 0.5)',
			},
		],
	};
};
