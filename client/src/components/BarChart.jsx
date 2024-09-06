import React, { useEffect, useState } from 'react'
import { Chart, BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title } from 'chart.js'
import { Bar } from 'react-chartjs-2'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import { API_URL } from '../utils/constants'
import { groupByYear } from '../utils/utilFunctions'

Chart.register(
    BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title
)

const BarChart = () => {

  const [allCategoryData, setAllCategoryData] = useState();
  const [categoryData, setCategoryData] = useState([]);
  const [years, setYears] = useState([]);
  const [categoryNames, setCategoryNames] = useState([]);

  const handleYearChange = (year)=>{
    console.log(year);
    let arrNames=[];
    let arrIncomes=[];
    (allCategoryData[year][0].categories.map((cate)=>{
      arrNames.push(cate.category)
      arrIncomes.push(cate.totalAmount)
    }))
    setCategoryNames(arrNames);
    setCategoryData(arrIncomes);
  }

  useEffect(()=>{
    if(years.length>0) handleYearChange(years[0])
  },[years]);

  const location = useLocation().pathname;
  let apiString ;
  const fetchData = async()=>{
    !location.includes("incomes")?apiString="expense": apiString="income"
    try {
      const res =await axios.get(API_URL+apiString+'/graph/bar',{
        withCredentials:true,
      });
      // console.log(res.data,API_URL+apiString+'/graph/bar');
      const response = await groupByYear(res.data);
      // console.log(response);
      setYears(response.years);
      setAllCategoryData(response.res);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    fetchData();
  },[])

  const data = {
    labels:categoryNames,
    datasets: [
        {
            label:location.includes("incomes")?apiString="Incomes": apiString="Expenses",
            // fill:true,
            data:  categoryData,//[2000,3000,6000,3500,10500,2000,1000,4000,3200,4300,2300,7800],
            borderColor: "#f3b3f3",
            hoverBorderWidth:2,
            backgroundColor:"#a7b8c9",
        },
    ],
}
  return (
    <div className='h-full col-span-2'>
        <select name="" id=""
        onChange={(e)=> handleYearChange(e.target.value)}
        >
          {years.map((opt, ind)=>{
            return <option key={ind} value={opt}>{opt}</option>
          })}
        </select>
        <Bar options={{}} data={data} />
    </div>
  )
}

export default BarChart