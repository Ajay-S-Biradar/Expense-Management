import React, { useEffect, useState } from 'react'
import {Line} from 'react-chartjs-2'
import {Chart, CategoryScale, LinearScale, Legend, Title, Tooltip, PointElement ,LineElement, Filler} from 'chart.js'
import { LineOptions } from '../utils/dummyGraphData'
import axios from 'axios'
import { useFetcher, useNavigate } from 'react-router-dom'
import { groupByYear, trimTrailingZeros } from '../utils/utilFunctions'
import { API_URL, indexemonths } from '../utils/constants'

Chart.register(
    CategoryScale, LinearScale, Legend, Title, Tooltip, PointElement, LineElement, Filler
)

const LineGraph = () => {

  const [incomes,setIncomes] = useState([]);
  const [expense,setExpense] = useState([]);
  const [allExpenseData, setAllExpenseData] = useState('')
  const [allIncomeData, setAllIncomeData] = useState("");
  const [years, setYears] = useState([]);

  const navigate = useNavigate();

  const handleChangeYear = (yr)=>{
    let arr = Array(10).fill(0); 
    allIncomeData[yr]?.map(income=>{
      arr[income.month - 1] = income.totalIncome
    })
    arr = trimTrailingZeros(arr);
    setIncomes(arr);
    arr = Array(10).fill(0); 
    allExpenseData[yr]?.map(income=>{
      arr[income.month - 1] = income.totalIncome
    })
    arr = trimTrailingZeros(arr);
    setExpense(arr);
  }

  useEffect(()=>{
    if(years.length > 0){
      handleChangeYear(years[0])
    }
  },[years]);

  useEffect(()=>{
    fetchData();
  },[])

  const fetchData =  async()=>{
    try {
      const res = await axios.get(API_URL + "dashboard/line",{
        withCredentials:true
      });
      console.log(res);
      let data = (await groupByYear(res.data.dataIncome));
      setYears(data.years);
      setAllIncomeData(data.res);
      data = (await groupByYear(res.data.dataExpense));
      setAllExpenseData(data.res);
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

  const lineChartData = {
    labels: indexemonths,
    datasets: [
        {
            label: "Expenses",
            data: expense,//[200, 300, 600, 3050, 1500, 200, 100, 4000, 6200, 400, 230, 780],
            borderColor: "#c0392b", // Dark red to enhance the serious tone
            backgroundColor: (context) => {
                const chart = context.chart;
                const { ctx, chartArea } = chart;

                if (!chartArea) {
                    return null;
                }

                const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
                gradient.addColorStop(0.3, '#c0392b'); // Darker red
                gradient.addColorStop(0.6, '#8e44ad'); // Deep purple

                return gradient;
            },
            hoverBorderWidth: 2,
            fill: true,
            radius:1
        },
        {
            label: "Incomes",
            fill: true,
            data: incomes,
            radius:1,
            borderColor: "#2ecc71", // Bright green to enhance positivity
            hoverBorderWidth: 2,
            backgroundColor: (context) => {
                const chart = context.chart;
                const { ctx, chartArea } = chart;
                
                if (!chartArea) {
                    return null;
                }

                const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
                gradient.addColorStop(0.5, "#fbc531"); // Bright yellow
                gradient.addColorStop(1, "#00a8ff"); // Light blue

                return gradient;
            },
        },
    ],
};

  return (
    <div>
      <div>
        <select name="" id=""
        onChange={(e)=> handleChangeYear(e.target.value)}
        >
          {years?.map((yr, ind)=>{
            return <option key={ind} value={yr}>{yr}</option>
          })}
        </select>
      </div>
        {lineChartData && <Line options={LineOptions} data={lineChartData}/>}
    </div>
  )
}

export default LineGraph