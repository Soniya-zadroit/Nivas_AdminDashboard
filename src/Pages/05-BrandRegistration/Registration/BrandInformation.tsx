import React from "react";
import LabelInput from "../../../components/LabelInput";
import LabelSelect from "../../../components/LabelSelect";
import type { BrandRegistrationInterface } from "./Registration";
import DropzoneUpload from "../../../components/DropZoneFileUpload";
import { CheckCircleIcon, XCircleIcon } from "@phosphor-icons/react";
import {
  MissingInfoAlertCount,
  MissingInfoAlertDocuments,
} from "../BrandRegistration";
import DropImage from "../../../components/DropImage";
import axios from "axios";
import DropzoneLogoUpload from "../../../components/DropZoneLogoUpload";

export interface DragAndDropUploadBoxProps {
  label: string;
  accept?: string;
  required?: boolean;
  maxSizeMB?: number;
  helperText?: string;
  buttonLabel?: string;
  showPreview?: boolean;
  error?: string;
  // 👇 add this
  value?: string | File | null;
  onChange?: (file: File | null) => void;
}

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
  // Validation functions
  const validateWebsiteURL = (url: string): boolean => {
    if (!url) return true; // Optional field
    const urlRegex =
      /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/i;
    return urlRegex.test(url);
  };

  const validateInstagram = (handle: string): boolean => {
    if (!handle) return true; // Optional field

    // Allow full Instagram URLs or just usernames
    if (handle.includes("instagram.com/")) {
      const urlRegex = /^https?:\/\/(www\.)?instagram\.com\/[a-zA-Z0-9._]+\/?$/;
      return urlRegex.test(handle);
    } else {
      // Just username validation
      const instagramRegex = /^[a-zA-Z0-9._]{1,30}$/;
      return instagramRegex.test(handle.replace("@", ""));
    }
  };

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
          maxLength={30}
        />

        <LabelSelect
          label="Product Category"
          value={value.productCategory}
          onChange={(val: string) => onChange({ productCategory: val })}
          options={[
            { label: "Select Category", value: null },
            { label: "Fashion & Apparel", value: 1 },
            { label: "Beauty & Wellness", value: 2 },
            { label: "Others", value: 3 },
          ]}
          error={errors?.productCategory}
          required
        />
      </div>

      {/* Brand Logo */}
      {/* <DropImage
        label="Brand logo *"
        accept="image/*"
        required
        value={value.brandLogoPath ?? undefined} // string | undefined
        brandName={value.brandName} // pass brandName from state
        onChange={(_url, _brandName, filePath) => {
          console.log(
            "BrandInformation.tsx / filePath / 114 -------------------  ",
            filePath
          );
          if (!value.brandName) {
            alert("Please enter Brand Name before uploading the logo");
            return;
          }
          onChange({ brandLogoPath: filePath ?? undefined });
        }}
        showPreview
        error={errors?.brandLogoPath}
      /> */}

      <DropzoneLogoUpload
        label="Brand logo "
        brandName={value.brandName}
        required
        // Uncomment when implementing file handling
        value={value.brandLogoPath}
        onChange={(_url, _brandName, filePath) => {
          console.log(
            "ContactInformation.tsx / filePath / 226 -------------------  ",
            filePath
          );
          // if (!value.brandName) {
          //   alert("Please enter Brand Name before uploading the logo");
          //   return;
          // }
          onChange({ brandLogoPath: filePath ?? undefined });
        }}
        accept=".jpg,.jpeg,.png"
        // maxSizeMB={5}
        // helperText="Upload any scanned address proof documents (Aadhar Card, Passport, Utility Bill, etc.) - Max 5MB"
        // buttonLabel="Choose File"
        // showPreview
        // error={errors?.proofDocument}
      />

      {/* Brand Description */}
      <LabelInput
        label="Brand Description"
        type="textarea"
        required
        maxLength={300}
        placeholder="Describe your brand, products and what makes you unique (max 300 characters)"
        value={value.brandDescription}
        onChange={(val: string) => onChange({ brandDescription: val })}
        error={errors?.brandDescription}
        rows={4}
      />

      {/* Website + Instagram */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <LabelInput
          label="Website URL"
          type="url"
          placeholder="https://yourbrand.com"
          value={value.websiteURL}
          onChange={(val: string) => {
            // Auto-add https:// if not present and URL is being typed
            let url = val.trim();
            if (
              url &&
              !url.startsWith("http://") &&
              !url.startsWith("https://")
            ) {
              if (url.includes(".") && url.length > 3) {
                url = "https://" + url;
              }
            }
            onChange({ websiteURL: url });
          }}
          error={
            errors?.websiteURL ||
            (!validateWebsiteURL(value.websiteURL)
              ? "Please enter a valid website URL"
              : undefined)
          }
          maxLength={100}
        />

        <LabelInput
          label="Insta handle/Storefront*"
          type="instagram"
          placeholder="Enter your Instagram handle"
          value={value.instragram}
          onChange={(val: string) => onChange({ instragram: val })}
          error={
            errors?.instragram ||
            (!validateInstagram(value.instragram)
              ? "Please enter a valid Instagram username or URL"
              : undefined)
          }
        />
      </div>

      {/* Validation Summary */}
      {showValidate && !validateStatus && (
        <div className="w-fit">
          <MissingInfoAlertCount count={Object.keys(errors || {}).length} />
        </div>
      )}
    </div>
  );
};

export default BrandInformation;
