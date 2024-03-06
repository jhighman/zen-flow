import React from 'react';
import { SelectInput, useField } from 'payload/components/forms';
import dueDiligenceLevels from './dueDiligenceLevels.json';

export const DueDiligenceLevelSelectComponent: React.FC<{ path: string }> = ({ path }) => {
  const { value, setValue } = useField<string>({ path });
  const options = dueDiligenceLevels.map((level) => ({
    label: level.label,
    value: level.value,
  }));

  return (
    <div>
      <label className='field-label'>
        Due Diligence Level
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
