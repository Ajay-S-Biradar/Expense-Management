import React, { useState } from 'react'
import Income from '../components/Income';
import { DummyIncomes } from '../utils/dummyIncome';
import Form from '../components/Form';
import Cards from '../components/Cards';

const Incomes = () => {
  const [amount,setAmount] = useState();
  const [name, setName] = useState();
  const [date, setDate] = useState();
  const [category, setCategory] = useState();
  const [reference, setReference] = useState();

  const fillAllCredentials = ()=>{
    alert("fill all the fields");
  }

  const handleAddItem = async()=>{
    if(!(amount && name && date && category)){
      fillAllCredentials();
      return;
    }
    console.log(amount,name,date,category);
  }


  return (
    <div className='w-full flex bg-red-400'>
      <div className='border border-blue-500 w-full m-5 text-center rounded-3xl flex flex-col'>
        <div className='text-3xl font-heading font-semibold w-full m-2 p-2'>
            Incomes
        </div>
        <div className='flex flex-row w-full'>
          <Form setAmount={setAmount} setCategory={setCategory} setDate={setDate} setReference={setReference} setName={setName} handleAddItem={handleAddItem} reference={reference} />
          <Cards />
        </div>
      </div>
    </div>
  )
}

export default Incomes