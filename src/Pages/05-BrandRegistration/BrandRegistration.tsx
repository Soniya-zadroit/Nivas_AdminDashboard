import React, { useEffect, useState } from "react";
import CustomStepper from "../../components/CustomStepper";
import Registration from "./Registration/Registration";
import { InfoIcon } from "@phosphor-icons/react";
import BrandReview, { type BrandReviewData } from "./BrandReview";
import { useStepperContext } from "./StepperHandler/StepperProvider";
import { numberToWords } from "../../helpers/Helper";
import { useLocation } from "react-router-dom";
import axios from "axios";

const BrandRegistration: React.FC = () => {
  const applicationStatus = useLocation().state;
  console.log(
    "BrandRegistration.tsx / applicationStatus / 11 -------------------  ",
    applicationStatus
  );
  const { activeStep, setActiveStep, stepContent } = useStepperContext();
  // const [brandReviewData, setBrandReviewData] =
  //   useState<BrandReviewData | null>(null);
  const [brandReviewData, setBrandReviewData] = useState<BrandReviewData>({
    brandApplicationStatus: {
      status: 0,
      statusName: "",
      applicationId: "",
      submitDate: "",
      lastDate: "",
      processTime: "",
    },
    brandInformation: {
      brandLogo: "",
      brandName: "",
      brandCategory: "",
      cinNumber: "",
      contactPerson: "",
      submitDate: "",
      phoneNumber: "",
      email: "",
    },
    document: {
      showDocument: true,
      addressProof: { url: "", downloadUrl: "#" },
      gstDocument: { url: "", downloadUrl: "#" },
      panDocument: { url: "", downloadUrl: "#" },
    },
    feedback: {
      currentStatus: "",
      reviewContent: "",
    },
  });

  // useEffect(() => {
  //   brandReviewData.brandApplicationStatus.status != 3
  //     ? setActiveStep(2)
  //     : setActiveStep(1);
  // }, [setActiveStep]);

  // useEffect(() => {
  //   console.log("applicationStatus", applicationStatus);
  //   if (applicationStatus === 1 || applicationStatus === 2) {
  //     console.log("BrandRegistration.tsx -------------------------- >  60  ");
  //     setActiveStep(1);
  //   } else {
  //     console.log("BrandRegistration.tsx -------------------------- >  64  ");
  //     setActiveStep(2);
  //     getRegistrationStatus();
  //   }
  // }, [applicationStatus]);
  useEffect(() => {
    console.log("applicationStatus", applicationStatus);

    if (applicationStatus === 1 || applicationStatus === 2) {
      setActiveStep(1); // Brand Registration
    } else if (applicationStatus === 3) {
      setActiveStep(2); // Review
      getRegistrationStatus();
    } else if (applicationStatus === 4 || applicationStatus === 5) {
      setActiveStep(3); // Approval Status
      getRegistrationStatus();
    }
  }, [applicationStatus]);

  const getRegistrationStatus = async () => {
    try {
      await axios
        .post(
          import.meta.env.VITE_API_URL +
            "/brand/brandRegistration/getRegistrationStatus",
          {
            applicationId: sessionStorage.getItem("applicationId"),
          },
          {
            headers: {
              Authorization: localStorage.getItem("token") || "",
              "Content-Type": "application/json",
            },
          }
        )
        .then((response: any) => {
          const data = response.data.data;
          console.log(
            "BrandRegistration.tsx / data / 75 -------------------  ",
            data
          );
          setBrandReviewData(data.brandData);
        });
    } catch (error) {
      console.log(
        "BrandRegistration.tsx / error / 63 -------------------  ",
        error
      );
    }
  };

  return (
    <div className="w-full space-y-6 poppins">
      <div className="">
        <h1 className="font-semibold text-2xl font-poppins mb-4">
          {stepContent[activeStep - 1].title}
        </h1>
        <p className="text-gray-600 text-sm">
          {stepContent[activeStep - 1].description}
        </p>
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
          activeStep={activeStep}
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
        <h5 className="text-[12px] font-medium text-gray-900 m-0">
          Missing information
        </h5>
        <p className="text-[10px] text-gray-700">
          Oops! You missed to fill some mandatory fields
        </p>
      </div>
    </div>
  );
};

export const MissingInfoAlertCount: React.FC<{ count: number }> = ({
  count,
}) => {
  return (
    <div className="flex items-center gap-3 p-3 rounded-md bg-orange-100">
      {/* Icon */}
      <div className="flex items-center justify-center w-8 h-8 rounded-md bg-orange-200">
        <InfoIcon weight="fill" className="text-red-500 w-5 h-5" />
      </div>

      {/* Text */}
      <div>
        <h5 className="text-[12px] font-medium text-gray-900 m-0">
          Missing information
        </h5>
        <p className="text-[10px] text-gray-700">
          Oops! You missed to fill{" "}
          <span className="font-semibold">{numberToWords(count)}</span>{" "}
          mandatory field
          {count > 1 ? "s" : ""}
        </p>
      </div>
    </div>
  );
};

export const MissingInfoAlertDocuments: React.FC = () => {
  return (
    <div className="flex items-center gap-3 p-3 rounded-md bg-orange-100">
      <div className="flex items-center justify-center w-8 h-8 rounded-md bg-orange-200">
        <InfoIcon weight="fill" className="text-red-500 w-5 h-5" />
      </div>
      <div>
        <h5 className="text-[12px] font-medium text-gray-900 m-0">
          Missing information
        </h5>
        <p className="text-[10px] text-gray-700">
          Oops! You missed to Upload a document
        </p>
      </div>
    </div>
  );
};
