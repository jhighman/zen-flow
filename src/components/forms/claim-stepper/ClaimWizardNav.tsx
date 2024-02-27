/**
 * ClaimWizardNav Component
 * 
 * This component is used to render navigation buttons for a wizard-like interface.
 * 
 * Props:
 *  - prev: Function that handles the click event for navigating to the previous step.
 *  - next: Function that handles the click event for navigating to the next step.
 *  - currentStep: Number indicating the index of the current step.
 *  - steps: Array containing the steps of the wizard. Each step can have different content.
 * 
 * Usage:
 *  - Ensure that the caller defines the following props:
 *    - prev: Function to handle navigating to the previous step.
 *    - next: Function to handle navigating to the next step.
 *    - currentStep: Number indicating the index of the current step.
 *    - steps: Array containing the steps of the wizard.
 *  - The `prev` and `next` functions should update the `currentStep` state to control the navigation.
 *  - The `currentStep` prop determines which step is currently active, and the navigation buttons are disabled accordingly.
 *  - The `steps` prop should be an array of objects, where each object represents a step in the wizard. Each step can have different content.
 *  - Ensure that the `prev` and `next` functions are defined and passed down to this component from the parent component.
 *  - Ensure that the `currentStep` and `steps` props are correctly defined and passed down from the parent component.
 * 
 * Example Usage:
 * 
 * // Inside parent component
 * 
 * const [currentStep, setCurrentStep] = useState(0);
 * const steps = [
 *   { name: "Step 1", content: <Step1Component /> },
 *   { name: "Step 2", content: <Step2Component /> },
 *   { name: "Step 3", content: <Step3Component /> }
 * ];
 * 
 * const prevStep = () => {
 *   setCurrentStep(currentStep - 1);
 * };
 * 
 * const nextStep = () => {
 *   setCurrentStep(currentStep + 1);
 * };
 * 
 * return (
 *   <div>
 *     <ClaimWizardNav prev={prevStep} next={nextStep} currentStep={currentStep} steps={steps} />
 *     {steps[currentStep].content}
 *   </div>
 * );
 * 
 */

import React from 'react';

interface ClaimWizardNavProps {
  prev: () => void;
  next: () => void;
  currentStep: number;
  steps: any[]; // Define correct type for steps
}

const ClaimWizardNav: React.FC<ClaimWizardNavProps> = ({ prev, next, currentStep, steps }) => {
  return (
    <div className="mt-8 pt-5">
      <div className="flex justify-between">
        <button
          type="button"
          onClick={prev}
          disabled={currentStep === 0}
          className="rounded bg-white px-2 py-1 text-sm font-semibold text-sky-900 shadow-sm ring-1 ring-inset ring-sky-300 hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>
        <button
          type="button"
          onClick={next}
          disabled={currentStep === steps.length - 1}
          className="rounded bg-white px-2 py-1 text-sm font-semibold text-sky-900 shadow-sm ring-1 ring-inset ring-sky-300 hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ClaimWizardNav;
