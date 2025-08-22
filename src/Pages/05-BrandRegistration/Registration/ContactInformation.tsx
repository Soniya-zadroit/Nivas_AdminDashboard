import React from "react";
import LabelInput from "../../../components/LabelInput";
import LabelSelect from "../../../components/LabelSelect";
import DropzoneUpload from "../../../components/DropZoneFileUpload";
import type { BrandRegistrationInterface } from "./Registration";
import { CheckCircleIcon, XCircleIcon } from "@phosphor-icons/react";
import { MissingInfoAlertMessage } from "../BrandRegistration";

// If your parent uses 'contactInformation' on BrandRegistrationInterface:
type ContactInformationValue = BrandRegistrationInterface["contactInformation"];

interface ContactInformationProps {
  value: ContactInformationValue;
  onChange: (patch: Partial<ContactInformationValue>) => void;
  showValidate: boolean;
  validateStatus: boolean;
  errors?: Partial<Record<keyof ContactInformationValue, string>>;
}

const ContactInformation: React.FC<ContactInformationProps> = ({ value, onChange, showValidate,
  validateStatus, errors}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Contact Information</h3>
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

      {/* Contact person + Designation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <LabelInput
          label="Contact person"
          type="text"
          required
          placeholder="Full name"
          value={value.contactPerson}
          onChange={(val: string) => onChange({ contactPerson: val })}
          error={errors?.contactPerson}
        />
        <LabelInput
          label="Designation"
          type="text"
          required
          placeholder="Enter your designation"
          value={value.designation}
          onChange={(val: string) => onChange({ designation: val })}
          error={errors?.designation}
        />
      </div>

      {/* Phone number + Email address */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <LabelInput
          label="Phone number"
          type="tel"
          required
          placeholder="+91 000 000 0000"
          value={value.phoneNumber}
          onChange={(val: string) => onChange({ phoneNumber: val })}
          error={errors?.phoneNumber}
        />
        <LabelInput
          label="Email address"
          type="email"
          required
          placeholder="Enter your email address"
          value={value.email}
          onChange={(val: string) => onChange({ email: val })}
          error={errors?.email}
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
        />
        <LabelInput
          label="City/Town"
          type="text"
          required
          placeholder="Enter city/town"
          value={value.city}
          onChange={(val: string) => onChange({ city: val })}
          error={errors?.city}
        />
      </div>

      {/* Postal code + State */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <LabelInput
          label="Postal code"
          type="number"
          required
          placeholder="Enter Postal code/Pincode"
          value={value.zipCode}
          onChange={(val: string) => onChange({ zipCode: val })}
          error={errors?.zipCode}
        />

        <LabelSelect
          label="State"
          required
          value={value.state}
          onChange={(val: string) => onChange({ state: val })}
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
            // ...add the rest as needed
          ]}
          error={errors?.state}
        />
      </div>

      {/* Address proof upload */}
      <DropzoneUpload
        label="Address proof"
        required
        // value={value.proofDocument}
        // onChange={(fileOrPath: File | string | null) =>
        //   onChange({ proofDocument: (fileOrPath as any) ?? "" })
        // }
        accept=".pdf,image/*"
        // maxSizeMB={5}
        // helperText="Upload any scanned address proof documents"
        // buttonLabel="Choose File"
        // showPreview
        // error={errors?.proofDocument}
      />

      {showValidate && !validateStatus && (
              <div className="w-fit">
                <MissingInfoAlertMessage />
              </div>
            )}
    </div>
  );
};

export default ContactInformation;