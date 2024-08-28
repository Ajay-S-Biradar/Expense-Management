import React from 'react'
import {Line} from 'react-chartjs-2'
import {Chart, CategoryScale, LinearScale, Legend, Title, Tooltip, PointElement ,LineElement} from 'chart.js'
import { lineChartData, LineOptions } from '../utils/dummyGraphData'

Chart.register(
    CategoryScale, LinearScale, Legend, Title, Tooltip, PointElement, LineElement
)

const LineGraph = () => {
  return (
    <div>
        <Line options={LineOptions} data={lineChartData}/>
    </div>
  )
}

export default LineGraph