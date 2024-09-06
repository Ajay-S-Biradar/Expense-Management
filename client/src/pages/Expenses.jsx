import React, { useState } from 'react'
import Form from '../components/Form';
import Cards from '../components/Cards';
import { API_URL, expenseCategories } from '../utils/constants';
import axios from 'axios';
import BarChart from '../components/BarChart';

const Expenses = () => {
  const [amount,setAmount] = useState();
  const [name, setName] = useState();
  const [date, setDate] = useState();
  const [category, setCategory] = useState();
  const [reference, setReference] = useState();

  const categories = expenseCategories ;

  const addedSuccessFully = ()=>{
    alert("Expense added successfully");
  }

  const fillAllCredentials = ()=>{
    alert("fill all the fields");
  }

  const handleAddItem = async()=>{
    if(!(amount && name && date && category)){
      fillAllCredentials();
      return;
    }
    console.log(amount,name,date,category);
    try {
      const res = await axios.post(API_URL+"expense",{
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
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='w-full flex bg-fuchsia-600 overflow-hidden'>
      <div className='border border-blue-500 w-full m-5 text-center rounded-3xl flex flex-col overflow-y-scroll overflow-x-hidden'>
        <div className='text-3xl font-heading font-semibold w-full m-2 p-2'>
            Expenses
        </div>
        <div className='grid grid-rows-2 h-full'>
          <div className='row-span-1 grid grid-cols-3 h-full gap-3'>
            <BarChart />
            <Form setAmount={setAmount} categories={categories} setCategory={setCategory} setDate={setDate} setReference={setReference} setName={setName} handleAddItem={handleAddItem} reference={reference} />
          </div>
          <div className='row-span-1 flex flex-row justify-center w-full'>
            <Cards apiString="expense" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Expenses