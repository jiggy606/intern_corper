"use client"

import { useEffect, useState } from "react"
import InternTable from "@/components/table/InternTable"
import FormSteps from "@/components/reuseable/forms/FormSteps"
import MultiStepDialogBox from "@/components/reuseable/dialogbox/MultiStepDialogBox"
import { Plus } from "lucide-react"
import { User, Weekday, Department, Supervisor } from "@/types/User"
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
      workDays: formData.workDays,
      startDate: formData.departments[0]?.startDate || "",
      endDate: formData.departments[formData.departments.length - 1]?.endDate || "",
      department: formData.departments,
      supervisor: [formData.supervisor as Supervisor],
      status: formData.status,
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

  const { personalInfoStep, workDetailsStep } = FormSteps({
    formData,
    setFormData,
    toggleWorkDay,
  })

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
