import React, { useState } from 'react'
import Form from '../components/Form';
import Cards from '../components/Cards';
import { API_URL, expenseCategories } from '../utils/constants';
import axios from 'axios';

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
    <div className='w-full flex bg-fuchsia-600'>
      <div className='border border-blue-500 w-full m-5 text-center rounded-3xl flex flex-col'>
        <div className='text-3xl font-heading font-semibold w-full m-2 p-2'>
            Expenses
        </div>
        <div className='flex flex-row w-full'>
          <Form setAmount={setAmount} categories={categories} setCategory={setCategory} setDate={setDate} setReference={setReference} setName={setName} handleAddItem={handleAddItem} reference={reference} />
          <Cards apiString="expense" />
        </div>
      </div>
    </div>
  )
}

export default Expenses