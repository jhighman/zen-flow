// SelectExaminationDecisionReasonComponent.tsx
import React from 'react';
import SelectInputComponent from './SelectInputComponent';

const SelectExaminationDecisionReasonComponent: React.FC<{ control: any; loading: boolean }> = ({ control, loading }) => {
  const examinationDecisionReasonOptions = [
    { id: 'No source available', name: 'No source available' },
    { id: 'Ambiguous Result', name: 'Ambiguous Result' },
    { id: 'Source could not confirm or deny', name: 'Source could not confirm or deny' },
    { id: 'Prohibited Use', name: 'Prohibited Use' },
  ];

  return <SelectInputComponent name="Examination Decision Reason" countries={examinationDecisionReasonOptions} control={control} loading={loading} />;
};

export default SelectExaminationDecisionReasonComponent;
