// SelectLicenseStatusComponent.tsx
import React from 'react';
import SelectInputComponent from './SelectInputComponent';

const SelectLicenseStatusComponent: React.FC<{ control: any; loading: boolean }> = ({ control, loading }) => {
  const licenseStatusOptions = [
    { id: 'Active', name: 'Active' },
    { id: 'Expired', name: 'Expired' },
    { id: 'Suspended', name: 'Suspended' },
    { id: 'Provisional', name: 'Provisional' },
  ];

  return <SelectInputComponent name="licenseStatus" countries={licenseStatusOptions} control={control} loading={loading} />;
};

export default SelectLicenseStatusComponent;
