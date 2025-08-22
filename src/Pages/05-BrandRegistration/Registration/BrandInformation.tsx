import React from "react";
import LabelInput from "../../../components/LabelInput";
import LabelSelect from "../../../components/LabelSelect";
// import DropzoneUpload from "../../../components/DropZoneFileUpload";
import type { BrandRegistrationInterface } from "./Registration";
import DropzoneUpload from "../../../components/DropZoneFileUpload";
import { CheckCircleIcon, XCircleIcon } from "@phosphor-icons/react";
import { MissingInfoAlertMessage } from "../BrandRegistration";

type BrandInformationValue = BrandRegistrationInterface["brandInformation"];

interface BrandInformationProps {
  value: BrandInformationValue;
  onChange: (patch: Partial<BrandInformationValue>) => void;
  showValidate: boolean;
  validateStatus: boolean;
  errors?: Partial<Record<keyof BrandInformationValue, string>>;
}

const BrandInformation: React.FC<BrandInformationProps> = ({
  value,
  onChange,
  showValidate,
  validateStatus,
  errors,
}) => {

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Brand Information</h3>
        {showValidate &&
          (validateStatus ? (
            <CheckCircleIcon weight="fill" className="text-green-500 w-5 h-5" />
          ) : (
            <XCircleIcon weight="fill" className="text-red-500 w-5 h-5" />
          ))}
      </div>

      {/* Brand Name + Product Category */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <LabelInput
          label="Brand Name"
          type="text"
          required
          placeholder="Enter your brand name"
          value={value.brandName}
          onChange={(val: string) => onChange({ brandName: val })}
          error={errors?.brandName}
        />

        <LabelSelect
          label="Product Category"
          value={value.productCategory}
          onChange={(val: string) => onChange({ productCategory: val })}
          options={[
            { label: "Fashion", value: "fashion" },
            { label: "Food", value: "food" },
            { label: "Electronics", value: "electronics" },
          ]}
          error={errors?.productCategory}
          required
        />
      </div>

      {/* Brand Logo */}
      <DropzoneUpload
        label="Brand logo"
        // required
        // value={value.brandLogoPath}
        // onChange={(file: File | null) => {
        //   onChange({ brandLogoPath: file });
        // }}
        accept="image/*"
        // maxSizeMB={5}
        // helperText="Drop your logo here or click to browse"
        // buttonLabel="Choose File"
        // showPreview
        // error={errors?.brandLogoPath}
      />

      {/* Brand Description */}
      <LabelInput
        label="Brand Description"
        type="textarea"
        placeholder="Describe your brand, products and what makes you unique"
        value={value.brandDescription}
        onChange={(val: string) => onChange({ brandDescription: val })}
        error={errors?.brandDescription}
      />

      {/* Website + Instagram */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <LabelInput
          label="Website URL"
          type="text"
          placeholder="https://yourbrand.com"
          value={value.websiteURL}
          onChange={(val: string) => onChange({ websiteURL: val })}
          error={errors?.websiteURL}
        />

        <LabelInput
          label="Instagram Handle"
          type="text"
          placeholder="@yourbrand"
          value={value.instragram}
          onChange={(val: string) => onChange({ instragram: val })}
          error={errors?.instragram}
        />
      </div>

      {/* Optional Phone Number (uncomment if used in your type)
      <LabelInput
        label="Phone Number"
        type="tel"
        required
        placeholder="Enter phone number"
        value={value.phoneNumber ?? ""}
        onChange={(val: string) => onChange({ phoneNumber: val })}
      />
      */}

      {showValidate && !validateStatus && (
        <div className="w-fit">
          <MissingInfoAlertMessage />
        </div>
      )}
    </div>
  );
};

export default BrandInformation;
