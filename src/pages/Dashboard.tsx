import AdminDetails from '@/components/AdminDetails'
import UserTypeChart from '@/components/UserTypeChart'
import { ReusableCard } from '@/components/reuseable/card/ReuseableCard'
import React, { useEffect, useState } from 'react'
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from '@/lib/supabaseClient'

const Dashboard = () => {
  const { user } = useAuth(); 

  const [internCount, setInternCount] = useState(0)
  const [corperCount, setCorperCount] = useState(0)
  const [totalCount, setTotalCount] = useState(0)

  useEffect(() => {
    const fetchCounts = async () => {
      const { count: internTotal, error: internError } = await supabase
        .from("interns")
        .select("*", { count: "exact", head: true });

      const { count: corperTotal, error: corperError } = await supabase
        .from("corpers")
        .select("*", { count: "exact", head: true });

      if (internError || corperError) {
        console.error("Error fetching counts:", internError || corperError);
        return;
      }

      const internCountSafe = internTotal || 0;
      const corperCountSafe = corperTotal || 0;
      const combinedTotal = internCountSafe + corperCountSafe;

      setInternCount(internCountSafe);
      setCorperCount(corperCountSafe);
      setTotalCount(combinedTotal);
    };

    fetchCounts();
  }, []);

  const truncate = (str: string, max = 12) =>
    str.length > max ? str.slice(0, max) + '...' : str;

  const displayName = truncate(
    user?.user_metadata?.name || user?.email || '',
    12
  );

  return (
    <div className='space-y-6 p-4 scroll-smooth'>
      <div>
        <h1 className='font-semibold text-4xl text-[#638763] mb-5'>
          Welcome {truncate(user?.name || user?.email || '')}
        </h1>

        <div className='flex flex-col md:flex-row gap-4 md:gap-10 justify-between'>
          <ReusableCard title='Active Interns' type='Intern table' to='/dashboard/interns' count={internCount} />
          <ReusableCard title='Active Corpers' type='Corper table' to='/dashboard/corper' count={corperCount} />
          <ReusableCard title='All Active Members' count={totalCount} />
        </div>
      </div>

      <div>
        <h1 className='text-2xl font-semibold'>Chart Rep</h1>
        <div>
          <UserTypeChart internCount={internCount} corperCount={corperCount} />
        </div>
      </div>

      <div className='space-y-4'>
        <AdminDetails />
      </div>
    </div>
  )
}

export default Dashboard;
