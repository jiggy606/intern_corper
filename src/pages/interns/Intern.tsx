"use client"

import { useState } from "react"
import { internStore } from "@/stores/internStore";
import InternTable from "@/components/table/InternTable"
import MultiStepDialogBox from "@/components/reuseable/dialogbox/MultiStepDialogBox"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
// import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

import { User } from "@/types/User"
import { Weekday, WEEKDAYS } from "@/types/User"
import { ReusableButtonOne } from "@/components/reuseable/button/ReuseableButtonOne"

const Intern = () => {
   const interns = internStore((s) => s.interns);
   const addIntern = internStore((s) => s.addIntern);
   const deleteIntern = internStore((s) => s.deleteIntern);
   const [formData, setFormData] = useState({
    id: "",
    name: "",
    phone: "",
    email: "",
    address: "",
    workDays: [] as Weekday[],
    department: "",
    startDate: "",
    endDate: "",
    supervisor: "",
    status: ""
  });

    const isStepOneValid = formData.name && formData.phone && formData.email && formData.address;
    const isStepTwoValid =
        formData.supervisor &&
        formData.workDays.length > 0 &&
        formData.department &&
        formData.startDate &&
        formData.endDate;

    const resetFormData = () => {
        setFormData({
        id: "",
        name: "",
        phone: "",
        email: "",
        address: "",
        workDays: [],
        department: "",
        startDate: "",
        endDate: "",
        supervisor: "",
        status: ""
        })
    }

    const toggleWorkDay = (day: Weekday) => {
        setFormData((prev) => {
        const isSelected = prev.workDays.includes(day)
        const updatedDays = isSelected
            ? prev.workDays.filter((d) => d !== day)
            : [...prev.workDays, day]

        if (updatedDays.length > 3) return prev
        return { ...prev, workDays: updatedDays }
        })
    }

    const handleAddIntern = () => {
        const newIntern: User = {
        id: interns.length + 1,
        name: formData.name,
        startDate: formData.startDate,
        workDays: formData.workDays,
        endDate: formData.endDate,
        phoneNumber:formData.phone,
        emailAddress: "",
        address: "",
        department: [],
        supervisor: [],
        status: "active"
        }

        addIntern(newIntern);
        resetFormData() // Clear form after submission
    }

    const personalInfoStep = (
        <div className="grid gap-4">
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
        <div className="grid gap-4">
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

        <div className="py-2">
            <p className="font-medium text-base mb-2">Select workdays:</p>
            <div className="flex flex-wrap gap-3 text-sm">
            {WEEKDAYS.map((day) => (
                <label key={day} className="flex items-center space-x-2">
                <Checkbox
                    checked={formData.workDays.includes(day)}
                    onCheckedChange={() => toggleWorkDay(day)}
                />
                <span>{day}</span>
                </label>
            ))}
            </div>
            {formData.workDays.length >= 3 && (
            <p className="text-xs font-medium text-red-500 mt-3">
                Maximum of 3 days allowed!
            </p>
            )}
        </div>

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
            value={formData.startDate}
            onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
        />
        <Input
            type="date"
            value={formData.endDate}
            onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
        />
        </div>
    )

    /* const handleDeleteIntern = (id: number) => {
        setInterns(prev => prev.filter(intern => intern.id !== id))
    } */

    return (
        <div className="space-y-6 px-4 sm:px-4 md:px-8 py-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="space-y-2">
            <h1 className="font-semibold text-2xl sm:text-3xl">Interns</h1>
            <p className="text-sm text-gray-400 font-medium">
                Manage your workforce efficiently
            </p>
            </div>

            <MultiStepDialogBox
            triggerButton={
                <ReusableButtonOne className="flex gap-2 w-full md:w-auto hover:bg-[#638763] bg-white hover:text-white text-[#638763] border border-[#638763] cursor-pointer">
                <Plus size={16} /> Add Intern
                </ReusableButtonOne>
            }
            steps={[
                { title: "Intern Personal Info", content: personalInfoStep },
                { title: "Intern Work Details", content: workDetailsStep },
            ]}
            onSubmit={handleAddIntern}
            canProceed={!!isStepOneValid}
            canSubmit={!!isStepTwoValid}
            />
        </div>

        {interns.length === 0 ? (
        <div className="flex items-center justify-center h-[50vh] text-center">
          <p className="text-gray-400 text-lg sm:text-xl font-medium">
            No interns registered...
          </p>
        </div>
      ) : (
        <InternTable data={interns} onDelete={deleteIntern} />
      )}

        {/* <InternTable data={interns} /> */}
        </div>
    )
}

export default Intern
