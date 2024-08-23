'use client'

import React from 'react'
import { registerables, Chart } from 'chart.js'
import { Bar } from 'react-chartjs-2'

interface Props {
  labels: number[] | string[]
  data: number[] | string[]
  width?: number
  height?: number
  responsive: boolean
}

Chart.register(...registerables)

const BarChart: React.FC<Props> = ({
  data,
  labels,
  width = 500,
  height = 300,
  responsive,
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
            barThickness: 5,
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
              display: false,
            },
            border: {
              display: false,
            },
            display: false,
          },
          y: {
            grid: {
              display: true,
              color: '#555555'
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

export default BarChart
