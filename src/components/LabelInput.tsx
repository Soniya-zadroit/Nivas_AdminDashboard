import React from "react";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Password } from "primereact/password";
import { InputTextarea } from "primereact/inputtextarea";

interface LabelInputProps {
  label: string;
  type?: "text" | "number" | "password" | "textarea" | "email" | "tel";
  placeholder?: string;
  required?: boolean;
  pattern?: string; 
  value: any;
  onChange: (value: any) => void;
  name?: string;
  rows?: number; // for textarea
  error?: string; // 👈 added
}

const LabelInput: React.FC<LabelInputProps> = ({
  label,
  type = "text",
  placeholder,
  required = false,
  pattern,
  value,
  onChange,
  name,
  rows = 3,
  error,
}) => {
  const errorStyle = error ? "p-invalid border-red-500" : ""; // PrimeReact `p-invalid`

  return (
    <div className="flex flex-col gap-1 w-full">
      {/* Label */}
      <label className="text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      {/* Input Components */}
      {type === "number" ? (
        <InputNumber
          name={name}
          value={value}
          onValueChange={(e) => onChange(e.value)}
          placeholder={placeholder}
          className={`w-full !rounded-lg ${errorStyle}`}
        />
      ) : type === "password" ? (
        <Password
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          feedback={false}
          toggleMask
          className={`w-full !rounded-lg ${errorStyle}`}
        />
      ) : type === "textarea" ? (
        <InputTextarea
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={rows}
          autoResize
          className={`w-full !rounded-lg ${errorStyle}`}
        />
      ) : (
        <InputText
          type={type}
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          pattern={pattern}
          className={`w-full !rounded-lg ${errorStyle}`}
        />
      )}

      {/* Error Message */}
      {error && <span className="text-xs text-red-500 mt-1">{error}</span>}
    </div>
  );
};

export default LabelInput;