// SelectLicenseCategoryComponent.tsx
import React from 'react';
import SelectInputComponent from './SelectInputComponent';

const SelectLicenseTypeComponent: React.FC<{ control: any; loading: boolean }> = ({ control, loading }) => {
  const licenseCategoryOptions = [
    { id: 'Broker', name: 'Broker' },
    { id: 'Attorney', name: 'Attorney' },
    { id: 'Agent', name: 'Agent' },
    { id: 'Fiduciary', name: 'Fiduciary' },
  ];

  return <SelectInputComponent name="licenseType" countries={licenseCategoryOptions} control={control} loading={loading} />;
};

export default SelectLicenseTypeComponent;
