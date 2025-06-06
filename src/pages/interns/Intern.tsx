"use client"

import { useState } from "react"
import InternTable from "@/components/table/InternTable"
import MultiStepDialogBox from "@/components/reuseable/dialogbox/MultiStepDialogBox"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

import { User } from "@/types/User"

const Intern = () => {
  const [interns, setInterns] = useState<User[]>([])
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    workDays: "",
    startDate: "",
    endDate: "",
  })

  const handleAddIntern = () => {
    const newIntern: User = {
        id: interns.length + 1,
        name: formData.name,
        startDate: formData.startDate,
        workDays: [],
        endDate: formData.endDate,
        phoneNumber: "",
        emailAddress: "",
        address: "",
        department: [],
        supervisor: []
    }
    setInterns((prev) => [...prev, newIntern])
  }

  const personalInfoStep = (
    <div className="space-y-4">
      <Input
        type="text"
        placeholder="Full Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
      <Input
        type="tel"
        placeholder="Phone Number"
        value={formData.phone}
        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
      />
      <Input
        type="email"
        placeholder="Email Address"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
      <Input
        type="text"
        placeholder="Address"
        value={formData.address}
        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
      />
    </div>
  )

  const workDetailsStep = (
    <div className="space-y-4">
      <Select
        onValueChange={(value) => setFormData({ ...formData, supervisor: value })}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Supervisor" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="Olu">Olu</SelectItem>
            <SelectItem value="Bolu">Bolu</SelectItem>
            <SelectItem value="Tolu">Tolu</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <Select
        onValueChange={(value) => setFormData({ ...formData, department: value })}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Department" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="H&IS">H&IS</SelectItem>
            <SelectItem value="SA&DM">SA&DM</SelectItem>
            <SelectItem value="R&SP">R&SP</SelectItem>
            <SelectItem value="N&C">N&C</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <Input
        type="date"
        placeholder="Start Date"
        value={formData.startDate}
        onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
      />
      <Input
        type="date"
        placeholder="End Date"
        value={formData.endDate}
        onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
      />
    </div>
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="font-semibold text-3xl">Interns</h1>
          <p className="font-semibold text-sm text-gray-400">
            Manage your workforce efficiently
          </p>
        </div>

        <MultiStepDialogBox
          triggerButton={
            <Button className="flex gap-2">
              <Plus size={16} /> Add Intern
            </Button>
          }
          steps={[
            { title: "Personal Info", content: personalInfoStep },
            { title: "Work Details", content: workDetailsStep },
          ]}
          onSubmit={handleAddIntern}
        />
      </div>

      <InternTable data={interns} />
    </div>
  )
}

export default Intern
