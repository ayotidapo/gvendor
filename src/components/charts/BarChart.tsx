'use client';

import React from 'react';
import { registerables, Chart } from 'chart.js';
import { Bar } from 'react-chartjs-2';

interface Props {
	labels: (number | string)[];
	data: number[] | string[];
	width?: number;
	height?: number;
	barThickness: number;
	xGridDisplay?: boolean;
	yGridDisplay?: boolean;
	responsive: boolean;
}

Chart.register(...registerables);

const BarChart: React.FC<Props> = ({
	data,
	labels,
	width = 500,
	height = 300,
	responsive,
	barThickness,
	xGridDisplay = false,
	yGridDisplay = false,
}) => {
	return (
		<Bar
			data={{
				labels,
				datasets: [
					{
						label: '',
						backgroundColor: '#F45D2C',
						borderWidth: 0,
						barThickness: barThickness,
						borderRadius: 6,
						data,
					},
				],
			}}
			options={{
				responsive,
				scales: {
					x: {
						grid: {
							display: xGridDisplay,
							color: '#555555',
						},
						border: {
							display: false,
						},
						ticks: {
							color: '#050301',
							display: true,
						},
						display: true,
					},
					y: {
						grid: {
							display: yGridDisplay,
							color: '#555555',
						},
						ticks: {
							color: '#050301',
							maxTicksLimit: 6,
						},
						display: true,
					},
				},
				plugins: {
					legend: {
						display: false,
					},
				},
			}}
			width={width}
			height={height}
		/>
	);
};

export default BarChart;
