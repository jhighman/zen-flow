import { Field } from 'payload/types';
import { LicenseCategorySelectComponent } from './LicenseCategorySelectComponent';
import { LicenseClassSelectComponent } from './LicenseClassSelectComponent';

export const LicenseCategorySelectField: Field = {
  name: 'licenseCategory',
  type: 'text',
  admin: {
    components: {
      Field: LicenseCategorySelectComponent,
    },
  }
}

export const LicenseClassSelectField: Field = {
  name: 'licenseClass',
  type: 'text',
  admin: {
    components: {
      Field: LicenseClassSelectComponent,
    },
  },
};

// Previous imports...
import { LicenseTypeSelectComponent } from './LicenseTypeSelectComponent'; // Import the new component
import { LicenseIssuingStateSelectComponent } from './LicenseIssuingStateSelectComponent';
import { ExaminationDecisionSelectComponent } from './ExaminationDecisionSelectComponent';
import { ExaminationDecisionReasonSelectComponent } from './ExaminationDecisionReasonSelectComponent';
import { DueDiligenceLevelSelectComponent } from './DueDiligenceLevelSelectComponent';
import { LicenseStatusSelectComponent } from './LicenseStatusSelectComponent';
import { IssuingStateSelectComponent } from './IssuingStateSelectComponent';


export const LicenseStatusSelectField: Field = {
  name: 'licenseStatus',
  type: 'text', // Use 'text' to facilitate custom component usage
  admin: {
    components: {
      Field: LicenseStatusSelectComponent, // Specify the custom component here
    },
  },
};

export const DueDiligenceLevelSelectField: Field = {
  name: 'dueDilligenceLevel',
  type: 'text', // Changed to 'text' to allow for custom component usage
  admin: {
    components: {
      Field: DueDiligenceLevelSelectComponent, // Specify the custom component here
    },
  },
};

export const ExaminationDecisionReasonSelectField: Field = {
  name: 'examinationDecisionReason',
  type: 'text', // Changed to 'text' to allow for custom component usage
  admin: {
    components: {
      Field: ExaminationDecisionReasonSelectComponent, // Specify the custom component here
    },
  },
};

export const ExaminationDecisionSelectField: Field = {
  name: 'examinationDecision',
  type: 'text', // Use 'text' to facilitate custom component usage
  admin: {
    components: {
      Field: ExaminationDecisionSelectComponent, // Specify the custom component here
    },
  },
};

export const LicenseTypeSelectField: Field = {
  name: 'licenseType',
  type: 'text', // Use 'text' to facilitate custom component usage
  admin: {
    components: {
      Field: LicenseTypeSelectComponent, // Specify the custom component here
    },
  },
};

export const LicenseIssuingStateSelectField: Field = {
  name: 'licenseIssuingState',
  type: 'text',
  admin: {
    components: {
      Field: LicenseIssuingStateSelectComponent,
    },
  },
};

export const IssuingStateSelectField: Field = {
  name: 'licenseIssuingState',
  type: 'text',
  admin: {
    components: {
      Field: IssuingStateSelectComponent,
    },
  },
};