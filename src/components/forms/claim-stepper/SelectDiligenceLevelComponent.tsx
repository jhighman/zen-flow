// SelectDiligenceLevelComponent.tsx
import React from 'react';
import SelectInputComponent from './SelectInputComponent';

const SelectDiligenceLevelComponent: React.FC<{ control: any; loading: boolean }> = ({ control, loading }) => {
  const diligenceLevelOptions = [
    { id: '1', name: 'Level 1 - Automated' },
    { id: '2', name: 'Level 2 - Human Review' },
    { id: '3', name: 'Level 3 - Evidence Enhanced' },
  ];

  return <SelectInputComponent name="Diligence Level" countries={diligenceLevelOptions} control={control} loading={loading} />;
};

export default SelectDiligenceLevelComponent;
