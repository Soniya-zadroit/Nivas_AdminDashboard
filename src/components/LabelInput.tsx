import React from "react";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Password } from "primereact/password";
import { InputTextarea } from "primereact/inputtextarea";

interface LabelInputProps {
  label: string;
  type?:
    | "text"
    | "number"
    | "password"
    | "textarea"
    | "email"
    | "tel"
    | "value";
  placeholder?: string;
  required?: boolean;
  pattern?: string;
  value: any;
  onChange: (value: any) => void;
  name?: string;
  rows?: number; // for textarea
  error?: string; // 👈 added
  maxLength?: number; // 👈 added
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
  maxLength,
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
        <InputText
          name={name}
          value={value}
          type="text" // use text to control length
          maxLength={maxLength} // restrict length
          placeholder={placeholder}
          className={`w-full !rounded-lg ${errorStyle}`}
          onChange={(e) => {
            // Only allow numbers
            let val = e.target.value.replace(/\D/g, "");
            // Enforce maxLength
            if (maxLength) val = val.slice(0, maxLength);
            onChange(val);
          }}
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
          type="text"
          name={name}
          value={value}
          onChange={(e) => {
            let val = e.target.value.toUpperCase(); // GSTIN/CIN are usually uppercase
            if (label === "GSTIN") {
              // Allow only 15 alphanumeric characters
              val = val.replace(/[^A-Z0-9]/g, "").slice(0, 15);
            } else if (label === "CIN") {
              // Allow only 21 alphanumeric characters
              val = val.replace(/[^A-Z0-9]/g, "").slice(0, 21);
            }
            onChange(val);
          }}
          placeholder={placeholder}
          maxLength={label === "GSTIN" ? 15 : label === "CIN" ? 21 : undefined}
          className={`w-full !rounded-lg ${errorStyle}`}
        />
      )}

      {/* Error Message */}
      {error && <span className="text-xs text-red-500 mt-1">{error}</span>}
    </div>
  );
};

export default LabelInput;
