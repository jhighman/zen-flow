'use client';
import React, { useState } from 'react';
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { claimSchema, type ClaimFormValues } from "@/lib/form-schema";
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams, useRouter } from "next/navigation";

import * as z from 'zod';
import { Heading } from '@/components/ui/heading';
import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import TextInputComponent from './TextInputComponent';
import { Accordion } from '@/components/ui/accordion';
import { cn } from '@/lib/utils';
import SelectLicenseCategoryComponent from './SelectLicenseCategoryComponent';
import SelectLicenseTypeComponent from './SelectLicenseTypeComponent';
import SelectLicenseClassComponent from './SelectLiscenseClassComponent';
import SelectUSStateComponent from './SelectUSStateComponent';
import NumericInputComponent from './NumericInputComponent';
import SelectLicenseStatusComponent from './SelectLicenseStatusComponent';
import SelectExaminationDecisionComponent from './SelectExaminationDecisionComponent';
import SelectExaminationDecisionReasonComponent from './SelectExaminationDecisionReasonComponent';
import DateInputComponent from './DateInputComponent';
import SelectDiligenceLevelComponent from './SelectDiligenceLevelComponent';


interface ClaimFormType {
  initialData: any | null;
  categories: any;
}

export const CreateClaimOne: React.FC<ClaimFormType> = ({
    initialData,
    categories,
  }) => {
  const params = useParams();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imgLoading, setImgLoading] = useState(false);
  const title = initialData ? "Edit claim" : "Create a claim";
  const description = initialData
    ? "Edit a  claim."
    : "To create a resume, we first need some basic information about the person.";
    const toastMessage = initialData ? "Product updated." : "Product created.";
    const action = initialData ? "Save changes" : "Create";
    const [previousStep, setPreviousStep] = useState(0);
    const [currentStep, setCurrentStep] = useState(0);
    const [data, setData] = useState({});
    const delta = currentStep - previousStep;    

    const currentDate = new Date();
    const nextYearDate = new Date(currentDate.getFullYear() + 1, currentDate.getMonth(), currentDate.getDate());
    
    const defaultValues = {
      firstname: "",
      middleName: "",
      lastname: "",
      licenseCategory: "None", 
      licenseType: "None", 
      licenseClass: "None", 
      licenseIdentifier: "",
      licenseIssuingState: "None", 
      expirationMonth: currentDate.getMonth() + 1, // Deriving from current date
      expirationYear: currentDate.getFullYear(), // Deriving from current date
      issuer: "",
      issuerState: "None", 
      licenseStatus: "None", 
      notesAndReferences: "",
      examinationDecision: "None", 
      reason: "",
      validUntil: nextYearDate, // Setting to one year in the future
      dueDilligenceLevel: 1, 
  };

const form = useForm<z.infer<typeof claimSchema>>({
  resolver: zodResolver(claimSchema),
  defaultValues,
  mode: "onChange",
});

const {
  control,
  formState: { errors },
} = form; 



const onSubmit = async (data: ClaimFormValues) => {
  try {
    setLoading(true);
    if (initialData) {
      // await axios.post(`/api/products/edit-product/${initialData._id}`, data);
    } else {
      // const res = await axios.post(`/api/products/create-product`, data);
      // console.log("product", res);
    }
    router.refresh();
    router.push(`/claims`);
  } catch (error: any) {
  } finally {
    setLoading(false);
  }
};

const onDelete = async () => {
  try {
    setLoading(true);
    //   await axios.delete(`/api/${params.storeId}/products/${params.productId}`);
    router.refresh();
    router.push(`/${params.storeId}/claims`);
  } catch (error: any) {
  } finally {
    setLoading(false);
    setOpen(false);
  }
}

const processForm: SubmitHandler<ClaimFormValues> = (data) => {
  console.log("data ==>", data);
  setData(data);
  // api call and reset
  // form.reset();
};

type FieldName = keyof ClaimFormValues;
// come back to this to fix validation at the step level
const steps = [
  {
    id: "Step 1",
    name: "Attesting Information",
    fields: [
      "firstname",
      "middleName",
      "lastname",
      "licenseCategory",
      "licenseType",
      "licenseClass",
      "licenseIdentifier",
      "licenseIssuingState",
      "claimExpirationMonth", // Added to match the fields in the HTML structure
      "claimExpirationYear", // Added to match the fields in the HTML structure
    ],
  },
  {
    id: "Step 2",
    name: "Corroborating Information",
    fields: [
      "issuer",
      "issuingState", // Corrected from issuerState to match the default values object
      "licenseStatus",
      "expirationMonth", // Note: Listed again, ensure this is intentional and not a duplication error
      "expirationYear", // Note: Listed again, ensure this is intentional and not a duplication error
      "notesAndReferences",
    ],
  },
  {
    id: "Step 3",
    name: "Decisioning Information", // Corrected a typo from "Decisoning" to "Decisioning"
    fields: [
      "examinationDecision",
      "examinationDecisionReason", // Corrected from reason to match your default values
      "dueDilligenceLevel",
      // Removed validUntil as it does not directly match any field from the provided HTML or default values structure
    ],
  },
  {
    id: "Step 4",
    name: "Complete",
    fields: [
      "status",
      "statusDate",
      "queueName",
      "createdAt", // Added these fields based on your last code snippet to capture all relevant information before completing the process.
    ],
  },
];


// need to figure out how to trigger and handle errors
const next = async () => {
  console.log('Next button clicked'); // Verbose logging: Button click event

  const fields = steps[currentStep].fields;
  console.log('Fields:', fields); // Verbose logging: Current step fields

  const output = await form.trigger(fields as FieldName[], {
    shouldFocus: true,
  });

  console.log('Form trigger output:', output); // Verbose logging: Form trigger output

  if (!output) {
    console.log('Form trigger failed. Output:', output);
    //return;
  }

  if (currentStep < steps.length - 1) {
    if (currentStep === steps.length - 2) {
      console.log('Last step reached. Submitting form...'); // Verbose logging: Last step reached
      await form.handleSubmit(processForm)();
      console.log('Form submitted successfully'); // Verbose logging: Form submission success
    }

    console.log('Moving to next step...'); // Verbose logging: Moving to next step
    setPreviousStep(currentStep);
    setCurrentStep((step) => step + 1);
  } else {
    console.log('No more steps to navigate'); // Verbose logging: No more steps
  }
};

const prev = () => {
  if (currentStep > 0) {
    setPreviousStep(currentStep);
    setCurrentStep((step) => step - 1);
  }
};

  return (
    <>
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
      </div>
      <Separator />
      <div>
        <ul className="flex gap-4">
          {steps.map((step, index) => (
            <li key={step.name} className="md:flex-1">
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
      <Separator />
        <Form {...form}>
          <form
              onSubmit={form.handleSubmit(processForm)}
              className="space-y-8 w-full"
            >
          <div
            className={cn(
              currentStep === 1
                ? "md:inline-block w-full"
                : "md:grid md:grid-cols-3 gap-8",
            )}
          >
            {currentStep === 0 && (
              <>
                <TextInputComponent key="firstName" name="firstname" placeholder="First Name" control={control} loading={loading} />
                <TextInputComponent key="middleName" name="middleName" placeholder="Middle Name" control={control} loading={loading} />
                <TextInputComponent key="lastName" name="lastname" placeholder="Last Name" control={control} loading={loading} />
                <SelectLicenseCategoryComponent control={control} loading={loading}></SelectLicenseCategoryComponent>
                <SelectLicenseTypeComponent control={control} loading={loading}></SelectLicenseTypeComponent>
                <SelectLicenseClassComponent control={control} loading={loading}></SelectLicenseClassComponent>
                <TextInputComponent key="licenseIdentifier" name="licenseIdentifier" placeholder="License ID" control={control} loading={loading} />
                <NumericInputComponent key="expirationMonth" name="expirationMonth" placeholder="expirationMonth" control={control} loading={loading} />
                <NumericInputComponent key="expirationYear" name="expirationYear" placeholder="expirationYear" control={control} loading={loading} />
              </>
            )}
            {currentStep === 1 && (
              <>
                <SelectUSStateComponent control={control} loading={loading}></SelectUSStateComponent>
                <TextInputComponent key="issuer" name="issuer" placeholder="issuer" control={control} loading={loading} />
                <TextInputComponent key="issuerState" name="issuerState" placeholder="issuerState" control={control} loading={loading} />
                <SelectLicenseStatusComponent control={control} loading={loading}></SelectLicenseStatusComponent>
                <TextInputComponent key="notesAndReferences" name="notesAndReferences" placeholder="" control={control} loading={loading} />
              </>
            )}
            {currentStep === 2 && (
              <>
                <SelectExaminationDecisionComponent control={control} loading={loading}></SelectExaminationDecisionComponent>
                <SelectExaminationDecisionReasonComponent control={control} loading={loading}></SelectExaminationDecisionReasonComponent>
                <TextInputComponent key="validUntil" name="validUntil" placeholder="validUntil" control={control} loading={loading} />
                <SelectDiligenceLevelComponent control={control} loading={loading}></SelectDiligenceLevelComponent>
              </>
            )}
            {currentStep === 3 && (
              <>
                <TextInputComponent key="status" name="status" placeholder="Status" control={control} loading={loading} />
                <DateInputComponent key="statusDate" name="statusDate" placeholder="Status Date" control={control} loading={loading} />
                <TextInputComponent key="queueName" name="queueName" placeholder="Queue Name" control={control} loading={loading} />
                <DateInputComponent key="createdAt" name="createdAt" placeholder="Created At" control={control} loading={loading} />
              </>
            )}
          </div>
          </form>
        </Form>
       {/* Navigation */}
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
             <path
               strokeLinecap="round"
               strokeLinejoin="round"
               d="M15.75 19.5L8.25 12l7.5-7.5"
             />
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
             <path
               strokeLinecap="round"
               strokeLinejoin="round"
               d="M8.25 4.5l7.5 7.5-7.5 7.5"
             />
           </svg>
         </button>
       </div>
     </div>       
    </>
  );
};

