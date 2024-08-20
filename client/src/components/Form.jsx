import React from 'react'

const Form = ({handleAddItem, setAmount, setCategory, setDate, setName, setReference}) => {
  return (
    <div className='m-5 w-1/2'>
            <form action="" className='flex flex-col gap-4'>
              <input 
              className='m-1 p-2 rounded-xl font-medium' type="text" placeholder='Add item'
              onChange={(e)=> setName(e.target.value)}
              />
              <input 
              className='m-1 p-2 rounded-xl font-medium' type="number" placeholder='Income amount'
              onChange={(e)=> setAmount(e.target.value)}
              />
              <input 
              className='m-1 p-2 rounded-xl font-medium' type="date" placeholder='Enter a Date'
              onChange={(e)=> setDate(e.target.value)}
              />
              <select className='m-1 p-2 rounded-xl font-medium' name="" id=""
              onChange={(e)=> setCategory(e.target.value)}
              >
                <option className='hidden' value="choose">Choose category</option>
                <option value="salary">Salary</option>
                <option value="freelancing">Freelancing</option>
                <option value="stocks">Stocks</option>
                <option value="youtube">YouTube</option>
                <option value="other">Other</option>
              </select>
              <textarea onChange={(e)=> setReference(e.target.value)} className='rounded-xl p-2 m-1' placeholder='Provide the Reference' name="" id=""></textarea>
              <div className='flex justify-center'>
                <div onClick={handleAddItem} className='cursor-pointer bg-blue-500 w-36 text-center p-1 m-1 rounded-xl'>
                  Add 
                </div>
              </div>
            </form>
        </div>
  )
}

export default Form