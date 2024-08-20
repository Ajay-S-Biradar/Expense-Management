import React from 'react'
import Income from './Income'
import { DummyIncomes } from '../utils/dummyIncome'

const Cards = () => {
  return (
    <div className='overflow-y-scroll w-full flex flex-col h-[80vh] gap-5 my-3 p-2'>
        {DummyIncomes.map((item, ind)=>{
            return <Income key={ind} item={item}/>
        })}
    </div>
  )
}

export default Cards