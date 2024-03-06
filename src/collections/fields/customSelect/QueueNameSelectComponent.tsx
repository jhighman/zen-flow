import React from 'react';
import { SelectInput, useField } from 'payload/components/forms';
import queueNameOptions from './queueNameOptions.json'; // Adjust the path as necessary

export const QueueNameSelectComponent: React.FC<{ path: string }> = ({ path }) => {
  const { value, setValue } = useField<string>({ path });
  const options = queueNameOptions.map(option => ({
    label: option.label,
    value: option.value,
  }));

  return (
    <div>
      <label className='field-label'>
        Queue Name
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
