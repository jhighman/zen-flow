import React from 'react';
import { cn } from "@/lib/utils"; // Importing cn from utils
import { Accordion, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { AccordionItem } from '@radix-ui/react-accordion';
import { Button } from '@/components/ui/button';
import { AlertTriangleIcon, Trash2Icon } from 'lucide-react';

interface Step {
  id: number;
  fields: React.ReactNode[]; // Components for the fields in this step
  isLastStep: boolean; // Indicates if this step is the last step
  remove: (index: number) => void; // Function to remove a field
}

interface StepBasedFormBuilderProps {
  currentStep: number;
  steps: Step[];
  errors: any; // Define correct type for errors
}

const StepBasedFormBuilder: React.FC<StepBasedFormBuilderProps> = ({ currentStep, steps, errors }) => {
  return (
    <div className={`md:grid md:grid-cols-3 gap-8 ${currentStep === 0 ? "md:inline-block w-full" : ""}`}>
      {currentStep === 0 && steps[0]?.fields}
      {currentStep > 0 &&
        steps[currentStep - 1]?.fields.map((field, index) => (
          <>
            {currentStep < steps.length && ( // Check if current step is not the last step
              <Accordion
                type="single"
                collapsible
                defaultValue="item-1"
                key={index}
              >
                <AccordionItem value="item-1">
                  <AccordionTrigger
                    className={cn(
                      "[&[data-state=closed]>button]:hidden [&[data-state=open]>.alert]:hidden relative !no-underline",
                      errors?.jobs?.[index] && "text-red-700",
                    )}
                  >
                    {`Work Experience ${index + 1}`}

                    <Button
                      variant="outline"
                      size="icon"
                      className="absolute right-8"
                      onClick={() => steps[currentStep - 1]?.remove(index)} // Call remove function from Step
                    >
                      <Trash2Icon className="h-4 w-4 " />
                    </Button>
                    {errors?.jobs?.[index] && (
                      <span className="absolute alert right-8">
                        <AlertTriangleIcon className="h-4 w-4   text-red-700" />
                      </span>
                    )}
                  </AccordionTrigger>
                  <AccordionContent>
                    <div
                      className={cn(
                        "md:grid md:grid-cols-3 gap-8 border p-4 rounded-md relative mb-4",
                      )}
                    >
                      {React.cloneElement(field as React.ReactElement, { errors })} {/* Pass errors as prop */}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            )}
            {currentStep === steps.length && steps[currentStep - 1]?.isLastStep && (
              <div key={index} className="md:grid md:grid-cols-3 gap-8 border p-4 rounded-md relative mb-4">
                {React.cloneElement(field as React.ReactElement, { errors })} {/* Pass errors as prop */}
              </div>
            )}
          </>
        ))}
    </div>
  );
};

export default StepBasedFormBuilder;
