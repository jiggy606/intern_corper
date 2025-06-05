import { ReusableButtonTwo } from '@/components/reuseable/button/ReuseableButtonTwo';
import { Plus } from 'lucide-react';
import MultiStepDialogBox from '@/components/reuseable/dialogbox/MultiStepDialogBox';
import {
  Input
} from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const Corpers = () => {
  const personalInfoStep = (
    <div className="space-y-4">
      <Input type="text" placeholder="Full Name" />
      <Input type="tel" placeholder="Phone Number" />
      <Input type="email" placeholder="Email Address" />
      <Input type="text" placeholder="Address" />
    </div>
  );

  const workDetailsStep = (
    <div className="space-y-4">
      <Select>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Supervisor" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="1">Olu</SelectItem>
            <SelectItem value="2">Bolu</SelectItem>
            <SelectItem value="3">Tolu</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <Select>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Department" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="A">H&IS</SelectItem>
            <SelectItem value="B">SA&DM</SelectItem>
            <SelectItem value="C">R&SP</SelectItem>
            <SelectItem value="D">N&C</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <Input type="date" placeholder="Start Date" />
      <Input type="date" placeholder="End Date" />
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="font-semibold text-3xl">Corpers</h1>
          <p className="font-semibold text-sm text-gray-400">
            Manage your workforce efficiently
          </p>
        </div>

        <MultiStepDialogBox
          triggerButton={
            <ReusableButtonTwo
              bgColor="bg-gray-50"
              borderColor="border-gray-300"
              textColor="text-green-700"
              hoverStyles="hover:bg-green-800 hover:text-gray-50"
              icon={<Plus size={18} />}
            >
              Add Corper
            </ReusableButtonTwo>
          }
          steps={[
            {
              title: "Corper Personal Info",
              description: "Enter personal information.",
              content: personalInfoStep,
            },
            {
              title: "Corper Work Details",
              description: "Enter work-related information.",
              content: workDetailsStep,
            },
          ]}
          onSubmit={() => alert("Corper added successfully!")}
        />
      </div>
    </div>
  );
};

export default Corpers;
