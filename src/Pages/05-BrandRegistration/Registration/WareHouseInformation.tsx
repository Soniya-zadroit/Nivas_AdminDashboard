import React from "react";
import LabelInput from "../../../components/LabelInput";
import LabelSelect from "../../../components/LabelSelect";
import type { BrandRegistrationInterface } from "./Registration";
import { RadioButton } from "primereact/radiobutton";
import { CheckCircleIcon, XCircleIcon } from "@phosphor-icons/react";
import { MissingInfoAlertMessage } from "../BrandRegistration";

// Matches your interface: wareHouseInfo with fields below
type WareHouseValue = BrandRegistrationInterface["wareHouseInfo"];

interface WareHouseInformationProps {
  value: WareHouseValue;
  onChange: (patch: Partial<WareHouseValue>) => void;
  showValidate: boolean;
  validateStatus: boolean;
  errors?: Partial<Record<keyof WareHouseValue, string>>;
}

const WareHouseInformation: React.FC<WareHouseInformationProps> = ({ value, onChange, showValidate,
  validateStatus, errors}) => {
  const handleToggle = (hasWarehouse: boolean) => {
    onChange({ wareHouse: hasWarehouse });
    // Optionally clear fields when toggled to "No"
    if (!hasWarehouse) {
      onChange({
        wareHouseAddress: "",
        wareHouseCity: "",
        wareHouseDistrict: "",
        wareHouseZipCode: "",
        wareHouseState: ""
      });
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm space-y-4">

      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Warehouse Information</h3>
        {showValidate &&
          (validateStatus ? (
              <CheckCircleIcon
                weight="fill"
                className="text-green-500 w-5 h-5"
              />
          ) : (
              <XCircleIcon weight="fill" className="text-red-500 w-5 h-5" />
          ))}
      </div>

      <div className="space-y-2">
        <p className="text-sm text-gray-600">
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
      </div>

      {value.wareHouse && (
        <div className="space-y-4">
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
            />
            <LabelInput
              label="City/Town"
              type="text"
              required
              placeholder="Enter city/town"
              value={value.wareHouseCity}
              onChange={(val: string) => onChange({ wareHouseCity: val })}
              error={errors?.wareHouseCity}
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
            />
            <LabelInput
              label="Postal code"
              type="text"
              required
              placeholder="Enter Postal code/Pincode"
              value={value.wareHouseZipCode}
              onChange={(val: string) => onChange({ wareHouseZipCode: val })}
              error={errors?.wareHouseZipCode}
            />
          </div>

          {/* State */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <LabelSelect
              label="State"
              required
              value={value.wareHouseState}
              onChange={(val: string) => onChange({ wareHouseState: val })}
              options={[
                { label: "Select State", value: "" },
                { label: "Andhra Pradesh", value: "Andhra Pradesh" },
                { label: "Assam", value: "Assam" },
                { label: "Bihar", value: "Bihar" },
                { label: "Delhi", value: "Delhi" },
                { label: "Gujarat", value: "Gujarat" },
                { label: "Karnataka", value: "Karnataka" },
                { label: "Maharashtra", value: "Maharashtra" },
                { label: "Rajasthan", value: "Rajasthan" },
                { label: "Tamil Nadu", value: "Tamil Nadu" },
                { label: "Telangana", value: "Telangana" },
                // ...extend with full list as needed
              ]}
              error={errors?.wareHouseState}
            />
          </div>
        </div>
      )}

      {showValidate && !validateStatus && (
              <div className="w-fit">
                <MissingInfoAlertMessage />
              </div>
            )}
    </div>
  );
};

export default WareHouseInformation;