import React from 'react'

const Card = ({item}) => {
  return (
    <div className='flex flex-col border border-yellow-400 rounded-2xl'>
      <div className='flex justify-evenly mt-2'>
        <div className='flex items-start flex-col m-1'>
          <h1>Name: {item?.name}</h1>
          <h1>Amount: {item?.amount}</h1>
        </div>
        <div>
          <h1>Date: {item?.date}</h1>
          <h1>Category: {item?.category}</h1>
        </div>
      </div>
        {item?.reference && <h1 className='p-2'>Reference: {item?.reference}</h1>}
    </div>
  )
}

export default Card