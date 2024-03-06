import React from 'react';
import { SelectInput, useField } from 'payload/components/forms';
import licenseStatuses from './licenseStatuses.json';

export const LicenseStatusSelectComponent: React.FC<{ path: string }> = ({ path }) => {
  const { value, setValue } = useField<string>({ path });
  const options = licenseStatuses.map((status) => ({
    label: status.label,
    value: status.value,
  }));

  return (
    <div>
      <label className='field-label'>
        License Status
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
