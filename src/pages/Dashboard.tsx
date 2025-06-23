import AdminDetails from '@/components/AdminDetails'
import InfoChart from '@/components/InfoChart'
import { ReusableCard } from '@/components/reuseable/card/ReuseableCard'
import React from 'react'
import { internStore } from '@/stores/internStore'
import { corperStore } from '@/stores/corperStore'
import { useAuth } from "@/contexts/AuthContext";

const Dashboard = () => {
  const { user } = useAuth(); // ✅ get the logged-in user

  const interns = internStore((s) => s.interns);
  const activeInterns = interns.filter((i) => i.status === "active");

  const corpers = corperStore((s) => s.corpers);
  const activeCorpers = corpers.filter((i) => i.status === "active");

  return (
    <div className='space-y-6 p-4'>
      <div>
        <h1 className='font-semibold text-4xl text-[#638763] mb-5'>
          Welcome {user?.name || user?.email}
        </h1>
        
        <div className='flex flex-col md:flex-row gap-4 md:gap-10 justify-between'>
          <ReusableCard title='Active Interns' type='Intern table' to='/dashboard/interns' count={activeInterns.length} />
          <ReusableCard title='Active Corpers' type='Corper table' to='/dashboard/corper' count={activeCorpers.length} />
        </div>
      </div>

      <div>
        <h1 className='text-2xl font-semibold'>Chart Representation</h1>
        <div>
          {/* <InfoChart data={} /> */}
        </div>
      </div>

      <div className=' space-y-4'>
        <AdminDetails />
      </div>
    </div>
  )
}

export default Dashboard
