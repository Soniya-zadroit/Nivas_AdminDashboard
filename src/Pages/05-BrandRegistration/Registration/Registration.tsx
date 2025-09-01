import React, { useEffect, useState } from "react";
import BrandInformation from "./BrandInformation";
import ContactInformation from "./ContactInformation";
import TaxInformation from "./TaxInformation";
import WareHouseInformation from "./WareHouseInformation";
import { CheckCircleIcon, XCircleIcon } from "@phosphor-icons/react";

import {
  isValidCIN,
  isValidEmail,
  isValidGSTIN,
  isValidPhoneIN,
  isValidPincodeIN,
  isValidUrl,
  str,
} from "../../../helpers/Helper";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export interface BrandInfoInterface {
  brandName: string;
  productCategory: string;
  brandLogoPath: string; // path or URL to logo
  brandDescription: string;
  websiteURL: string;
  instragram: string; // keeping key as provided
}

export interface ContactInfoInterface {
  contactPerson: string;
  designation: string;
  phoneNumber: string;
  email: string;
  address: string;
  city: string;
  zipCode: string;
  state: string;
  proofDocument: string; // path or URL to uploaded doc
}

export interface TaxInformationInterface {
  gstinNumber: string;
  cinNumber: string;
  gstDocumant: string; // keeping key as provided
  panDocument: string;
}

export interface WareHouseInfoInterface {
  wareHouse: boolean;
  wareHouseAddress: string;
  wareHouseCity: string;
  wareHouseDistrict: string;
  wareHouseZipCode: string;
  wareHouseState: string;
}

export interface BrandRegistrationInterface {
  brandInformation: BrandInfoInterface;
  contactInformation: ContactInfoInterface;
  taxInformation: TaxInformationInterface;
  wareHouseInfo: WareHouseInfoInterface;
  applicationId: string | null;
  SaveDraft: boolean;
}

const Registration: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<BrandRegistrationInterface>({
    brandInformation: {
      brandName: "",
      productCategory: "",
      brandLogoPath: "",
      brandDescription: "",
      websiteURL: "",
      instragram: "",
    },
    contactInformation: {
      contactPerson: "",
      designation: "",
      phoneNumber: "",
      email: "",
      address: "",
      city: "",
      zipCode: "",
      state: "",
      proofDocument: "",
    },
    taxInformation: {
      gstinNumber: "",
      cinNumber: "",
      gstDocumant: "",
      panDocument: "",
    },
    wareHouseInfo: {
      wareHouse: false,
      wareHouseAddress: "",
      wareHouseCity: "",
      wareHouseDistrict: "",
      wareHouseZipCode: "",
      wareHouseState: "",
    },
    applicationId: sessionStorage.getItem("applicationId"),
    SaveDraft: false,
  });

  const [formErrors, setFormErrors] = useState<{
    [K in keyof BrandRegistrationInterface]?: { [field: string]: string };
  }>({});

  const [submitReview, setSubmitReview] = useState(false);

  const validateForm = () => {
    let errors: typeof formErrors = {};

    // helper to append errors without overwriting the section
    const addErr = <Section extends keyof BrandRegistrationInterface>(
      section: Section,
      field: keyof BrandRegistrationInterface[Section],
      msg: string
    ) => {
      errors[section] = {
        ...(errors[section] || {}),
        [field]: msg,
      };
    };

    // === Brand Information ===
    if (!str(formData.brandInformation.brandName)) {
      addErr("brandInformation", "brandName", "Brand name is required");
    }
    if (!str(formData.brandInformation.productCategory)) {
      addErr(
        "brandInformation",
        "productCategory",
        "Product category is required"
      );
    }
    if (!str(formData.brandInformation.brandLogoPath)) {
      addErr("brandInformation", "brandLogoPath", "Brand logo is required");
    }

    if (
      !isValidUrl(formData.brandInformation.websiteURL) &&
      formData.brandInformation.websiteURL !== ""
    ) {
      addErr("brandInformation", "websiteURL", "Invalid website URL");
    }

    // (brandDescription / websiteURL / instragram treated as optional for now)

    // === Contact Information (complete) ===
    if (!str(formData.contactInformation.contactPerson)) {
      addErr(
        "contactInformation",
        "contactPerson",
        "Contact person is required"
      );
    }
    if (!str(formData.contactInformation.designation)) {
      addErr("contactInformation", "designation", "Designation is required");
    }
    if (!str(formData.contactInformation.phoneNumber)) {
      addErr("contactInformation", "phoneNumber", "Phone number is required");
    } else if (!isValidPhoneIN(formData.contactInformation.phoneNumber)) {
      addErr(
        "contactInformation",
        "phoneNumber",
        "Enter a valid 10-digit mobile number"
      );
    }
    if (!str(formData.contactInformation.email)) {
      addErr("contactInformation", "email", "Email is required");
    } else if (!isValidEmail(formData.contactInformation.email)) {
      addErr("contactInformation", "email", "Enter a valid email");
    }
    if (!str(formData.contactInformation.address)) {
      addErr("contactInformation", "address", "Address is required");
    }
    if (!str(formData.contactInformation.city)) {
      addErr("contactInformation", "city", "City is required");
    }
    if (!str(formData.contactInformation.zipCode)) {
      addErr("contactInformation", "zipCode", "Zip code is required");
    } else if (!isValidPincodeIN(formData.contactInformation.zipCode)) {
      addErr("contactInformation", "zipCode", "Enter a valid 6-digit PIN code");
    }
    if (!str(formData.contactInformation.state)) {
      addErr("contactInformation", "state", "State is required");
    }
    if (!str(formData.contactInformation.proofDocument)) {
      addErr(
        "contactInformation",
        "proofDocument",
        "Proof document is required"
      );
    }

    // === Tax Information ===
    if (!str(formData.taxInformation.gstinNumber)) {
      addErr("taxInformation", "gstinNumber", "GSTIN is required");
    } else if (!isValidGSTIN(formData.taxInformation.gstinNumber)) {
      addErr(
        "taxInformation",
        "gstinNumber",
        "Enter a valid 15-character GSTIN"
      );
    }

    if (!str(formData.taxInformation.cinNumber)) {
      addErr("taxInformation", "cinNumber", "CIN is required");
    } else if (!isValidCIN(formData.taxInformation.cinNumber)) {
      addErr("taxInformation", "cinNumber", "Enter a valid 21-character CIN");
    }

    if (!str(formData.taxInformation.gstDocumant)) {
      addErr("taxInformation", "gstDocumant", "GST document is required");
    }
    if (!str(formData.taxInformation.panDocument)) {
      addErr("taxInformation", "panDocument", "PAN document is required");
    }

    // === Warehouse Info (only if wareHouse is true) ===
    if (formData.wareHouseInfo.wareHouse) {
      console.log("Registration.tsx -------------------------- >  222  ");
      console.log(
        "Registration.tsx / formData.wareHouseInfo.wareHouseAddress / 223 -------------------  ",
        formData.wareHouseInfo.wareHouseAddress
      );
      if (!str(formData.wareHouseInfo.wareHouseAddress)) {
        console.log("Registration.tsx -------------------------- >  224  ");
        addErr(
          "wareHouseInfo",
          "wareHouseAddress",
          "Warehouse address is required"
        );
      }
      if (!str(formData.wareHouseInfo.wareHouseCity)) {
        addErr("wareHouseInfo", "wareHouseCity", "Warehouse city is required");
      }
      if (!str(formData.wareHouseInfo.wareHouseDistrict)) {
        addErr(
          "wareHouseInfo",
          "wareHouseDistrict",
          "Warehouse district is required"
        );
      }
      if (!str(formData.wareHouseInfo.wareHouseZipCode)) {
        addErr(
          "wareHouseInfo",
          "wareHouseZipCode",
          "Warehouse PIN code is required"
        );
      } else if (!isValidPincodeIN(formData.wareHouseInfo.wareHouseZipCode)) {
        addErr(
          "wareHouseInfo",
          "wareHouseZipCode",
          "Enter a valid 6-digit PIN code"
        );
      }
      if (!str(formData.wareHouseInfo.wareHouseState)) {
        addErr(
          "wareHouseInfo",
          "wareHouseState",
          "Warehouse state is required"
        );
      }
    }

    console.log("Registration.tsx -------------------------- >  261  ");

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (saveType: boolean) => {
    console.log(
      "Registration.tsx / formData / 261 -------------------  ",
      formData
    );
    setSubmitReview(true);
    validateForm();
    const validationCheck = saveType ? true : validateForm();
    if (validationCheck) {
      console.log("Form submitted successfully", formData);
      const BrandData = {
        ...formData,
        SaveDraft: saveType,
        applicationId: sessionStorage.getItem("applicationId") ?? "", // ensure string
      };
      console.log(
        "Registration.tsx / BrandData / 273 -------------------  ",
        BrandData
      );
      try {
        await axios
          .post(
            import.meta.env.VITE_API_URL + "/brand/brandRegistration/storeData",
            BrandData, // send directly, not { BrandData }
            {
              headers: {
                Authorization: localStorage.getItem("token") || "",
                "Content-Type": "application/json",
              },
            }
          )
          .then((response: any) => {
            console.log(
              "Registration.tsx / response / 288 -------------------  ",
              response
            );
            const data = response.data.data;
            console.log(
              "Registration.tsx / data / 294 -------------------  ",
              data
            );
            if (data.status) {
              console.log(
                "Registration.tsx -------------------------- >  318  "
              );
              if (!saveType) {
                console.log(
                  "Registration.tsx -------------------------- >  322  "
                );
                navigate("/brandregistration", { state: 3 });
              }
            }
          });
      } catch (error) {
        console.log(
          "Registration.tsx / error / 273 -------------------  ",
          error
        );
      }
    } else {
      console.log("Validation failed", formErrors);
    }
  };

  const getApplicationDetails = async () => {
    console.log("Registration.tsx -------------------------- >  275  ");
    try {
      await axios
        .post(
          import.meta.env.VITE_API_URL + "/brand/brandRegistration/getFormData",
          {
            applicationId: sessionStorage.getItem("applicationId"),
          },

          {
            headers: {
              Authorization: localStorage.getItem("token"),
              "Content-Type": "application/json",
            },
          }
        )
        .then((response: any) => {
          // const data = decrypt(
          //   response.data[1],
          //   response.data[0],
          //   import.meta.env.VITE_ENCRYPTION_KEY
          // );

          // localStorage.setItem("token", "Bearer " + data.token);
          const data = response.data.data;
          console.log(
            "Registration.tsx / data / 298 -------------------  ",
            data
          );
          if (data.status) {
            setFormData(data.brandData);
          }
        });
    } catch (error) {
      console.log(
        "Registration.tsx / error / 278 -------------------  ",
        error
      );
    }
  };

  useEffect(() => {
    console.log("Registration.tsx -------------------------- >  317  ");
    getApplicationDetails();
  }, []);

  return (
    <div className="space-y-8">
      <BrandInformation
        value={formData.brandInformation}
        onChange={(next) =>
          setFormData((prev) => ({
            ...prev,
            brandInformation: { ...prev.brandInformation, ...next },
          }))
        }
        showValidate={submitReview}
        validateStatus={!formErrors.brandInformation}
        errors={formErrors.brandInformation}
      />

      <ContactInformation
        value={formData.contactInformation}
        brandName={formData.brandInformation.brandName}
        onChange={(next) =>
          setFormData((prev) => ({
            ...prev,
            contactInformation: { ...prev.contactInformation, ...next },
          }))
        }
        showValidate={submitReview}
        validateStatus={!formErrors.contactInformation}
        errors={formErrors.contactInformation}
      />

      <TaxInformation
        value={formData.taxInformation}
        brandName={formData.brandInformation.brandName}
        onChange={(patch) =>
          setFormData((prev) => ({
            ...prev,
            taxInformation: { ...prev.taxInformation, ...patch },
          }))
        }
        showValidate={submitReview}
        validateStatus={!formErrors.taxInformation}
        errors={formErrors.taxInformation}
      />

      <WareHouseInformation
        value={formData.wareHouseInfo}
        onChange={(patch) =>
          setFormData((prev) => ({
            ...prev,
            wareHouseInfo: { ...prev.wareHouseInfo, ...patch },
          }))
        }
        showValidate={submitReview}
        validateStatus={
          !formErrors.wareHouseInfo ||
          Object.keys(formErrors.wareHouseInfo).length === 0
        }
        errors={formErrors.wareHouseInfo}
      />

      <div className="bg-white p-4 rounded-lg shadow-sm space-y-4">
        {submitReview && (
          <h3 className="text-lg font-semibold">Submission Summary</h3>
        )}

        {submitReview && (
          <div className="space-y-3">
            {[
              {
                name: "Brand information",
                status:
                  !formErrors.brandInformation ||
                  Object.keys(formErrors.brandInformation).length === 0,
              },
              {
                name: "Contact information",
                status:
                  !formErrors.contactInformation ||
                  Object.keys(formErrors.contactInformation).length === 0,
              },
              {
                name: "Tax information",
                status:
                  !formErrors.taxInformation ||
                  Object.keys(formErrors.taxInformation).length === 0,
              },
              {
                name: "Warehouse information",
                status:
                  !formErrors.wareHouseInfo ||
                  Object.keys(formErrors.wareHouseInfo).length === 0,
              },
            ].map((section, idx) => (
              <div key={idx} className="flex justify-between items-center">
                <span className="text-gray-800">{section.name}</span>
                <div className="flex items-start justify-start gap-2">
                  {section.status ? (
                    <>
                      <CheckCircleIcon
                        weight="fill"
                        className="text-green-500 w-5 h-5"
                      />
                      <span className="font-semibold text-sm">Complete</span>
                    </>
                  ) : (
                    <>
                      <XCircleIcon
                        weight="fill"
                        className="text-red-500 w-5 h-5"
                      />
                      <span className="font-semibold text-sm">Incomplete</span>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer buttons */}
        <div className="flex gap-3 pt-4">
          <button
            className="bg-[#E8E8E8] rounded-full p-3  text-black border-none "
            onClick={() => handleSubmit(true)}
          >
            Save Draft
          </button>
          <button
            className="bg-black rounded-full  p-3 text-white border-none cursor-pointer hover:bg-[#000] hover:text-[#ffb300] transition-all duration-300"
            onClick={() => handleSubmit(false)}
          >
            Submit to Review
          </button>
        </div>
      </div>
    </div>
  );
};

export default Registration;
