import React from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "./assets/Images/logo.png";
import {
  BriefcaseIcon,
  ShieldCheckIcon,
  UserIcon,
} from "@phosphor-icons/react";
import { useStepperContext } from "./Pages/05-BrandRegistration/StepperHandler/StepperProvider";

export const Sidebar: React.FC = () => {
  const location = useLocation();

  // Only show stepper controls on brand registration page
  const isBrandRegistrationPage =
    location.pathname === "/brandregistration" ||
    location.pathname === "/brandRegistration";

  // Use stepper context only if on brand registration page
  let stepperContext = null;
  try {
    if (isBrandRegistrationPage) {
      stepperContext = useStepperContext();
    }
  } catch (error) {
    // Context not available, stepperContext remains null
    stepperContext = null;
  }

  const menuItems = [
    {
      label: "Brand Registration",
      path: "/brandregistration", // Make sure this matches your route exactly
      icon: <UserIcon />,
    },
    {
      label: "Company",
      path: "/com",
      icon: <BriefcaseIcon />,
    },
    {
      label: "Terms And Conditions",
      path: "/terms",
      icon: <ShieldCheckIcon />,
    },
  ];

  // Function to determine if a menu item is active
  const isMenuItemActive = (itemPath: string) => {
    // Handle brand registration with both possible paths
    if (itemPath === "/brandregistration") {
      return (
        location.pathname === "/brandregistration" ||
        location.pathname === "/brandRegistration"
      );
    }
    return location.pathname === itemPath;
  };

  return (
    <div className="min-h-screen w-64 shadow-md p-3 bg-[#FFBB1D] flex flex-col justify-between">
      {/* Logo */}
      <div>
        <img
          src={logo}
          alt="Logo"
          className="mb-6 w-38 cursor-pointer"
          onClick={() => {
            window.location.href = "/";
          }}
        />

        {/* Menu */}
        <nav className="flex flex-col gap-3">
          {menuItems.map((item) => {
            const isActive = isMenuItemActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-2 rounded-3xl transition-colors
                ${
                  isActive
                    ? "bg-black text-white"
                    : "text-[#696969] hover:bg-gray-200"
                }
              `}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Stepper Navigation - Only show on brand registration page */}
      {isBrandRegistrationPage && stepperContext && (
        <div className="flex flex-col gap-2 mt-4">
          <button
            onClick={stepperContext.goToPreviousStep}
            disabled={!stepperContext.canGoBack}
            className="px-4 py-2 text-sm rounded-md bg-black text-white disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
          >
            Back
          </button>
          <button
            onClick={stepperContext.goToNextStep}
            disabled={!stepperContext.canGoNext}
            className="px-4 py-2 text-sm rounded-md border border-black text-black hover:bg-black hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};
