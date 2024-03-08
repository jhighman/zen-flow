// SelectLicenseCategoryComponent.tsx
import React from 'react';
import SelectInputComponent from './SelectInputComponent';

const SelectLicenseCategoryComponent: React.FC<{ control: any; loading: boolean }> = ({ control, loading }) => {
  const licenseCategoryOptions = [
    { id: 'Medical', name: 'Medical' },
    { id: 'Legal', name: 'Legal' },
    { id: 'Insurance', name: 'Insurance' },
    { id: 'Financial', name: 'Financial' },
  ];

  return <SelectInputComponent name="licenseCategory" countries={licenseCategoryOptions} control={control} loading={loading} />;
};

export default SelectLicenseCategoryComponent;
