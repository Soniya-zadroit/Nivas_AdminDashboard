// contexts/StepperContext.tsx
import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

interface StepperContextType {
  activeStep: number;
  setActiveStep: (step: number | ((prev: number) => number)) => void;
  stepContent: Array<{
    title: string;
    description: string;
  }>;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  canGoNext: boolean;
  canGoBack: boolean;
}

const StepperContext = createContext<StepperContextType | undefined>(undefined);

export const useStepperContext = () => {
  const context = useContext(StepperContext);
  if (!context) {
    throw new Error('useStepperContext must be used within a StepperProvider');
  }
  return context;
};

interface StepperProviderProps {
  children: ReactNode;
  initialStep?: number;
}

export const StepperProvider: React.FC<StepperProviderProps> = ({ 
  children, 
  initialStep = 2 
}) => {
  const [activeStep, setActiveStep] = useState(initialStep);

  const stepContent = [
    {
      title: "Brand Registration",
      description: "Complete your brand registration to start selling on Nivas",
    },
    {
      title: "Brand Approval Status",
      description: "Check the provided information and edit application",
    },
    {
      title: "Brand Approval Status",
      description: "Check the provided information and fill if you missed anything",
    },
  ];

  const goToNextStep = () => {
    setActiveStep(prev => Math.min(prev + 1, stepContent.length));
  };

  const goToPreviousStep = () => {
    setActiveStep(prev => Math.max(prev - 1, 1));
  };

  const canGoNext = activeStep < stepContent.length;
  const canGoBack = activeStep > 1;

  return (
    <StepperContext.Provider value={{
      activeStep,
      setActiveStep,
      stepContent,
      goToNextStep,
      goToPreviousStep,
      canGoNext,
      canGoBack,
    }}>
      {children}
    </StepperContext.Provider>
  );
};