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
    | "url"
    | "instagram";
  placeholder?: string;
  required?: boolean;
  pattern?: string;
  value: any;
  onChange: (value: any) => void;
  name?: string;
  rows?: number;
  error?: string;
  maxLength?: number;
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
  const errorStyle = error ? "p-invalid border-red-500" : "";

  // Generate unique random name to prevent autofill
  const randomName = React.useMemo(
    () => `field_${Math.random().toString(36).substr(2, 9)}`,
    []
  );

  const handleInstagramInput = (inputValue: string) => {
    console.log("Instagram input received:", inputValue);

    let processedValue = inputValue.trim();
    let finalUrl = "";

    // If it's already a full Instagram URL, use it as is
    if (processedValue.includes("instagram.com/")) {
      // Extract clean URL
      const urlMatch = processedValue.match(
        /(?:https?:\/\/)?(?:www\.)?instagram\.com\/([a-zA-Z0-9._]+)/
      );
      if (urlMatch) {
        const username = urlMatch[1];
        finalUrl = `https://www.instagram.com/${username}`;
        console.log("Extracted URL from full link:", finalUrl);
      } else {
        finalUrl = processedValue;
      }
    } else {
      // Handle username input
      // Remove @ symbol if present
      if (processedValue.startsWith("@")) {
        processedValue = processedValue.slice(1);
      }

      // Clean the username - only allow valid Instagram characters
      processedValue = processedValue.toLowerCase().replace(/[^a-z0-9._]/g, "");

      // Instagram username restrictions
      if (processedValue.length > 30) {
        processedValue = processedValue.slice(0, 30);
      }

      // Convert username to full URL for backend
      if (processedValue) {
        finalUrl = `https://www.instagram.com/${processedValue}`;
        console.log("Converted username to URL:", finalUrl);
      }
    }

    console.log("Final value being sent to backend:", finalUrl);
    onChange(finalUrl);
  };

  const handleInputChange = (inputValue: string) => {
    let val = inputValue;

    switch (type) {
      case "email":
        // Basic email validation - allow alphanumeric, @ . _ - +
        val = val.toLowerCase().replace(/[^a-z0-9@._+-]/g, "");
        if (maxLength) val = val.slice(0, maxLength);
        break;

      case "tel":
        // Phone number - only numbers, max 10 digits
        val = val.replace(/\D/g, "").slice(0, 10);
        break;

      case "url":
        // Website URL - no spaces, basic URL characters
        val = val.toLowerCase().replace(/\s/g, "");
        if (maxLength) val = val.slice(0, maxLength);
        break;

      case "instagram":
        // Handle Instagram input with special processing
        handleInstagramInput(inputValue);
        return; // Exit early since handleInstagramInput calls onChange

      case "textarea":
        // For descriptions - allow most characters but limit length
        if (maxLength) val = val.slice(0, maxLength);
        break;

      case "text":
      default:
        // Handle specific labels
        if (label === "GSTIN") {
          // GSTIN format: 2 digits + 10 chars + 1 digit + 1 char + 1 digit
          val = val
            .toUpperCase()
            .replace(/[^A-Z0-9]/g, "")
            .slice(0, 15);
        } else if (label === "CIN") {
          // CIN format: 21 characters alphanumeric
          val = val
            .toUpperCase()
            .replace(/[^A-Z0-9]/g, "")
            .slice(0, 21);
        } else if (
          label.toLowerCase().includes("name") ||
          label.toLowerCase().includes("person") ||
          label.toLowerCase().includes("city") ||
          label.toLowerCase().includes("state") ||
          label.toLowerCase().includes("district")
        ) {
          // Names and location fields - only letters and spaces
          val = val.replace(/[^a-zA-Z\s]/g, "");
          if (maxLength) val = val.slice(0, maxLength);
        } else if (
          label.toLowerCase().includes("address") ||
          label.toLowerCase().includes("designation")
        ) {
          // Address and designation - alphanumeric with common punctuation
          val = val.replace(/[^a-zA-Z0-9\s,.-]/g, "");
          if (maxLength) val = val.slice(0, maxLength);
        } else if (
          label.toLowerCase().includes("postal") ||
          label.toLowerCase().includes("pincode") ||
          label.toLowerCase().includes("zip")
        ) {
          // Postal/ZIP codes - only numbers, max 6 digits for Indian PIN
          val = val.replace(/\D/g, "").slice(0, 6);
        } else {
          // Default text handling
          if (maxLength) val = val.slice(0, maxLength);
        }
        break;
    }

    onChange(val);
  };

  // Helper function to display username in input field
  const getDisplayValue = () => {
    if (type === "instagram" && value) {
      // If value is a full URL, extract username for display
      if (value.includes("instagram.com/")) {
        const match = value.match(/instagram\.com\/([a-zA-Z0-9._]+)/);
        return match ? match[1] : value;
      }
      return value;
    }
    return value;
  };

  return (
    <div className="flex flex-col gap-1 w-full">
      {/* Label */}
      <label className="text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      {/* Input Components */}
      {/* Hidden decoy input to catch autofill */}
      <input
        type="text"
        name={name}
        style={{
          position: "absolute",
          left: "-9999px",
          width: "1px",
          height: "1px",
          opacity: 0,
          pointerEvents: "none",
        }}
        tabIndex={-1}
        autoComplete="on"
      />

      {type === "number" ? (
        <InputText
          name={randomName}
          value={value}
          type="text"
          maxLength={maxLength}
          placeholder={placeholder}
          className={`w-full !rounded-lg ${errorStyle}`}
          autoComplete="new-field"
          data-form-type="other"
          readOnly
          onFocus={(e) => e.target.removeAttribute("readOnly")}
          onChange={(e) => {
            let val = e.target.value.replace(/\D/g, "");
            if (maxLength) val = val.slice(0, maxLength);
            onChange(val);
          }}
        />
      ) : type === "password" ? (
        <Password
          name={randomName}
          value={value}
          onChange={(e) => handleInputChange(e.target.value)}
          placeholder={placeholder}
          feedback={false}
          toggleMask
          className={`w-full !rounded-lg ${errorStyle}`}
          autoComplete="new-password"
          readOnly
          onFocus={(e) => e.target.removeAttribute("readOnly")}
        />
      ) : type === "textarea" ? (
        <div className="relative">
          <InputTextarea
            name={randomName}
            value={value}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder={placeholder}
            rows={rows}
            autoResize
            className={`w-full !rounded-lg ${errorStyle}`}
            maxLength={maxLength}
            autoComplete="new-field"
            readOnly
            onFocus={(e) => e.target.removeAttribute("readOnly")}
          />
          {maxLength && (
            <div className="text-xs text-gray-500 mt-1 text-right">
              {value?.length || 0}/{maxLength}
            </div>
          )}
        </div>
      ) : type === "instagram" ? (
        <div className="relative">
          <InputText
            name={randomName}
            value={getDisplayValue()}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder={placeholder}
            className={`w-full !rounded-lg ${errorStyle}`}
            maxLength={150}
            autoComplete="new-field"
            data-form-type="other"
            readOnly
            onFocus={(e) => e.target.removeAttribute("readOnly")}
          />
        </div>
      ) : (
        <InputText
          type="text"
          name={randomName}
          value={value}
          onChange={(e) => handleInputChange(e.target.value)}
          placeholder={placeholder}
          className={`w-full !rounded-lg ${errorStyle}`}
          maxLength={maxLength}
          autoComplete="new-field"
          data-form-type="other"
          readOnly
          onFocus={(e) => e.target.removeAttribute("readOnly")}
        />
      )}

      {/* Error Message */}
      {error && <span className="text-xs text-red-500 mt-1">{error}</span>}
    </div>
  );
};

export default LabelInput;
