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
import { StatusSelectComponent } from './StatusSelectComponent';
import { PrioritySelectComponent } from './PrioritySelectComponent';
import { QueueNameSelectComponent } from './QueueNameSelectComponent';


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
  type: 'number', // Changed to 'text' to allow for custom component usage
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
  name: 'issuingState',
  type: 'text',
  admin: {
    components: {
      Field: IssuingStateSelectComponent,
    },
  },
};

export const StatusSelectField: Field = {
  name: 'status',
  type: 'text', // Use 'text' to leverage custom component functionality
  admin: {
    components: {
      Field: StatusSelectComponent,
    },
  },
};

export const PrioritySelectField: Field = {
  name: 'priority',
  type: 'text', // Use 'text' to leverage custom component functionality
  admin: {
    components: {
      Field: PrioritySelectComponent,
    },
  },
};

export const QueueNameSelectField: Field = {
  name: 'queueName',
  type: 'text', // Use 'text' to leverage custom component functionality
  admin: {
    components: {
      Field: QueueNameSelectComponent,
    },
  },
};