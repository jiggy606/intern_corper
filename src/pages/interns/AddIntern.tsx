import { ReusableButtonOne } from '@/components/reuseable/button/ReuseableButtonOne'
import ReusableInput from '@/components/reuseable/input/ReuseableInput'
import ReusableGroupedSelect from '@/components/reuseable/select/ReuseableSelect'
import ReusableSelect from '@/components/reuseable/select/ReuseableSelect'
import { Button } from '@/components/ui/button'
import React from 'react'

const timezoneGroups = [
  {
    groupLabel: "SA & DM",
    items: [
      { label: "Mr Aghogho", value: "PM" },
      { label: "Mr Ola", value: "SM" },
      { label: "Mrs Maureen", value: "MA" },
    ],
  },
  {
    groupLabel: "R&SP",
    items: [
      { label: "Mr Olu", value: "ED" },
      { label: "Mrs Ify", value: "ED" },
    ],
  },
  {
    groupLabel: "Hardware and Infrastructure",
    items: [
      { label: "Mr Ahmed", value: "ED" },
      { label: "Mr IBB", value: "ED" },
    ],
  },
  {
    groupLabel: "N&C",
    items: [
      { label: "Mr IBB", value: "ED" },
      { label: "Mrs Frances", value: "ED" },
    ],
  },
];

const AddIntern = () => {
    function handleSelect(value: string): void {
        throw new Error('Function not implemented.')
    }

  return (
    <div className="flex justify-center w-full">
  <div className="space-y-4 w-3/5">
    <div className="space-y-2">
      <h1 className="font-semibold text-3xl">Add Intern</h1>
      <p className="font-medium text-sm text-gray-400">
        Enter intern details to add a new member
      </p>
    </div>

    <div className="space-y-2">
      <h1 className="font-semibold text-xl">Personal Details</h1>
      <div className="space-y-2">
        <ReusableInput label="Add Name" placeholder="Add a Fullname" />
        <ReusableInput label="Phone Number" placeholder="Add Phone Number" />
        <ReusableInput label="Email" placeholder="Add Email" />
        <ReusableInput label="Address" placeholder="Add Address" />
      </div>
    </div>

    <div className="space-y-2">
      <h1 className="font-semibold text-xl">Work Details</h1>
      <div className="space-y-2">
        <ReusableGroupedSelect
        label="Choose Supervisor"
        onChange={handleSelect}
        groups={timezoneGroups}
        width="w-[280px]"
        />
        <ReusableInput label="Date Started" placeholder="Add a fullname" />
        <ReusableInput label="Date Ended" placeholder="Add a fullname" />
        <ReusableInput label="Supervisor" placeholder="Add a fullname" />
      </div>
    </div>
  </div>
</div>

  )
}

export default AddIntern