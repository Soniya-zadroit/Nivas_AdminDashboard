import {
  CheckCircleIcon,
  ClockIcon,
  DownloadSimpleIcon,
  InfoIcon,
  XCircleIcon,
} from "@phosphor-icons/react";
import { Button } from "primereact/button";
import React from "react";

// types
export interface BrandApplicationStatus {
  status: number;
  statusName: string;
  applicationId: string;
  submitDate: string;
  processTime: string;
}

export interface BrandInformation {
  brandLogo: string;
  brandName: string;
  brandCategory: string;
  cinNumber: string;
  contactPerson: string;
  submitDate: string;
  phoneNumber: string;
  email: string;
}

export interface DocumentFile {
  url: string;
  downloadUrl: string;
}

export interface Document {
  showDocument: boolean;
  addressProof: DocumentFile;
  gstDocument: DocumentFile;
  panDocument: DocumentFile;
}

export interface Feedback {
  currentStatus: string;
  reviewContent: string;
}

export interface BrandReviewData {
  brandApplicationStatus: BrandApplicationStatus;
  brandInformation: BrandInformation;
  document: Document;
  feedback: Feedback;
}

interface Props {
  brandReviewData: BrandReviewData;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  activeStep?: number; // Add activeStep prop to determine which step we're on
}

const BrandReview: React.FC<Props> = ({ brandReviewData, setActiveStep, activeStep = 2 }) => {
  console.log("Full brandReviewData:", brandReviewData);
  console.log("Status object:", brandReviewData?.brandApplicationStatus);
  console.log(
    "Status name:",
    brandReviewData?.brandApplicationStatus?.statusName
  );

  const statusConfig: Record<
    number,
    { label: string; className: string; rightLabel: string; icon: any }
  > = {
    1: {
      label: "Pending Review",
      className: "bg-yellow-400 text-black",
      rightLabel: "Estimated Processing Time",
      icon: <ClockIcon size={18} weight="fill" />,
    },
    2: {
      label: "Rejected",
      className: "bg-red-500 text-white",
      rightLabel: "Last updated:",
      icon: <XCircleIcon size={18} weight="fill" />,
    },
    3: {
      label: "Approved",
      className: "bg-green-500 text-white",
      rightLabel: "Last updated:",
      icon: <CheckCircleIcon size={18} weight="fill" />,
    },
    0: {
      label: "Unknown Status",
      className: "bg-gray-400 text-white",
      rightLabel: "N/A",
      icon: <InfoIcon size={18} weight="fill" />,
    },
  };

  const status = brandReviewData.brandApplicationStatus.status;
  const config = statusConfig[status] || statusConfig[0];

  // Only show documents in step 2 (edit application), hide in step 3
  const shouldShowDocuments = activeStep === 2 && brandReviewData.document.showDocument;

  return (
    <div className="space-y-8">
      {/* Brand Approval Status */}
      <div className="bg-white p-4 rounded-lg shadow-sm space-y-4">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Brand Approval Status</h3>
          {status != 1 && (
            <span className="text-[#696969] text-xs">
              Last Updated: {brandReviewData.brandApplicationStatus.submitDate}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          {/* Left Section */}
          <div className="flex items-center gap-4">
            {/* Status Badge */}
            <span
              className={`px-3 py-1 font-medium rounded-full flex items-center gap-2 capitalize text-sm ${config.className}`}
            >
              {config.icon} {brandReviewData.brandApplicationStatus.statusName}
            </span>

            {/* Info */}
            <div className="text-sm text-gray-600">
              <p>
                <span className="text-gray-500">Application ID:</span>{" "}
                {brandReviewData.brandApplicationStatus.applicationId}
              </p>
              <p>
                <span className="text-gray-500">Submitted:</span>{" "}
                {brandReviewData.brandApplicationStatus.submitDate}
              </p>
            </div>
          </div>

          {/* Right Section */}
          {status === 1 && (
            <div className="mt-4 md:mt-0 text-right">
              <p className="text-sm text-gray-600">{config.rightLabel}</p>
              <p className="text-base font-semibold text-black">
                {brandReviewData.brandApplicationStatus.processTime}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Brand Information */}
      <div className="bg-white p-4 rounded-lg shadow-sm space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Brand Information</h3>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div className="flex flex-col items-center justify-center gap-4">
            <img
              src={brandReviewData.brandInformation.brandLogo}
              alt="Brand Logo"
              className="w-16 h-16 rounded-md object-cover"
            />

            <div className="flex flex-col items-center">
              <h4 className="text-base font-semibold text-gray-900">
                {brandReviewData.brandInformation.brandName}
              </h4>
              <span className="inline-block mt-1 px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-700">
                {brandReviewData.brandInformation.brandCategory}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 md:mt-0 w-full md:w-auto">
            <div>
              <p className="text-xs text-gray-500">CIN</p>
              <p className="text-sm font-medium text-gray-900">
                {brandReviewData.brandInformation.cinNumber}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-500">Primary Contact Person</p>
              <p className="text-sm font-medium text-gray-900">
                {brandReviewData.brandInformation.contactPerson}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-500">Date of Submission</p>
              <p className="text-sm font-medium text-gray-900">
                {brandReviewData.brandInformation.submitDate}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-500">Contact Details</p>
              <p className="text-sm font-medium text-gray-900">
                {brandReviewData.brandInformation.phoneNumber}
              </p>
              <p className="text-sm text-gray-600">
                {brandReviewData.brandInformation.email}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Submitted Documents - Only show in step 2 */}
      {shouldShowDocuments && (
        <div className="bg-white p-4 rounded-lg shadow-sm space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Submitted Documents</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                title: "Address Proof",
                size: "2.4 MB",
                url: brandReviewData.document.addressProof.url,
                downloadUrl: brandReviewData.document.addressProof.downloadUrl,
              },
              {
                title: "GST Registration Certificate",
                size: "1.4 MB",
                url: brandReviewData.document.gstDocument.url,
                downloadUrl: brandReviewData.document.gstDocument.downloadUrl,
              },
              {
                title: "PAN Card",
                size: "3.1 MB",
                url: brandReviewData.document.panDocument.url,
                downloadUrl: brandReviewData.document.panDocument.downloadUrl,
              },
            ].map((doc, idx) => (
              <div
                key={idx}
                className="p-4 border border-[#E5E5E5] rounded-lg flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-sm text-gray-900">
                      {doc.title}
                    </p>
                    <ClockIcon size={18} weight="fill" />
                  </div>

                  <span className="text-xs text-[#737373]">
                    PDF · {doc.size}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4 mt-3">
                  <a
                    href={doc.url}
                    className="text-sm font-medium hover:underline"
                  >
                    View Document
                  </a>
                  <a
                    href={doc.downloadUrl}
                    className="text-gray-600 text-sm hover:text-gray-900"
                    title="Download"
                  >
                    <DownloadSimpleIcon weight="fill" size={24} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Actions & Feedback */}
      <div className="bg-white p-4 rounded-lg shadow-sm space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Actions & Feedback</h3>
        </div>

        <div className="p-4 border border-[#E5E5E5] rounded-lg bg-[#FAFAFA]">
          <div className="flex items-start gap-4">
            <InfoIcon weight="fill" size={24} />
            <div className="flex flex-col items-start gap-2">
              <span className="font-medium text-base">
                {brandReviewData.feedback.currentStatus}
              </span>
              <span className="text-sm text-gray-600">
                {brandReviewData.feedback.reviewContent}
              </span>
            </div>
          </div>
        </div>

        <div
          className="flex flex-col md:flex-row gap-4 mt-4"
          hidden={status === 3}
        >
          <Button
            rounded
            style={{ background: "black", color: "white", border: "none" }}
            onClick={() => setActiveStep(1)}
          >
            {status === 2 ? "Resubmit Application" : "Edit Application"}
          </Button>
          <Button
            rounded
            style={{ background: "white", border: "1px solid black" }}
          >
            <span role="img" aria-label="support">
              🎧
            </span>
            Contact Support
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BrandReview;