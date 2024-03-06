import React from 'react';
import { SelectInput, useField } from 'payload/components/forms';
import licenseIssuingStates from './issuingStates.json';

export const IssuingStateSelectComponent: React.FC<{ path: string }> = ({ path }) => {
  const { value, setValue } = useField<string>({ path });
  const options = licenseIssuingStates.map((state) => ({
    label: state.label,
    value: state.value,
  }));

  return (
    <div>
      <label className='field-label'>
        License Issuing State
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

