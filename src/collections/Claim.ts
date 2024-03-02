import {
    AfterChangeHook,
    BeforeChangeHook,
  } from 'payload/dist/collections/config/types'
  import { Access, CollectionConfig } from 'payload/types'
  import { Claim, User } from '../payload-types'
  
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
    const user = _user as User | undefined

    if (!user) return false
    if (user.role === 'admin') return true

    const userClaimIDs = (user.claims || []).reduce<
      Array<string>
    >((acc, claim) => {
      if (!claim) return acc
      if (typeof claim === 'string') {
        acc.push(claim)
      } else {
        acc.push(claim.id)
      }

      return acc
    }, [])

    return {
      id: {
        in: userClaimIDs,
      },
    }
  }
   
  
  export const Claims: CollectionConfig = {
    slug: 'Claims',
    admin: {
      useAsTitle: 'name',
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
        name: 'firstname',
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
      {
        name: 'licenseCategory',
        label: 'License Category',
        type: 'select',
        options: [
          { label: 'Medical', value: 'Medical' },
          { label: 'Legal', value: 'Legal' },
          { label: 'Insurance', value: 'Insurance' },
          { label: 'Financial', value: 'Financial' },
        ],
        required: false,
      },
      {
        name: 'licenseType', // New field for LicenseType
        label: 'License Type',
        type: 'select',
        options: [
          { label: 'Broker', value: 'Broker' },
          { label: 'Attorney', value: 'Attorney' },
          { label: 'Agent', value: 'Agent' },
          { label: 'Fiduciary', value: 'Fiduciary' },
        ],
        required: false,
      },
      {
        name: 'licenseClass', // New field for LicenseClass
        label: 'License Class',
        type: 'select',
        options: [
          { label: 'Class1', value: 'Class1' },
          { label: 'Class2', value: 'Class2' },
        ],
        required: false,
      },
      {
        name: 'licenseIdentifier',
        label: 'License Identifier',
        type: 'text',
        required: false,
      },
      {
        name: 'licenseIssuingState', // New field for LicenseIssuingState
        label: 'License Issuing State',
        type: 'select',
        options: [
          { label: 'Alabama', value: 'AL' },
          { label: 'Alaska', value: 'AK' },
          { label: 'Arizona', value: 'AZ' },
          { label: 'Arkansas', value: 'AR' },
          { label: 'California', value: 'CA' },
          { label: 'Colorado', value: 'CO' },
          { label: 'Connecticut', value: 'CT' },
          { label: 'Delaware', value: 'DE' },
          { label: 'Florida', value: 'FL' },
          { label: 'Georgia', value: 'GA' },
          { label: 'Hawaii', value: 'HI' },
          { label: 'Idaho', value: 'ID' },
          { label: 'Illinois', value: 'IL' },
          { label: 'Indiana', value: 'IN' },
          { label: 'Iowa', value: 'IA' },
          { label: 'Kansas', value: 'KS' },
          { label: 'Kentucky', value: 'KY' },
          { label: 'Louisiana', value: 'LA' },
          { label: 'Maine', value: 'ME' },
          { label: 'Maryland', value: 'MD' },
          { label: 'Massachusetts', value: 'MA' },
          { label: 'Michigan', value: 'MI' },
          { label: 'Minnesota', value: 'MN' },
          { label: 'Mississippi', value: 'MS' },
          { label: 'Missouri', value: 'MO' },
          { label: 'Montana', value: 'MT' },
          { label: 'Nebraska', value: 'NE' },
          { label: 'Nevada', value: 'NV' },
          { label: 'New Hampshire', value: 'NH' },
          { label: 'New Jersey', value: 'NJ' },
          { label: 'New Mexico', value: 'NM' },
          { label: 'New York', value: 'NY' },
          { label: 'North Carolina', value: 'NC' },
          { label: 'North Dakota', value: 'ND' },
          { label: 'Ohio', value: 'OH' },
          { label: 'Oklahoma', value: 'OK' },
          { label: 'Oregon', value: 'OR' },
          { label: 'Pennsylvania', value: 'PA' },
          { label: 'Rhode Island', value: 'RI' },
          { label: 'South Carolina', value: 'SC' },
          { label: 'South Dakota', value: 'SD' },
          { label: 'Tennessee', value: 'TN' },
          { label: 'Texas', value: 'TX' },
          { label: 'Utah', value: 'UT' },
          { label: 'Vermont', value: 'VT' },
          { label: 'Virginia', value: 'VA' },
          { label: 'Washington', value: 'WA' },
          { label: 'West Virginia', value: 'WV' },
          { label: 'Wisconsin', value: 'WI' },
          { label: 'Wyoming', value: 'WY' },
          { label: 'American Samoa', value: 'AS' },
          { label: 'District of Columbia', value: 'DC' },
          { label: 'Federated States of Micronesia', value: 'FM' },
          { label: 'Guam', value: 'GU' },
          { label: 'Marshall Islands', value: 'MH' },
          { label: 'Northern Mariana Islands', value: 'MP' },
          { label: 'Palau', value: 'PW' },
          { label: 'Puerto Rico', value: 'PR' },
          { label: 'Virgin Islands', value: 'VI' },
        ],
        required: false,
      },
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
      {
        name: 'issuingState', // New field for LicenseIssuingState
        label: 'Issuing State',
        type: 'select',
        options: [
          { label: 'Alabama', value: 'AL' },
          { label: 'Alaska', value: 'AK' },
          { label: 'Arizona', value: 'AZ' },
          { label: 'Arkansas', value: 'AR' },
          { label: 'California', value: 'CA' },
          { label: 'Colorado', value: 'CO' },
          { label: 'Connecticut', value: 'CT' },
          { label: 'Delaware', value: 'DE' },
          { label: 'Florida', value: 'FL' },
          { label: 'Georgia', value: 'GA' },
          { label: 'Hawaii', value: 'HI' },
          { label: 'Idaho', value: 'ID' },
          { label: 'Illinois', value: 'IL' },
          { label: 'Indiana', value: 'IN' },
          { label: 'Iowa', value: 'IA' },
          { label: 'Kansas', value: 'KS' },
          { label: 'Kentucky', value: 'KY' },
          { label: 'Louisiana', value: 'LA' },
          { label: 'Maine', value: 'ME' },
          { label: 'Maryland', value: 'MD' },
          { label: 'Massachusetts', value: 'MA' },
          { label: 'Michigan', value: 'MI' },
          { label: 'Minnesota', value: 'MN' },
          { label: 'Mississippi', value: 'MS' },
          { label: 'Missouri', value: 'MO' },
          { label: 'Montana', value: 'MT' },
          { label: 'Nebraska', value: 'NE' },
          { label: 'Nevada', value: 'NV' },
          { label: 'New Hampshire', value: 'NH' },
          { label: 'New Jersey', value: 'NJ' },
          { label: 'New Mexico', value: 'NM' },
          { label: 'New York', value: 'NY' },
          { label: 'North Carolina', value: 'NC' },
          { label: 'North Dakota', value: 'ND' },
          { label: 'Ohio', value: 'OH' },
          { label: 'Oklahoma', value: 'OK' },
          { label: 'Oregon', value: 'OR' },
          { label: 'Pennsylvania', value: 'PA' },
          { label: 'Rhode Island', value: 'RI' },
          { label: 'South Carolina', value: 'SC' },
          { label: 'South Dakota', value: 'SD' },
          { label: 'Tennessee', value: 'TN' },
          { label: 'Texas', value: 'TX' },
          { label: 'Utah', value: 'UT' },
          { label: 'Vermont', value: 'VT' },
          { label: 'Virginia', value: 'VA' },
          { label: 'Washington', value: 'WA' },
          { label: 'West Virginia', value: 'WV' },
          { label: 'Wisconsin', value: 'WI' },
          { label: 'Wyoming', value: 'WY' },
          { label: 'American Samoa', value: 'AS' },
          { label: 'District of Columbia', value: 'DC' },
          { label: 'Federated States of Micronesia', value: 'FM' },
          { label: 'Guam', value: 'GU' },
          { label: 'Marshall Islands', value: 'MH' },
          { label: 'Northern Mariana Islands', value: 'MP' },
          { label: 'Palau', value: 'PW' },
          { label: 'Puerto Rico', value: 'PR' },
          { label: 'Virgin Islands', value: 'VI' },
        ],
        required: false,
      },
      {
        name: 'licenseStatus', // New field for LicenseStatus
        label: 'License Status',
        type: 'select',
        options: [
          { label: 'Active', value: 'Active' },
          { label: 'Expired', value: 'Expired' },
          { label: 'Suspended', value: 'Suspended' },
          { label: 'Provisional', value: 'Provisional' },
        ],
        required: false,
      },
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
      {
        name: 'examinationDecision', // New field for ExaminationDecision
        label: 'Examination Decision',
        type: 'select',
        options: [
          { label: 'Verified', value: 'Verified' },
          { label: 'Verified False', value: 'Verified False' },
          { label: 'Verification Pending', value: 'Verification Pending' },
          { label: 'Unverifiable', value: 'Unverifiable' },
        ],        
        required: false,
      },    
      {
        name: 'examinationDecisionReason', // New field for ExaminationDecisionReason
        label: 'Examination Decision Reason',
        type: 'select',
        options: [
          { label: 'No source available', value: 'No source available' },
          { label: 'Ambiguous Result', value: 'Ambiguous Result' },
          { label: 'Source could not confirm or deny', value: 'Source could not confirm or deny' },
          { label: 'Prohibited Use', value: 'Prohibited Use' },
        ],        
        required: false,
      },
      {
        name: 'validUntil',
        label: 'Valid Until',
        type: 'date',
        required: false,
      },
      {
        name: 'dueDilligenceLevel', // New field for Due Diligence Level
        label: 'Due Diligence Level',
        type: 'select',
        options: [
          { label: 'Level 1 - Automated', value: '1' },
          { label: 'Level 2 - Human Review', value: '2' },
          { label: 'Level 3 - Evidence Enhanced', value: '3' },
        ],
        required: false,
      },        
    ] }

  