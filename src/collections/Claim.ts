import {
    AfterChangeHook,
    BeforeChangeHook,
  } from 'payload/dist/collections/config/types'
  import { Access, CollectionConfig } from 'payload/types'
  import { Claim, User } from '../payload-types'
  import { DueDiligenceLevelSelectField, ExaminationDecisionReasonSelectField, ExaminationDecisionSelectField, IssuingStateSelectField, LicenseCategorySelectField, LicenseClassSelectField, LicenseIssuingStateSelectField, LicenseStatusSelectField, LicenseTypeSelectField, PrioritySelectField, QueueNameSelectField, StatusSelectField } from "../collections/fields/customSelect/field";
  
  const addUserToClaim: BeforeChangeHook<Claim> = async ({
    req,
    data,
  }) => {
    const user = req.user
  
    return { ...data, user: user.id }
  }
  
  const syncUserClaims: AfterChangeHook<Claim> = async ({
    req,
    doc,
  }) => {
    // This would be similar to syncUser but adapted for Claims.
  }
  
  const isAdminOrHasAccess =
  (): Access =>
  ({ req: { user: _user } }) => {
    const user = _user as User | undefined;

    // If no user is present, access is denied
    if (!user) return false;

    // If the user is an admin, access is granted
    if (user.role === 'admin') return true;

    // For users that are not admins, access is denied
    return false;
  };

   
  
  export const Claims: CollectionConfig = {
    slug: 'claims',
    admin: {
      useAsTitle: 'lastName',
    },
    access: {
      read: isAdminOrHasAccess(),
      update: isAdminOrHasAccess(),
      delete: isAdminOrHasAccess(),
    },
    hooks: {
      // Adjust your hooks here to match Claim logic instead of product logic.
      afterChange: [syncUserClaims],
      beforeChange: [addUserToClaim],
    },
    fields: [
      StatusSelectField,
      {
        name: 'statusDate',
        label: 'Status Date',
        type: 'date',
        required: false,
        admin: {
          date: {
            pickerAppearance: 'dayOnly',
            displayFormat: 'd MMM yyy',
          },
        },
      },
      PrioritySelectField,
      QueueNameSelectField,
      {
        name: 'user',
        type: 'relationship',
        relationTo: 'users',
        required: false,
        hasMany: false,
        admin: {
          condition: () => true,
        },
      },
      {
        name: 'firstName',
        label: 'First Name',
        type: 'text',
        required: false,
      },
      {
        name: 'middleName',
        label: 'Middle Name',
        type: 'text',
        required: false,
      },
      {
        name: 'lastName',
        label: 'Last Name',
        type: 'text',
        required: false,
      },
      LicenseCategorySelectField,
      LicenseTypeSelectField,
      LicenseClassSelectField,
      {
        name: 'licenseIdentifier',
        label: 'License Identifier',
        type: 'text',
        required: false,
      },
      LicenseIssuingStateSelectField,
      {
        name: 'claimExpirationMonth',
        label: 'Expiration Month Claimed' ,
        type: 'number',
        required: false,
      },
      {
        name: 'claimExpirationYear',
        label: 'Expiration Year Claimed',
        type: 'number',
        required: false,
      },
      {
        name: 'issuer',
        label: 'Issuer',
        type: 'text',
        required: false,
      },
      IssuingStateSelectField,
      LicenseStatusSelectField,
      {
        name: 'expirationMonth',
        label: 'Expiration Month' ,
        type: 'number',
        required: false,
      },
      {
        name: 'expirationYear',
        label: 'Expiration Year',
        type: 'number',
        required: false,
      },
      {
        name: 'notesAndReferences',
        label: 'Notes and references',
        type: 'text',
        required: false,
      },
      ExaminationDecisionSelectField,  
      ExaminationDecisionReasonSelectField,
      {
        name: 'validUntil',
        label: 'Valid Until',
        type: 'date',
        required: false,
      },
      DueDiligenceLevelSelectField,       
    ] }

  