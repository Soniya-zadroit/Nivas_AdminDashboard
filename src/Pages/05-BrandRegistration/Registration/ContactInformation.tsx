import React from "react";
import LabelInput from "../../../components/LabelInput";
import LabelSelect from "../../../components/LabelSelect";
import DropzoneUpload from "../../../components/DropZoneFileUpload";
import type { BrandRegistrationInterface } from "./Registration";
import { CheckCircleIcon, XCircleIcon } from "@phosphor-icons/react";
import {
  MissingInfoAlertCount,
  MissingInfoAlertDocuments,
} from "../BrandRegistration";

type ContactInformationValue = BrandRegistrationInterface["contactInformation"];

interface ContactInformationProps {
  value: ContactInformationValue;
  brandName: string;
  onChange: (patch: Partial<ContactInformationValue>) => void;
  showValidate: boolean;
  validateStatus: boolean;
  errors?: Partial<Record<keyof ContactInformationValue, string>>;
}

const ContactInformation: React.FC<ContactInformationProps> = ({
  value,
  brandName,
  onChange,
  showValidate,
  validateStatus,
  errors,
}) => {
  console.log(
    "ContactInformation.tsx / brandName / 25 -------------------  ",
    brandName
  );
  // Validation functions
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    return /^[6-9]\d{9}$/.test(phone); // Indian mobile number format
  };

  const validatePincode = (pincode: string): boolean => {
    return /^\d{6}$/.test(pincode); // Indian pincode format
  };

  // Indian states list
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

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Contact Information</h3>
        {showValidate &&
          (validateStatus ? (
            <CheckCircleIcon weight="fill" className="text-green-500 w-5 h-5" />
          ) : (
            <XCircleIcon weight="fill" className="text-red-500 w-5 h-5" />
          ))}
      </div>

      {/* Contact person + Designation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <LabelInput
          label="Contact Person"
          type="text"
          required
          placeholder="Full name"
          value={value.contactPerson}
          onChange={(val: string) => onChange({ contactPerson: val })}
          error={errors?.contactPerson}
          maxLength={50}
        />
        <LabelInput
          label="Designation"
          type="text"
          required
          placeholder="Enter your designation"
          value={value.designation}
          onChange={(val: string) => onChange({ designation: val })}
          error={errors?.designation}
          maxLength={50}
        />
      </div>

      {/* Phone number + Email address */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <LabelInput
          label="Phone Number"
          type="tel"
          required
          placeholder="+91 000 000 0000"
          value={value.phoneNumber}
          onChange={(val: string) => onChange({ phoneNumber: val })}
          error={
            errors?.phoneNumber ||
            (!validatePhone(value.phoneNumber) && value.phoneNumber
              ? "Please enter a valid 10-digit mobile number"
              : undefined)
          }
          maxLength={10}
        />

        <LabelInput
          label="Email Address"
          type="email"
          required
          placeholder="Enter your email address"
          value={value.email}
          onChange={(val: string) => onChange({ email: val })}
          error={
            errors?.email ||
            (!validateEmail(value.email) && value.email
              ? "Please enter a valid email address"
              : undefined)
          }
          maxLength={100}
        />
      </div>

      {/* Address + City/Town */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <LabelInput
          label="Address (Building, Street)"
          type="text"
          required
          placeholder="Enter the Building name, Building No, Street"
          value={value.address}
          onChange={(val: string) => onChange({ address: val })}
          error={errors?.address}
          maxLength={200}
        />
        <LabelInput
          label="City/Town"
          type="text"
          required
          placeholder="Enter city/town"
          value={value.city}
          onChange={(val: string) => onChange({ city: val })}
          error={errors?.city}
          maxLength={50}
        />
      </div>

      {/* Postal code + State */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <LabelInput
          label="Postal Code"
          type="text"
          required
          placeholder="Enter Postal code/Pincode"
          value={value.zipCode}
          onChange={(val: string) => onChange({ zipCode: val })}
          error={
            errors?.zipCode ||
            (!validatePincode(value.zipCode) && value.zipCode
              ? "Please enter a valid 6-digit pincode"
              : undefined)
          }
          maxLength={6}
        />

        <LabelSelect
          label="State"
          required
          value={value.state}
          onChange={(val: string) => onChange({ state: val })}
          options={indianStates}
          error={errors?.state}
        />
      </div>

      {/* Address proof upload */}
      <DropzoneUpload
        label="Address Proof"
        brandName={brandName}
        required
        // Uncomment when implementing file handling
        value={value.proofDocument}
        onChange={(_url, _brandName, filePath) => {
          console.log(
            "ContactInformation.tsx / filePath / 226 -------------------  ",
            filePath
          );
          // if (!value.brandName) {
          //   alert("Please enter Brand Name before uploading the logo");
          //   return;
          // }
          onChange({ proofDocument: filePath ?? undefined });
        }}
        accept=".pdf,.jpg,.jpeg,.png"
        // maxSizeMB={5}
        // helperText="Upload any scanned address proof documents (Aadhar Card, Passport, Utility Bill, etc.) - Max 5MB"
        // buttonLabel="Choose File"
        // showPreview
        // error={errors?.proofDocument}
      />

      {/* Validation Summary */}
      {showValidate && !validateStatus && (
        <div className="w-fit">
          <MissingInfoAlertCount count={Object.keys(errors || {}).length} />
        </div>
      )}

      {showValidate && errors?.proofDocument && (
        <div className="w-fit mt-2">
          <MissingInfoAlertDocuments />
        </div>
      )}
    </div>
  );
};

export default ContactInformation;
