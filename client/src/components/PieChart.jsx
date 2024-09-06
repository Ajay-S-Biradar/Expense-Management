import React, { useEffect, useState } from 'react'
import { Pie } from 'react-chartjs-2'
import { Chart, CategoryScale, LinearScale, Title, Tooltip, Legend, ArcElement } from 'chart.js'
import { PieChartdata, PieOptions } from '../utils/dummyGraphData'
import { API_URL } from '../utils/constants'
import axios from 'axios'

Chart.register(
    ArcElement, CategoryScale, LinearScale, Title, Tooltip, Legend
)
 
const PieChart = () => {
  const [pieLabels, setPieLabels] = useState([]);
  const [pieData , setPieData] = useState([]);
 
  useEffect(()=>{
    fetchData();
  },[])

  const fetchData =  async()=>{
    try {
      const res = await axios.get(API_URL + "dashboard/pie",{
        withCredentials:true
      });
      // console.log(res);
      // let data = (await groupByYear(res.data));
      // setYears(data.years);
      // setAllIncomeData(data.res);
      setPieData([res.data.income[0].totalAmount, res.data.expense[0].totalAmount])

    } catch (error) {
      const stCode = error.response?.status ;
      
      console.log(error);
      if(stCode===400){
        navigate('/entry');
      }
      else if(stCode===401){
        navigate('/')
      }
    }
  }

  const PieChartdata = {
    labels:["Income", "Expense"],
    datasets: [
      {
        label: "Amount",
        data : pieData,
        backgroundColor: [
          "blue",
          "red"
        ],
        hoverOffset:10,
      }
    ]
  }

  return (
    <div>
        <Pie options={PieOptions} data={PieChartdata} />
        <div className='bg-red-300'>
          Total Savings = {pieData[0]-pieData[1]}
        </div>
    </div>
  )
}

export default PieChart