import React from "react";
import LabelInput from "../../../components/LabelInput";
import DropzoneUpload from "../../../components/DropZoneFileUpload";
import type { BrandRegistrationInterface } from "./Registration";
import { CheckCircleIcon, XCircleIcon } from "@phosphor-icons/react";
import { MissingInfoAlertMessage } from "../BrandRegistration";

// If your parent uses 'taxInformation' on BrandRegistrationInterface:
type TaxInformationValue = BrandRegistrationInterface["taxInformation"];

interface TaxInformationProps {
  value: TaxInformationValue;
  onChange: (patch: Partial<TaxInformationValue>) => void;
  showValidate: boolean;
  validateStatus: boolean;
  errors?: Partial<Record<keyof TaxInformationValue, string>>;
}

const TaxInformation: React.FC<TaxInformationProps> = ({ value, onChange, showValidate,
  validateStatus, errors}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Tax Information</h3>
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

      {/* GSTIN + CIN */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <LabelInput
          label="GSTIN"
          type="text"
          required
          placeholder="Enter GSTIN"
          value={value.gstinNumber}
          onChange={(val: string) => onChange({ gstinNumber: val })}
          error={errors?.gstinNumber}
        />
        <LabelInput
          label="CIN"
          type="text"
          required
          placeholder="Enter CIN"
          value={value.cinNumber}
          onChange={(val: string) => onChange({ cinNumber: val })}
          error={errors?.cinNumber}
        />
      </div>

      {/* GST Registration Certificate + PAN Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <DropzoneUpload
          label="GST Registration Certificate"
          required
          // value={value.gstDocumant}
          // onChange={(fileOrPath: File | string | null) =>
          //   onChange({ gstDocumant: (fileOrPath as any) ?? "" })
          // }
          accept=".pdf,image/*"
          // maxSizeMB={5}
          // helperText="Upload a scanned copy of your GST Registration Certificate"
          // buttonLabel="Choose File"
          // showPreview
          // error={errors?.gstDocumant}
        />

        <DropzoneUpload
          label="PAN Card"
          required
          // value={value.panDocument}
          // onChange={(fileOrPath: File | string | null) =>
          //   onChange({ panDocument: (fileOrPath as any) ?? "" })
          // }
          accept=".pdf,image/*"
          // maxSizeMB={5}
          // helperText="Upload a scanned copy of your PAN Card"
          // buttonLabel="Choose File"
          // showPreview
          // error={errors?.panDocument} 
        />
      </div>

      {showValidate && !validateStatus && (
              <div className="w-fit">
                <MissingInfoAlertMessage />
              </div>
            )}
    </div>
  );
};

export default TaxInformation;