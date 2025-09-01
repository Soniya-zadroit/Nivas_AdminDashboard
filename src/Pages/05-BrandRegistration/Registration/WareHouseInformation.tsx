import React, { useRef, useEffect } from "react";
import LabelInput from "../../../components/LabelInput";
import LabelSelect from "../../../components/LabelSelect";
import type { BrandRegistrationInterface } from "./Registration";
import { RadioButton } from "primereact/radiobutton";
import { CheckCircleIcon, XCircleIcon } from "@phosphor-icons/react";
import { MissingInfoAlertCount } from "../BrandRegistration";

type WareHouseValue = BrandRegistrationInterface["wareHouseInfo"];

interface WareHouseInformationProps {
  value: WareHouseValue;
  onChange: (patch: Partial<WareHouseValue>) => void;
  showValidate: boolean;
  validateStatus: boolean;
  errors?: Partial<Record<keyof WareHouseValue, string>>;
}

const WareHouseInformation: React.FC<WareHouseInformationProps> = ({
  value,
  onChange,
  showValidate,
  validateStatus,
  errors,
}) => {
  const warehouseRef = useRef<HTMLDivElement>(null);

  // Validation functions
  const validatePincode = (pincode: string): boolean => {
    return /^\d{6}$/.test(pincode);
  };

  // Indian states list (same as ContactInformation)
  const indianStates = [
    { label: "Select State", value: "" },
    {
      label: "Andaman and Nicobar Islands",
      value: "Andaman and Nicobar Islands",
    },
    { label: "Andhra Pradesh", value: "Andhra Pradesh" },
    { label: "Arunachal Pradesh", value: "Arunachal Pradesh" },
    { label: "Assam", value: "Assam" },
    { label: "Bihar", value: "Bihar" },
    { label: "Chandigarh", value: "Chandigarh" },
    { label: "Chhattisgarh", value: "Chhattisgarh" },
    {
      label: "Dadra and Nagar Haveli and Daman and Diu",
      value: "Dadra and Nagar Haveli and Daman and Diu",
    },
    { label: "Delhi", value: "Delhi" },
    { label: "Goa", value: "Goa" },
    { label: "Gujarat", value: "Gujarat" },
    { label: "Haryana", value: "Haryana" },
    { label: "Himachal Pradesh", value: "Himachal Pradesh" },
    { label: "Jammu and Kashmir", value: "Jammu and Kashmir" },
    { label: "Jharkhand", value: "Jharkhand" },
    { label: "Karnataka", value: "Karnataka" },
    { label: "Kerala", value: "Kerala" },
    { label: "Ladakh", value: "Ladakh" },
    { label: "Lakshadweep", value: "Lakshadweep" },
    { label: "Madhya Pradesh", value: "Madhya Pradesh" },
    { label: "Maharashtra", value: "Maharashtra" },
    { label: "Manipur", value: "Manipur" },
    { label: "Meghalaya", value: "Meghalaya" },
    { label: "Mizoram", value: "Mizoram" },
    { label: "Nagaland", value: "Nagaland" },
    { label: "Odisha", value: "Odisha" },
    { label: "Puducherry", value: "Puducherry" },
    { label: "Punjab", value: "Punjab" },
    { label: "Rajasthan", value: "Rajasthan" },
    { label: "Sikkim", value: "Sikkim" },
    { label: "Tamil Nadu", value: "Tamil Nadu" },
    { label: "Telangana", value: "Telangana" },
    { label: "Tripura", value: "Tripura" },
    { label: "Uttar Pradesh", value: "Uttar Pradesh" },
    { label: "Uttarakhand", value: "Uttarakhand" },
    { label: "West Bengal", value: "West Bengal" },
  ];

  const handleToggle = (hasWarehouse: boolean) => {
    onChange({ wareHouse: hasWarehouse });

    // Clear fields when toggled to "No"
    if (!hasWarehouse) {
      onChange({
        wareHouse: false,
        wareHouseAddress: "",
        wareHouseCity: "",
        wareHouseDistrict: "",
        wareHouseZipCode: "",
        wareHouseState: "",
      });
    }
  };

  // Scroll when warehouse section becomes visible
  useEffect(() => {
    if (value.wareHouse && warehouseRef.current) {
      warehouseRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [value.wareHouse]);

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Warehouse Information</h3>
        {showValidate &&
          (validateStatus ? (
            <CheckCircleIcon weight="fill" className="text-green-500 w-5 h-5" />
          ) : (
            <XCircleIcon weight="fill" className="text-red-500 w-5 h-5" />
          ))}
      </div>

      {/* Radio buttons */}
      {/* <div className="space-y-2">
        <p className="text-sm text-gray-600 font-medium">
          Is there a warehouse owned or managed by your brand?
        </p>
        <div className="flex items-center gap-6">
          {[
            { id: "wh-yes", label: "Yes", value: true },
            { id: "wh-no", label: "No", value: false },
          ].map((opt) => (
            <div key={opt.id} className="flex items-center gap-2">
              <RadioButton
                inputId={opt.id}
                name="hasWarehouse"
                value={opt.value}
                checked={value.wareHouse === opt.value}
                onChange={(e) => handleToggle(e.value as boolean)}
              />
              <label htmlFor={opt.id} className="cursor-pointer">
                {opt.label}
              </label>
            </div>
          ))}
        </div>
      </div> */}

      <div className="space-y-2">
        <p className="text-sm text-gray-600 font-medium">
          Is there a warehouse owned or managed by your brand?
        </p>
        <div className="flex items-center gap-6">
          {[
            { id: "wh-yes", label: "Yes", value: true },
            { id: "wh-no", label: "No", value: false },
          ].map((opt) => (
            <div key={opt.id} className="flex items-center gap-2">
              <input
                type="radio"
                id={opt.id}
                name="hasWarehouse"
                value={String(opt.value)}
                checked={value.wareHouse === opt.value}
                onChange={() => handleToggle(opt.value)}
                className="h-4 w-4 text-[#d1a216] border-gray-300 focus:ring-blue-500"
              />
              <label htmlFor={opt.id} className="cursor-pointer">
                {opt.label}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Warehouse fields */}
      {value.wareHouse && (
        <div className="space-y-4" ref={warehouseRef}>
          {/* Address + City/Town */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <LabelInput
              label="Address (Building, Street)"
              type="text"
              required
              placeholder="Enter the Building name, Building No, Street"
              value={value.wareHouseAddress}
              onChange={(val: string) => onChange({ wareHouseAddress: val })}
              error={errors?.wareHouseAddress}
              maxLength={200}
            />
            <LabelInput
              label="City/Town"
              type="text"
              required
              placeholder="Enter city/town"
              value={value.wareHouseCity}
              onChange={(val: string) => onChange({ wareHouseCity: val })}
              error={errors?.wareHouseCity}
              maxLength={50}
            />
          </div>

          {/* District + Postal code */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <LabelInput
              label="District"
              type="text"
              required
              placeholder="Enter district"
              value={value.wareHouseDistrict}
              onChange={(val: string) => onChange({ wareHouseDistrict: val })}
              error={errors?.wareHouseDistrict}
              maxLength={50}
            />
            <LabelInput
              label="Postal Code"
              type="text"
              required
              placeholder="Enter Postal code/Pincode"
              value={value.wareHouseZipCode}
              onChange={(val: string) => onChange({ wareHouseZipCode: val })}
              error={
                errors?.wareHouseZipCode ||
                (!validatePincode(value.wareHouseZipCode) &&
                value.wareHouseZipCode
                  ? "Please enter a valid 6-digit pincode"
                  : undefined)
              }
              maxLength={6}
            />
          </div>

          {/* State */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <LabelSelect
              label="State"
              required
              value={value.wareHouseState}
              onChange={(val: string) => onChange({ wareHouseState: val })}
              options={indianStates}
              error={errors?.wareHouseState}
            />
          </div>
        </div>
      )}

      {/* Missing info alert */}
      {showValidate && !validateStatus && (
        <div className="w-fit">
          <MissingInfoAlertCount count={Object.keys(errors || {}).length} />
        </div>
      )}
    </div>
  );
};

export default WareHouseInformation;
