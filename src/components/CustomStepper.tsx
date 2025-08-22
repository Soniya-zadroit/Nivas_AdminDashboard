import { CheckCircleIcon } from "@phosphor-icons/react";
import React from "react";

interface Step {
  label: string;
}

interface StepperProps {
  steps: Step[];
  currentStep: number; // 1-based index
}

const CustomStepper: React.FC<StepperProps> = ({ steps, currentStep }) => {
  return (
    <div className="w-full">
      <div className="flex items-center w-full">
        {steps.map((step, index) => {
          const isCompleted = index + 1 < currentStep;
          const isActive = index + 1 === currentStep;

          return (
            <React.Fragment key={index}>
              {/* Step Circle + Label */}
              <div className="flex flex-col items-center flex-shrink-0">
                {isCompleted ? (
                  <CheckCircleIcon
                    weight="fill"
                    className="w-8 h-8 text-black"
                  />
                ) : (
                  <input
                    type="radio"
                    name="stepper"
                    value={step.label}
                    checked={isActive}
                    readOnly
                    className="
                w-6 h-6 border-2 border-black rounded-full accent-black bg-white relative
                checked:before:content-[''] checked:before:w-2.5 checked:before:h-2.5
                checked:before:bg-black checked:before:rounded-full
                checked:before:absolute checked:before:top-1/2 checked:before:left-1/2
                checked:before:-translate-x-1/2 checked:before:-translate-y-1/2
              "
                  />
                )}
                <div className="mt-2 text-xs whitespace-nowrap">
                  {step.label}
                </div>
              </div>

              {/* Connector Line (only between steps) */}
              {index < steps.length - 1 && (
                <div
                  className={`flex-1 h-[2px] mx-4 transition-colors duration-75 ${
                    isCompleted ? "bg-black" : "bg-gray-200"
                  }`}
                ></div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default CustomStepper;
