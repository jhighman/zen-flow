// SelectLicenseStatusComponent.tsx
import React from 'react';
import SelectInputComponent from './SelectInputComponent';

const SelectLicenseClassComponent: React.FC<{ control: any; loading: boolean }> = ({ control, loading }) => {
  const licenseStatusOptions = [
    { id: 'Class1', name: 'Class1' },
    { id: 'Class2', name: 'Class2' },
  ];

  return <SelectInputComponent name="License Status" countries={licenseStatusOptions} control={control} loading={loading} />;
};

export default SelectLicenseClassComponent;