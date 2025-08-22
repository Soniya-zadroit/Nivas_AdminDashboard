import React, { useEffect } from "react";
import CustomStepper from "../../components/CustomStepper";
import Registration from "./Registration/Registration";
import { InfoIcon } from "@phosphor-icons/react";
import BrandReview, { type BrandReviewData } from "./BrandReview";
import { useStepperContext } from "./StepperHandler/StepperProvider";

const BrandRegistration: React.FC = () => {
  const { activeStep, setActiveStep, stepContent } = useStepperContext();

  let brandReviewData: BrandReviewData = {
    brandApplicationStatus: {
      status: 3,
      statusName: "Approved",
      applicationId: "BR-2025-1001",
      submitDate: "10 Aug,2025",
      processTime: "3-5 Business Days",
    },
    brandInformation: {
      brandLogo: "public/vite.svg",
      brandName: "HRX by Hrithik Roshan",
      brandCategory: "Fashion & Clothing",
      cinNumber: "U12345MH2020PLC123456",
      contactPerson: "Hrithik Roshan",
      submitDate: "10 Aug,2025",
      phoneNumber: "+91 9876543210",
      email: "hrx@example.com",
    },
    document: {
      showDocument: true,
      addressProof: { url: "#", downloadUrl: "#" },
      gstDocument: { url: "#", downloadUrl: "#" },
      panDocument: { url: "#", downloadUrl: "#" },
    },
    feedback: {
      currentStatus: "Review in Progress",
      reviewContent:
        "Your application is currently under review by our compliance team. We are verifying your brand details and business details. You will receive an update within 2-3 business days.",
    },
  };

  useEffect(() => {
    brandReviewData.brandApplicationStatus.status != 3
      ? setActiveStep(2)
      : setActiveStep(1);
  }, [setActiveStep]);

  return (
    <div className="w-full space-y-6">
      <div className="">
        <h1 className="font-bold text-2xl font-poppins mb-4">{stepContent[activeStep - 1].title}</h1>
        <p className="text-gray-600 sm">{stepContent[activeStep - 1].description}</p>
      </div>
      <div className="w-full">
        <CustomStepper
          steps={[
            { label: "Brand Registration" },
            { label: "Review" },
            { label: "Approval Status" },
          ]}
          currentStep={activeStep} // show current step
        />
      </div>

      {activeStep === 1 && <Registration />}
      {(activeStep === 2 || activeStep === 3) && (
        <BrandReview
          brandReviewData={brandReviewData}
          setActiveStep={setActiveStep}
        />
      )}
    </div>
  );
};

export default BrandRegistration;

export const MissingInfoAlertMessage: React.FC = () => {
  return (
    <div className="flex items-center gap-3 p-3 rounded-md bg-orange-100">
      {/* Icon */}
      <div className="flex items-center justify-center w-8 h-8 rounded-md bg-orange-200">
        <InfoIcon weight="fill" className="text-red-500 w-5 h-5" />
      </div>

      {/* Text */}
      <div>
        <h5 className="text-sm font-semibold text-gray-900 m-0">
          Missing information
        </h5>
        <p className="text-sx text-gray-700">
          Oops! You missed to fill some mandatory fields
        </p>
      </div>
    </div>
  );
};