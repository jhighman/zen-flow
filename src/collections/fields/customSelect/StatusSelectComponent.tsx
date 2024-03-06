import React from 'react';
import { SelectInput, useField } from 'payload/components/forms';
import statusOptions from './statusOptions.json'; // Adjust the path as necessary

export const StatusSelectComponent: React.FC<{ path: string }> = ({ path }) => {
  const { value, setValue } = useField<string>({ path });
  const options = statusOptions.map(option => ({
    label: option.label,
    value: option.value,
  }));

  return (
    <div>
      <label className='field-label'>
        Status
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
