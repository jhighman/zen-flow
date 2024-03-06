import React from 'react';
import { SelectInput, useField } from 'payload/components/forms';
import priorityOptions from './priorityOptions.json'; // Adjust the path as necessary

export const PrioritySelectComponent: React.FC<{ path: string }> = ({ path }) => {
  const { value, setValue } = useField<string>({ path });
  const options = priorityOptions.map(option => ({
    label: option.label,
    value: option.value,
  }));

  return (
    <div>
      <label className='field-label'>
        Priority
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
