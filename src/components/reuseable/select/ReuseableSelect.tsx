import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type OptionGroup = {
  groupLabel: string;
  items: {
    label: string;
    value: string;
  }[];
};

interface ReusableGroupedSelectProps {
  placeholder?: string;
  value?: string;
  onChange: (value: string) => void;
  groups: OptionGroup[];
  label?: string;
  width?: string;
}

const ReusableGroupedSelect = ({
  placeholder = "Select an option",
  value,
  onChange,
  groups,
  label,
  width = "w-full",
}: ReusableGroupedSelectProps) => {
  return (
    <div className="space-y-1 w-full">
      {label && <label className="text-sm font-medium text-gray-700">{label}</label>}

      <Select onValueChange={onChange} defaultValue={value}>
        <SelectTrigger className={width + " bg-gray-100 text-black border border-gray-300 focus:ring-2 focus:ring-green-700"}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>

        <SelectContent>
          {groups.map((group, index) => (
            <SelectGroup key={index}>
              <SelectLabel>{group.groupLabel}</SelectLabel>
              {group.items.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectGroup>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default ReusableGroupedSelect;
