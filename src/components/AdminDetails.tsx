import {
  Card,
} from "@/components/ui/card"
import { useAuth } from "@/contexts/AuthContext";

const AdminDetails = () => {
  const { user } = useAuth();

  return (
    <Card className="p-6">
      <div className='space-y-1'>
        <h1 className='text-2xl font-semibold'>Admin Details</h1>
        <p className=' text-sm font-medium text-gray-400'>Current system status</p>
      </div>

      <div className='flex justify-between'>
        <p className="font-medium text-gray-500">Admin Name:</p>
        <h1 className="text-xl font-bold text-[#638763]">{user?.name || user?.email}</h1>
      </div>

      <div className='flex justify-between'>
        <p className="font-medium text-gray-500">User Role:</p>
        <h1 className="text-xl font-bold text-[#638763]">Admin</h1> {/* Update if you store this */}
      </div>

      <div className='flex justify-between'>
        <p className="font-medium text-gray-500">Date:</p>
        <h1 className="text-xl font-bold text-[#638763]">
          {new Date().toLocaleDateString("en-GB", { day: 'numeric', month: 'long', year: 'numeric' })}
        </h1>
      </div>
    </Card>
  );
};

export default AdminDetails