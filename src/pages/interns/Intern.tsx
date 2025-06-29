"use client"

import { useEffect, useState } from "react"
import InternTable from "@/components/table/InternTable"
import MultiStepDialogBox from "@/components/reuseable/dialogbox/MultiStepDialogBox"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { CalendarIcon, Plus } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { User, Weekday, WEEKDAYS, Department, Supervisor } from "@/types/User"
import { ReusableButtonOne } from "@/components/reuseable/button/ReuseableButtonOne"
import { supabase } from "@/lib/supabaseClient"

const Intern = () => {
  const [interns, setInterns] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
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
  })

  const isStepOneValid = formData.name && formData.phone && formData.email && formData.address
  const isStepTwoValid =
    formData.supervisor &&
    formData.workDays.length > 0 &&
    formData.department &&
    formData.startDate &&
    formData.endDate

  const resetFormData = () => {
    setFormData({
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

  const handleAddIntern = async () => {
    const { data: existingInterns } = await supabase
      .from("interns")
      .select("serialNumber")
      .order("serialNumber", { ascending: false })
      .limit(1)

    const nextSerial = existingInterns?.[0]?.serialNumber
      ? existingInterns[0].serialNumber + 1
      : 1

    const newIntern: Omit<User, "id"> & { serialNumber: number } = {
      name: formData.name,
      phoneNumber: formData.phone,
      emailAddress: formData.email,
      address: formData.address,
      department: [formData.department as Department],
      supervisor: [formData.supervisor as Supervisor],
      workDays: formData.workDays,
      startDate: formData.startDate,
      endDate: formData.endDate,
      status: "active",
      serialNumber: nextSerial,
    }

    const { error } = await supabase.from("interns").insert([newIntern])
    if (error) {
      console.error("Insert error:", error)
    } else {
      const { data: updatedData, error: fetchError } = await supabase
        .from("interns")
        .select("*")
      if (updatedData) setInterns(updatedData)
      resetFormData()
    }
  }

  const handleDeleteIntern = async (id: number) => {
    const { error } = await supabase.from("interns").delete().eq("id", id)
    if (error) {
      console.error("Delete error:", error)
    } else {
      const { data: updatedData, error: fetchError } = await supabase
        .from("interns")
        .select("*")
      if (fetchError) {
        console.error("Fetch error:", fetchError)
      } else if (updatedData) {
        setInterns(updatedData)
      }
    }
  }

  useEffect(() => {
    const fetchInterns = async () => {
      setLoading(true)
      const { data, error } = await supabase.from("interns").select("*")
      if (data) setInterns(data)
      if (error) console.error("Fetch error:", error)
      setLoading(false)
    }

    fetchInterns()
  }, [])

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
            <SelectItem value="Olu">Mr Olu</SelectItem>
            <SelectItem value="Bobgar">Mr Bobgar</SelectItem>
            <SelectItem value="IBB">Mr Ibrahim</SelectItem>
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
            <SelectItem value="H&IS">H & IS</SelectItem>
            <SelectItem value="SA&DM">SA & DM</SelectItem>
            <SelectItem value="R&SP">R & SP</SelectItem>
            <SelectItem value="N&C">N & C</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      {/* Start Date Picker */}
      <Popover>
        <PopoverTrigger asChild>
          <button
            type="button"
            className="w-full px-4 py-2 border rounded-md text-left font-normal text-sm"
          >
            {formData.startDate
              ? format(new Date(formData.startDate), "PPP")
              : "Pick start date"}
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={formData.startDate ? new Date(formData.startDate) : undefined}
            onSelect={(date) =>
              setFormData({ ...formData, startDate: date?.toISOString().split("T")[0] || "" })
            }
          />
        </PopoverContent>
      </Popover>

      {/* End Date Picker */}
      <Popover>
        <PopoverTrigger asChild>
          <button
            type="button"
            className="w-full px-4 py-2 border rounded-md text-left font-normal text-sm"
          >
            {formData.endDate
              ? format(new Date(formData.endDate), "PPP")
              : "Pick end date"}
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={formData.endDate ? new Date(formData.endDate) : undefined}
            onSelect={(date) =>
              setFormData({ ...formData, endDate: date?.toISOString().split("T")[0] || "" })
            }
          />
        </PopoverContent>
      </Popover>
    </div>
  )

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

      {loading ? (
        <div className="flex justify-center items-center h-[50vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-[#638763] border-opacity-75" />
        </div>
      ) : interns.length === 0 ? (
        <div className="flex items-center justify-center h-[50vh] text-center">
          <p className="text-gray-400 text-lg sm:text-xl font-medium">
            No interns registered...
          </p>
        </div>
      ) : (
        <InternTable data={interns} onDelete={handleDeleteIntern} />
      )}
    </div>
  )
}

export default Intern
