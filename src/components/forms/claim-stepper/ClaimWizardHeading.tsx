/**
 * ClaimWizardHeading Component
 * 
 * This component is used to render the heading section of a wizard-like interface.
 * 
 * Props:
 *  - title: Title of the wizard.
 *  - description: Description of the wizard.
 *  - initialData: Initial data for the wizard.
 *  - loading: Boolean indicating if data is loading.
 *  - setOpen: Function to set the open state.
 *  - steps: Array containing objects representing steps of the wizard.
 *  - currentStep: Number indicating the index of the current step.
 * 
 * Usage:
 *  - Ensure that the caller defines the following props:
 *    - title: Title of the wizard.
 *    - description: Description of the wizard.
 *    - initialData: Initial data for the wizard.
 *    - loading: Boolean indicating if data is loading.
 *    - setOpen: Function to set the open state.
 *    - steps: Array containing objects representing steps of the wizard.
 *    - currentStep: Number indicating the index of the current step.
 *  - The `steps` prop should be an array of objects, where each object represents a step in the wizard. Each step should have an `id` and `name`.
 *  - Ensure that the `title`, `description`, `loading`, `setOpen`, `steps`, and `currentStep` props are correctly defined and passed down from the parent component.
 *  - The navigation buttons are automatically generated based on the `steps` and `currentStep` props.
 * 
 * Example Usage:
 * 
 * // Inside parent component
 * 
 * const steps = [
 *   { id: "Step 1", name: "Step 1" },
 *   { id: "Step 2", name: "Step 2" },
 *   { id: "Step 3", name: "Step 3" }
 * ];
 * 
 * return (
 *   <ClaimWizardHeading
 *     title="Claim Wizard"
 *     description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
 *     initialData={initialData}
 *     loading={loading}
 *     setOpen={setOpen}
 *     steps={steps}
 *     currentStep={currentStep}
 *   />
 * );
 * 
 */

import React from 'react';
import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';

interface ClaimWizardHeadingProps {
  title: string;
  description: string;
  initialData?: any;
  loading: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  steps: { id: string; name: string }[];
  currentStep: number;
}

const ClaimWizardHeading: React.FC<ClaimWizardHeadingProps> = ({
  title,
  description,
  initialData,
  loading,
  setOpen,
  steps,
  currentStep,
}) => {
  return (
    <div className="flex items-center justify-between">
      <Heading title={title} description={description} />
      {initialData && (
        <Button
          disabled={loading}
          variant="destructive"
          size="sm"
          onClick={() => setOpen(true)}
        >
          <Trash className="h-4 w-4" />
        </Button>
      )}
      <Separator />
      <div>
        <ul className="flex gap-4">
          {steps.map((step, index) => (
            <li key={step.id} className="md:flex-1">
              {currentStep > index ? (
                <div className="group flex w-full flex-col border-l-4 border-sky-600 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
                  <span className="text-sm font-medium text-sky-600 transition-colors ">
                    {step.id}
                  </span>
                  <span className="text-sm font-medium">{step.name}</span>
                </div>
              ) : currentStep === index ? (
                <div
                  className="flex w-full flex-col border-l-4 border-sky-600 py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4"
                  aria-current="step"
                >
                  <span className="text-sm font-medium text-sky-600">
                    {step.id}
                  </span>
                  <span className="text-sm font-medium">{step.name}</span>
                </div>
              ) : (
                <div className="group flex h-full w-full flex-col border-l-4 border-gray-200 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
                  <span className="text-sm font-medium text-gray-500 transition-colors">
                    {step.id}
                  </span>
                  <span className="text-sm font-medium">{step.name}</span>
                </div>
              )}      
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ClaimWizardHeading;
