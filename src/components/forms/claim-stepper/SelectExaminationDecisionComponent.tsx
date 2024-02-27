// SelectExaminationDecisionComponent.tsx
import React from 'react';
import SelectInputComponent from './SelectInputComponent';

const SelectExaminationDecisionComponent: React.FC<{ control: any; loading: boolean }> = ({ control, loading }) => {
  const examinationDecisionOptions = [
    { id: 'Verified', name: 'Verified' },
    { id: 'Verified False', name: 'Verified False' },
    { id: 'Verification Pending', name: 'Verification Pending' },
    { id: 'Unverifiable', name: 'Unverifiable' },
  ];

  return <SelectInputComponent name="Examination Decision" countries={examinationDecisionOptions} control={control} loading={loading} />;
};

export default SelectExaminationDecisionComponent;
