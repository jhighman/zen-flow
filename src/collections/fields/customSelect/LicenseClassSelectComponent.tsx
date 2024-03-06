import React from 'react';
import { SelectInput, useField } from 'payload/components/forms';
import licenseClasses from './licenseClasses.json';

export const LicenseClassSelectComponent: React.FC<{ path: string }> = ({ path }) => {
  const { value, setValue } = useField<string>({ path });
  const options = licenseClasses.map((licenseClasses) => ({
    label: licenseClasses.label,
    value: licenseClasses.value,
  }));

  return (
    <div>
      <label className='field-label'>
        License Class
      </label>
      <SelectInput
        path={path}
        name={path}
        options={options}
        value={value}
        onChange={(e) => setValue(e.value)}
      />
    </div>
  );
};
