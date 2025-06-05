import { ReusableCard } from '@/components/reuseable/card/ReuseableCard'
import React from 'react'

const Dashboard = () => {
  return (
    <div className='space-y-6'>
        <div>
            <h1 className=' font-semibold text-4xl text-green-700 mb-5'>Welcome Danny!</h1>

        <div className=' flex gap-10 justify-between'>
            <ReusableCard title='Active Corpers'/>
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