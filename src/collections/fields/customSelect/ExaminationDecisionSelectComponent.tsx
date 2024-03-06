import React from 'react';
import { SelectInput, useField } from 'payload/components/forms';
import examinationDecisions from './examinationDecisions.json';

export const ExaminationDecisionSelectComponent: React.FC<{ path: string }> = ({ path }) => {
  const { value, setValue } = useField<string>({ path });
  const options = examinationDecisions.map((decision) => ({
    label: decision.label,
    value: decision.value,
  }));

  return (
    <div>
      <label className='field-label'>
        Examination Decision
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
