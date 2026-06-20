"use client";

import * as React from "react";

type StepperContextValue = {
  currentStep: number;
  totalSteps: number;
  next: () => void;
  prev: () => void;
  goTo: (step: number) => void;
  isFirst: boolean;
  isLast: boolean;
};

const StepperContext = React.createContext<StepperContextValue | null>(null);

function useStepper() {
  const context = React.useContext(StepperContext);
  if (!context) {
    throw new Error("useStepper must be used within Stepper");
  }
  return context;
}

type StepperProps = {
  currentStep: number;
  onStepChange: (step: number) => void;
  children: React.ReactNode;
};

function Stepper({ currentStep, onStepChange, children }: StepperProps) {
  const steps = React.Children.toArray(children);
  const totalSteps = steps.length;

  const next = React.useCallback(() => {
    onStepChange(Math.min(currentStep + 1, totalSteps - 1));
  }, [currentStep, onStepChange, totalSteps]);

  const prev = React.useCallback(() => {
    onStepChange(Math.max(currentStep - 1, 0));
  }, [currentStep, onStepChange]);

  const goTo = React.useCallback(
    (step: number) => {
      onStepChange(Math.max(0, Math.min(step, totalSteps - 1)));
    },
    [onStepChange, totalSteps],
  );

  const value = React.useMemo<StepperContextValue>(
    () => ({
      currentStep,
      totalSteps,
      next,
      prev,
      goTo,
      isFirst: currentStep === 0,
      isLast: currentStep === totalSteps - 1,
    }),
    [currentStep, totalSteps, next, prev, goTo],
  );

  return (
    <StepperContext.Provider value={value}>
      {steps[currentStep]}
    </StepperContext.Provider>
  );
}

export { Stepper, useStepper };
