'use client';

import React from 'react';
import { registerables, Chart } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

interface Props {
	labels?: (number | string)[];
	data: number[];
	responsive: boolean;
}

Chart.register(...registerables);

const DoughnutChart: React.FC<Props> = ({ data, labels, responsive }) => {
	return (
		<Doughnut
			data={{
				labels,
				datasets: [
					{
						label: 'Dataset',
						data,
						backgroundColor: ['#F45D2C', '#F45D2C', '#F45D2C80'],
						hoverOffset: 4,
					},
				],
			}}
			options={{
				cutout: '90%',
				responsive,
				plugins: {
					legend: {
						display: true,
						position: 'top',
					},
					tooltip: {
						callbacks: {
							label: tooltipItem => {
								return `${tooltipItem.label}: ${tooltipItem.raw}`;
							},
						},
					},
				},
			}}
			height={100}
		/>
	);
};

export default DoughnutChart;
