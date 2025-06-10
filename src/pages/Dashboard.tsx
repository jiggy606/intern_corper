import { ReusableCard } from '@/components/reuseable/card/ReuseableCard'
import React from 'react'

const Dashboard = () => {
  return (
    <div className='space-y-6 p-4'>
      <div>
        <h1 className='font-semibold text-4xl text-[#638763] mb-5'>Welcome Danny!</h1>

        <div className='flex flex-col md:flex-row gap-4 md:gap-10 justify-between'>
          <ReusableCard title='Active Corpers' />
          <ReusableCard title='Active Interns' />
        </div>
      </div>

      <div>
        <h1 className='text-2xl font-semibold'>Corpers</h1>
      </div>
    </div>
  )
}

export default Dashboard
