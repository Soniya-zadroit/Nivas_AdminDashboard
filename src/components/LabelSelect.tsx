import React from "react";
import { Dropdown } from "primereact/dropdown";

interface LabelSelectProps {
  label: string;
  value: string | number | null;
  onChange: React.Dispatch<React.SetStateAction<any>>;
  options: { label: string; value: string }[];
  required?: boolean;
  error?: string; // ✅ add error prop
}

const LabelSelect: React.FC<LabelSelectProps> = ({
  label,
  value,
  onChange,
  options,
  required = false,
  error,
}) => {
  const errorStyle = error ? "p-invalid border-red-500" : ""; // PrimeReact `p-invalid
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <Dropdown
        value={value}
        options={options}
        onChange={(e) => onChange(e.value)}
        placeholder="Select"
        className={`w-full !rounded-lg ${errorStyle}`}
        required={required}
      />
      {error && <span className="text-xs text-red-500 mt-1">{error}</span>}
    </div>
  );
};

export default LabelSelect;