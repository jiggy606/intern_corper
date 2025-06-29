import AdminDetails from '@/components/AdminDetails'
import UserTypeChart from '@/components/UserTypeChart'
import { ReusableCard } from '@/components/reuseable/card/ReuseableCard'
import React, { useEffect, useState } from 'react'
import { internStore } from '@/stores/internStore'
import { corperStore } from '@/stores/corperStore'
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from '@/lib/supabaseClient'

const Dashboard = () => {
  const { user } = useAuth(); 

  const interns = internStore((s) => s.interns);
  const activeInterns = interns.filter((i) => i.status === "active");

  const corpers = corperStore((s) => s.corpers);
  const activeCorpers = corpers.filter((i) => i.status === "active");

  const [internCount, setInternCount] = useState(0)
  const [corperCount, setCorperCount] = useState(0)

  useEffect(() => {
    const fetchCounts = async () => {
      const { count: internTotal } = await supabase
        .from("interns")
        .select("*", { count: "exact", head: true })

      const { count: corperTotal } = await supabase
        .from("corpers")
        .select("*", { count: "exact", head: true })

      setInternCount(internTotal || 0)
      setCorperCount(corperTotal || 0)
    }

    fetchCounts()
  }, [])

  return (
    <div className='space-y-6 p-4 scroll-smooth'>
      <div>
        <h1 className='font-semibold text-4xl text-[#638763] mb-5'>
          Welcome {user?.name || user?.email}
        </h1>
        
        <div className='flex flex-col md:flex-row gap-4 md:gap-10 justify-between'>
          <ReusableCard title='Active Interns' type='Intern table' to='/dashboard/interns' count={internCount} />
          <ReusableCard title='Active Corpers' type='Corper table' to='/dashboard/corper' count={corperCount} />
        </div>
      </div>

      <div>
        <h1 className='text-2xl font-semibold'>Chart Representation</h1>
        <div>
          <UserTypeChart internCount={internCount} corperCount={corperCount} />
        </div>
      </div>

      <div className=' space-y-4'>
        <AdminDetails />
      </div>
    </div>
  )
}

export default Dashboard
