import React, { useEffect, useState } from 'react'
import Form from '../components/Form';
import Cards from '../components/Cards';
import axios from 'axios';
import { API_URL, incomeCategories } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addIncome } from '../store/incomeSlice';
import BarChart from '../components/BarChart';
import { lineChartData } from '../utils/dummyGraphData';

const Incomes = () => {
  const [amount,setAmount] = useState();
  const [name, setName] = useState();
  const [date, setDate] = useState();
  const [category, setCategory] = useState();
  const [reference, setReference] = useState();

  const categories = incomeCategories;

  const dispatch = useDispatch()

  const fillAllCredentials = ()=>{
    alert("fill all the fields");
  }
  const addedSuccessFully = ()=>{
    alert("added success ;)");
  }

  const handleAddItem = async()=>{
    if(!(amount && name && date && category)){
      fillAllCredentials();
      return;
    }

    const res = await axios.post(API_URL+"income",{
      name,
      amount,
      category,
      date,
      reference
    },{
      withCredentials:true
    })
    if(res.data?.success){
      addedSuccessFully();  
      dispatch(addIncome(res.data.addedIncome));
    }
    else{
      alert('Error while adding the data');
    }
  }

  return (
    <div className='w-full flex bg-red-400 overflow-hidden'>
      <div className='bg-black border border-blue-500 w-full m-5 text-center rounded-3xl flex flex-col overflow-y-scroll overflow-x-hidden'>
        <div className='text-3xl font-heading font-semibold w-full m-2 p-2'>
            Incomes
        </div>
        <div className='grid grid-rows-2 h-full'>
          <div className='row-span-1 grid grid-cols-3 h-full gap-3'>
            <BarChart data={lineChartData} />
            <Form setAmount={setAmount} setCategory={setCategory} setDate={setDate} setReference={setReference} setName={setName} handleAddItem={handleAddItem} reference={reference} categories={categories}/>
          </div>
          <div className='row-span-1 flex flex-row justify-center w-full'>
            <Cards apiString="income"/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Incomes