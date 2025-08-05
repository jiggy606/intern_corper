import { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { WEEKDAYS, Department, Weekday } from "@/types/User";
import { ReusableButtonOne } from "../button/ReuseableButtonOne";

type DepartmentEntry = {
  name: Department;
  startDate: string;
  endDate: string;
};

export type FormData = {
  name: string;
  phone: string;
  email: string;
  address: string;
  workDays: Weekday[];
  departments: DepartmentEntry[];
  supervisor: string;
  status: string;
  getAvailableDepartments: () => Department[];
};

type Props = {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  toggleWorkDay: (day: Weekday) => void;
};

const ALL_DEPARTMENTS: Department[] = ['SA&DM', 'N&C', 'R&SP', 'H&IS'];

const FormSteps = ({ formData, setFormData, toggleWorkDay }: Props) => {
  // 🔁 Auto-remove expired departments
  const removeExpiredDepartments = () => {
    const today = new Date().toISOString().split("T")[0];
    setFormData((prev) => ({
      ...prev,
      departments: prev.departments.filter(
        (dept) => !dept.endDate || dept.endDate >= today
      ),
    }));
  };

  useEffect(() => {
    removeExpiredDepartments(); // Run once on mount

    const interval = setInterval(() => {
      removeExpiredDepartments(); // Re-run every hour
    }, 60 * 60 * 1000); // 1 hour

    return () => clearInterval(interval); // Cleanup
  }, []);

  const addDepartment = () => {
    setFormData((prev) => {
      if (prev.departments.length >= 3) return prev;
      return {
        ...prev,
        departments: [
          ...prev.departments,
          { name: "" as Department, startDate: "", endDate: "" },
        ],
      };
    });
  };

  const updateDepartment = (
    index: number,
    key: keyof DepartmentEntry,
    value: string
  ) => {
    const updated = [...formData.departments];
    updated[index][key] = value as any;
    setFormData((prev) => ({ ...prev, departments: updated }));
  };

  const removeDepartment = (index: number) => {
    const updated = [...formData.departments];
    updated.splice(index, 1);
    setFormData((prev) => ({ ...prev, departments: updated }));
  };

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
  );

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
            <SelectItem value="Mr Olu">Mr Olu</SelectItem>
            <SelectItem value="Mr Bobgar">Mr Bobgar</SelectItem>
            <SelectItem value="Mr Ibrahim">Mr Ibrahim</SelectItem>
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
      </div>

      <div className="space-y-4">
        <p className="font-medium text-base">Departments:</p>
        {formData.departments.map((dept, index) => (
          <div key={index} className="grid gap-2 border p-4 rounded-md">
            <div className="flex gap-2">
              <Select
                value={dept.name}
                onValueChange={(value) => updateDepartment(index, "name", value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Department" />
                </SelectTrigger>
                <SelectContent>
                  {ALL_DEPARTMENTS.filter(
                    (d) =>
                      !formData.departments.some(
                        (selectedDept, i) => selectedDept.name === d && i !== index
                      )
                  ).map((deptOption) => (
                    <SelectItem key={deptOption} value={deptOption}>
                      {deptOption.replace(/&/g, " & ")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <button
                onClick={() => removeDepartment(index)}
                className="text-red-500 text-sm hover:text-red-600 hover:font-medium cursor-pointer"
              >
                Remove
              </button>
            </div>

            <div className="flex gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <button className="w-full px-4 py-2 border rounded-md text-left text-sm">
                    {dept.startDate ? format(new Date(dept.startDate), "PPP") : "Start Date"}
                  </button>
                </PopoverTrigger>
                <PopoverContent>
                  <Calendar
                    selected={dept.startDate ? new Date(dept.startDate) : null}
                    onChange={(date) =>
                      updateDepartment(index, "startDate", date?.toISOString().split("T")[0] || "")
                    }
                  />
                </PopoverContent>
              </Popover>

              <Popover>
                <PopoverTrigger asChild>
                  <button className="w-full px-4 py-2 border rounded-md text-left text-sm">
                    {dept.endDate ? format(new Date(dept.endDate), "PPP") : "End Date"}
                  </button>
                </PopoverTrigger>
                <PopoverContent>
                  <Calendar
                    selected={dept.endDate ? new Date(dept.endDate) : null}
                    onChange={(date) =>
                      updateDepartment(index, "endDate", date?.toISOString().split("T")[0] || "")
                    }
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        ))}
        <ReusableButtonOne
          onClick={addDepartment}
          disabled={formData.departments.length >= 3}
          className={`text-sm px-2 py-1 font-medium rounded-md border ${
            formData.departments.length >= 3
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'hover:bg-[#638763] bg-white hover:text-white text-[#638763] border-[#638763] cursor-pointer'
          }`}
        >
          + Add Department
        </ReusableButtonOne>
      </div>
    </div>
  );

  return {
    personalInfoStep,
    workDetailsStep,
  };
};

export default FormSteps;
