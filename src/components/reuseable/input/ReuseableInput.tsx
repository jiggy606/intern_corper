import { Input } from "@/components/ui/input";
import React from "react";

type ReusableInputProps = {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  name?: string;
  className?: string;
};

const ReusableInput: React.FC<ReusableInputProps> = ({
  label,
  placeholder,
  value,
  onChange,
  type = "text",
  name,
  className = "",
}) => {
  return (
    <div className="flex flex-col space-y-2 w-full">
      {label && <label className="text-sm font-medium text-gray-900">{label}</label>}
      <Input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
        className={`bg-gray-100 text-gray-900 placeholder:text-gray-300 ${className}`}
      />
    </div>
  );
};

export default ReusableInput;
