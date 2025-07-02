"use client"

import { useEffect, useState } from "react"
import CorperTable from "@/components/table/CorperTable"
import UserTable from "@/components/table/UserTable"
import FormSteps from "@/components/reuseable/forms/FormSteps"
import MultiStepDialogBox from "@/components/reuseable/dialogbox/MultiStepDialogBox"
import { Plus } from "lucide-react"
import { User, Weekday, Department, Supervisor } from "@/types/User"
import { ReusableButtonOne } from "@/components/reuseable/button/ReuseableButtonOne"
import { supabase } from "@/lib/supabaseClient"

const Corpers = () => {
  const [corpers, setCorpers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    workDays: [] as Weekday[],
    departments: [] as {
      name: Department
      startDate: string
      endDate: string
    }[],
    supervisor: "",
    status: "",
    getAvailableDepartments: () => {
      const allDepartments: Department[] = ["H&IS", "SA&DM", "R&SP", "N&C"]
      const selected = formData.departments.map((d) => d.name)
      return allDepartments.filter((d) => !selected.includes(d))
    }
  })

  const isStepOneValid = formData.name && formData.phone && formData.email && formData.address
  const isStepTwoValid =
    formData.supervisor &&
    formData.workDays.length > 0 &&
    formData.departments.length > 0 &&
    formData.departments.every(
      (dept) => dept.name && dept.startDate && dept.endDate
    )

  const resetFormData = () => {
    setFormData({
      name: "",
      phone: "",
      email: "",
      address: "",
      workDays: [],
      departments: [],
      supervisor: "",
      status: "",
      getAvailableDepartments: () => {
        const allDepartments: Department[] = ["H&IS", "SA&DM", "R&SP", "N&C"]
        return allDepartments
      }
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

  const handleAddCorper = async () => {
    const { data: existingCorpers } = await supabase
      .from("corpers")
      .select("serialNumber")
      .order("serialNumber", { ascending: false })
      .limit(1)

    const nextSerial = existingCorpers?.[0]?.serialNumber
      ? existingCorpers[0].serialNumber + 1
      : 1

    const newCorper: Omit<User, "id"> & { serialNumber: number } = {
      name: formData.name,
      phoneNumber: formData.phone,
      emailAddress: formData.email,
      address: formData.address,
      department: formData.departments,
      supervisor: [formData.supervisor as Supervisor],
      workDays: formData.workDays,
      startDate: formData.departments[0]?.startDate || "",
      endDate: formData.departments[formData.departments.length - 1]?.endDate || "",
      status: "active",
      serialNumber: nextSerial,
    }

    const { error } = await supabase.from("corpers").insert([newCorper])
    if (error) {
      console.error("Insert error:", error)
    } else {
      const { data: updatedData, error: fetchError } = await supabase
        .from("corpers")
        .select("*")
      if (updatedData) setCorpers(updatedData)
      resetFormData()
    }
  }

  const handleDeleteCorper = async (id: number) => {
    const { error } = await supabase.from("corpers").delete().eq("id", id)
    if (error) {
      console.error("Delete error:", error)
    } else {
      const { data: updatedData, error: fetchError } = await supabase
        .from("corpers")
        .select("*")
      if (fetchError) {
        console.error("Fetch error:", fetchError)
      } else if (updatedData) {
        setCorpers(updatedData)
      }
    }
  }

  useEffect(() => {
    const fetchCorpers = async () => {
      setLoading(true)
      const { data, error } = await supabase.from("corpers").select("*")
      if (data) setCorpers(data)
      if (error) console.error("Fetch error:", error)
      setLoading(false)
    }

    fetchCorpers()
  }, [])

  const { personalInfoStep, workDetailsStep } = FormSteps({
    formData,
    setFormData,
    toggleWorkDay,
  })

  return (
    <div className="space-y-6 px-4 sm:px-4 md:px-8 py-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="space-y-2">
          <h1 className="font-semibold text-2xl sm:text-3xl">Corpers</h1>
          <p className="text-sm text-gray-400 font-medium">
            Manage your workforce efficiently
          </p>
        </div>

        <MultiStepDialogBox
          triggerButton={
            <ReusableButtonOne className="flex gap-2 w-full md:w-auto hover:bg-[#638763] bg-white hover:text-white text-[#638763] border border-[#638763] cursor-pointer">
              <Plus size={16} /> Add Corper
            </ReusableButtonOne>
          }
          steps={[
            { title: "Corper Personal Info", content: personalInfoStep },
            { title: "Corper Work Details", content: workDetailsStep },
          ]}
          onSubmit={handleAddCorper}
          canProceed={!!isStepOneValid}
          canSubmit={!!isStepTwoValid}
        />
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-[50vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-[#638763] border-opacity-75" />
        </div>
      ) : corpers.length === 0 ? (
        <div className="flex items-center justify-center h-[50vh] text-center">
          <p className="text-gray-400 text-lg sm:text-xl font-medium">
            No Corpers registered...
          </p>
        </div>
      ) : (
        <UserTable data={corpers} onDelete={handleDeleteCorper} tableType="corper" />
      )}
    </div>
  )
}

export default Corpers
