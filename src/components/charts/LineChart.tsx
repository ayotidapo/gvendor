'use client'

import React from 'react'
import { registerables, Chart } from 'chart.js'
import { Line } from 'react-chartjs-2'

interface Props {
	labels: (number | string)[]
	data: number[]
	width?: number
	height?: number
	responsive: boolean
}

Chart.register(...registerables)

const LineChart: React.FC<Props> = ({
	data,
	labels,
	width = 500,
	height = 100,
	responsive,
}) => {
	return (
		<Line
			datasetIdKey="line"
			data={{
				labels,

				datasets: [
					{
						label: '',
						borderColor: '#F45D2C',
						type: 'line',
						data,
						cubicInterpolationMode: 'monotone',
						tension: 0.6,

					},
				],
			}}
			options={{
				responsive,
				scales: {
					x: {
						grid: {
							display: true,
							color: '#EAEAEA'
						},
						border: {
							display: false,
						},
						ticks: {
							color: '#050301'
						},
						display: true,
					},
					y: {
						grid: {
							display: true,
							color: '#EAEAEA'
						},
						ticks: {
							color: '#050301'
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
	)
}

export default LineChart
