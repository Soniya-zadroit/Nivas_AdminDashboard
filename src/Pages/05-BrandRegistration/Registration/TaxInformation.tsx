import React from "react";
import LabelInput from "../../../components/LabelInput";
import DropzoneUpload from "../../../components/DropZoneFileUpload";
import type { BrandRegistrationInterface } from "./Registration";
import { CheckCircleIcon, XCircleIcon } from "@phosphor-icons/react";
import {
  MissingInfoAlertCount,
  MissingInfoAlertDocuments,
} from "../BrandRegistration";

type TaxInformationValue = BrandRegistrationInterface["taxInformation"];

interface TaxInformationProps {
  value: TaxInformationValue;
  brandName: string;
  onChange: (patch: Partial<TaxInformationValue>) => void;
  showValidate: boolean;
  validateStatus: boolean;
  errors?: Partial<Record<keyof TaxInformationValue, string>>;
}

const TaxInformation: React.FC<TaxInformationProps> = ({
  value,
  brandName,
  onChange,
  showValidate,
  validateStatus,
  errors,
}) => {
  // Validation functions
  const validateGSTIN = (gstin: string): boolean => {
    // GSTIN format: 2 digits (state code) + 10 alphanumeric (PAN) + 1 digit (entity number) + 1 character (Z) + 1 digit (check digit)
    const gstinRegex = /^[0-3][0-9][A-Z]{5}[0-9]{4}[A-Z][1-9A-Z][Z][0-9A-Z]$/;
    return gstinRegex.test(gstin);
  };

  const validateCIN = (cin: string): boolean => {
    // CIN format: 21 characters - L/U + 5 digits (industry code) + 2 characters (state code) + 4 digits (year) + 3 characters (type) + 6 digits (registration number)
    const cinRegex = /^[LU][0-9]{5}[A-Z]{2}[0-9]{4}[A-Z]{3}[0-9]{6}$/;
    return cinRegex.test(cin);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Tax Information</h3>
        {showValidate &&
          (validateStatus ? (
            <CheckCircleIcon weight="fill" className="text-green-500 w-5 h-5" />
          ) : (
            <XCircleIcon weight="fill" className="text-red-500 w-5 h-5" />
          ))}
      </div>

      {/* GSTIN + CIN */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <LabelInput
            label="GSTIN"
            type="text"
            required
            placeholder="Enter GSTIN"
            value={value.gstinNumber}
            onChange={(val: string) => onChange({ gstinNumber: val })}
            error={
              errors?.gstinNumber ||
              (!validateGSTIN(value.gstinNumber) && value.gstinNumber
                ? "Please enter a valid GSTIN (15 characters)"
                : undefined)
            }
            maxLength={15}
          />
          {/* <p className="text-xs text-gray-500">
            Format: 2 digits + 10 characters + 3 characters (e.g., 22AAAAA0000A1Z5)
          </p> */}
        </div>

        <div className="space-y-1">
          <LabelInput
            label="CIN"
            type="text"
            required
            placeholder="Enter CIN"
            value={value.cinNumber}
            onChange={(val: string) => onChange({ cinNumber: val })}
            error={
              errors?.cinNumber ||
              (!validateCIN(value.cinNumber) && value.cinNumber
                ? "Please enter a valid CIN (21 characters)"
                : undefined)
            }
            maxLength={21}
          />
          {/* <p className="text-xs text-gray-500">
            Format: L/U + 5 digits + 2 letters + 4 digits + 3 letters + 6 digits
          </p> */}
        </div>
      </div>

      {/* GST Registration Certificate + PAN Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <DropzoneUpload
          label="GST Registration Certificate"
          brandName={brandName}
          required
          // Uncomment when implementing file handling
          value={value.gstDocumant}
          // onChange={(fileOrPath: File | string | null) =>
          //   onChange({ gstDocument: (fileOrPath as any) ?? "" })
          // }
          onChange={(_url, _brandName, filePath) => {
            console.log(
              "TaxInformation.tsx / filePath / 111 -------------------  ",
              filePath
            );

            // if (!value.brandName) {
            //   alert("Please enter Brand Name before uploading the logo");
            //   return;
            // }
            onChange({ gstDocumant: filePath ?? undefined });
          }}
          accept=".pdf,.jpg,.jpeg,.png"
          // maxSizeMB={5}
          // helperText="Upload a scanned copy of your GST Registration Certificate (Max 5MB)"
          // buttonLabel="Choose File"
          // showPreview
          // error={errors?.gstDocument}
        />

        <DropzoneUpload
          label="PAN Card"
          brandName={brandName}
          required
          // Uncomment when implementing file handling
          value={value.panDocument}
          // onChange={(fileOrPath: File | string | null) =>
          //   onChange({ panDocument: (fileOrPath as any) ?? "" })
          // }
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={(_url, _brandName, filePath) => {
            console.log(
              "TaxInformation.tsx / filePath / 140 -------------------  ",
              filePath
            );
            // if (!value.brandName) {
            //   alert("Please enter Brand Name before uploading the logo");
            //   return;
            // }
            onChange({ panDocument: filePath ?? undefined });
          }}
          // maxSizeMB={5}
          // helperText="Upload a scanned copy of your PAN Card (Max 5MB)"
          // buttonLabel="Choose File"
          // showPreview
          // error={errors?.panDocument}
        />
      </div>

      {/* Additional helpful information */}
      {/* <div className="bg-blue-50 p-3 rounded-lg">
        <h4 className="text-sm font-medium text-blue-800 mb-2">Important Notes:</h4>
        <ul className="text-xs text-blue-700 space-y-1">
          <li>• GSTIN should be exactly 15 characters and registered under your business name</li>
          <li>• CIN is required for registered companies (21 characters)</li>
          <li>• Ensure all uploaded documents are clear and readable</li>
          <li>• Supported formats: PDF, JPG, JPEG, PNG (Max 5MB each)</li>
        </ul>
      </div> */}

      {/* Validation Summary */}
      {showValidate && !validateStatus && (
        <div className="w-fit">
          <MissingInfoAlertCount count={Object.keys(errors || {}).length} />
        </div>
      )}

      {showValidate && !validateStatus && (
        <div className="w-fit">
          <MissingInfoAlertDocuments />
        </div>
      )}
    </div>
  );
};

export default TaxInformation;
