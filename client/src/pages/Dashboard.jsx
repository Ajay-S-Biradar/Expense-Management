import React from 'react'
import LineGraph from '../components/LineGraph'

const Dashboard = () => {
  return (
    <div className='w-full m-5'>
      <div className='border border-blue-700 h-full rounded-2xl'>
        <div className='grid grid-flow-col grid-cols-5 h-3/5 m-5 gap-10'>
          <div className='bg-cyan-9020 rounded-2xl col-span-3'>
              <LineGraph />
          </div>
          <div className='bg-purple-600 rounded-2xl col-span-2'></div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard