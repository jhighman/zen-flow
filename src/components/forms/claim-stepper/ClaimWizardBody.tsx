/**
 * ClaimWizardBody Component
 * 
 * This component is used to render the body content of a wizard-like interface.
 * 
 * Props:
 *  - control: Any - Control object for form management.
 *  - loading: boolean - Indicates whether data is loading.
 *  - // Add more props as needed
 * 
 * Usage:
 *  - Ensure that the caller defines the following props:
 *    - control: Control object for form management.
 *    - loading: Boolean indicating whether data is loading.
 *    - // Add more props as needed
 *  - The `control` prop should be passed to the form components to manage form state.
 *  - The `loading` prop should be used to conditionally render loading indicators or disable form inputs.
 *  - Add more props as needed based on the specific requirements of the wizard body.
 *  - Ensure that the components representing each step are correctly defined and included within this component.
 * 
 * Example Usage:
 * 
 * // Inside parent component
 * 
 * const control = useForm(); // Assuming useForm is used for form management
 * const loading = false; // Example loading state
 * 
 * return (
 *   <ClaimWizardBody control={control} loading={loading} />
 * );
 * 
 */

import React from "react";
import StepBasedFormBuilder from "./StepBasedFormBuilderProps";
import StepNameComponent from "./StepNameComponent";
import TextInputComponent from "./TextInputComponent";
import SelectLicenseStatusComponent from "./SelectLicenseStatusComponent";
import SelectUSStateComponent from "./SelectUSStateComponent";
import SelectExaminationDecisionComponent from "./SelectExaminationDecisionComponent";
import SelectExaminationDecisionReasonComponent from "./SelectExaminationDecisionReasonComponent";
import SelectDiligenceLevelComponent from "./SelectDiligenceLevelComponent";

interface ClaimWizardComponentProps {
  name: string;
  control: any;
  loading: boolean;
  // Add more props as needed
}

const ClaimWizardBody: React.FC<ClaimWizardComponentProps> = ({ name, control, loading }) => {
  return (
    <div>
      <StepNameComponent key="stepName" id="Step 1" name="Attesting Information" />
      <TextInputComponent key="firstName" name="firstname" placeholder="First Name" control={control} loading={loading} />
      <TextInputComponent key="middleName" name="middleName" placeholder="Middle Name" control={control} loading={loading} />
      <TextInputComponent key="lastName" name="lastname" placeholder="Last Name" control={control} loading={loading} />
      <SelectLicenseStatusComponent key="licenseStatus" control={control} loading={loading} />
      <TextInputComponent key="licenseType" name="licenseType" placeholder="License Type" control={control} loading={loading} />
      <TextInputComponent key="licenseClass" name="licenseClass" placeholder="License Class" control={control} loading={loading} />
      <TextInputComponent key="licenseIdentifier" name="licenseIdentifier" placeholder="License Identifier" control={control} loading={loading} />
      <SelectUSStateComponent key="licenseIssuingState" control={control} loading={loading} />
      <TextInputComponent key="expirationMonth" name="expirationMonth" placeholder="Expiration Month" control={control} loading={loading} />
      <TextInputComponent key="expirationYear" name="expirationYear" placeholder="Expiration Year" control={control} loading={loading} />
      <StepNameComponent key="stepName" id="Step 2" name="Corroborating Information" />
      {/* Add Step 2 components */}
      <StepNameComponent key="stepName" id="Step 3" name="Decisioning Information" />
      {/* Add Step 3 components */}
      <StepNameComponent key="stepName" id="Step 4" name="Complete" />
    </div>
  );
};

export default ClaimWizardBody;
