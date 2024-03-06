import React from 'react';
import { SelectInput, useField } from 'payload/components/forms';
import licenseTypes from './licenseTypes.json'; // Import your local JSON data

export const LicenseTypeSelectComponent: React.FC<{ path: string }> = ({ path }) => {
  const { value, setValue } = useField<string>({ path });
  // Use the imported licenseTypes as options
  const options = licenseTypes.map((licenseType) => ({
    label: licenseType.label,
    value: licenseType.value,
  }));

  return (
    <div>
      <label className='field-label'>
        License Type
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
