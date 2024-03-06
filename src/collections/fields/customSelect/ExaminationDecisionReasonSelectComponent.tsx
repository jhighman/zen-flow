import React from 'react';
import { SelectInput, useField } from 'payload/components/forms';
import examinationDecisionReasons from './examinationDecisionReasons.json';

export const ExaminationDecisionReasonSelectComponent: React.FC<{ path: string }> = ({ path }) => {
  const { value, setValue } = useField<string>({ path });
  const options = examinationDecisionReasons.map((reason) => ({
    label: reason.label,
    value: reason.value,
  }));

  return (
    <div>
      <label className='field-label'>
        Examination Decision Reason
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
