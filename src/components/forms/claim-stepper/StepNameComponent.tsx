// StepNameComponent.tsx
import React from 'react';

interface StepNameComponentProps {
  id: string;
  name: string;
}

const StepNameComponent: React.FC<StepNameComponentProps> = ({ id, name }) => {
  return (
    <div className="md:flex-1">
      <div className="group flex w-full flex-col border-l-4 border-sky-600 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
        <span className="text-sm font-medium text-sky-600 transition-colors ">
          {id}
        </span>
        <span className="text-sm font-medium">{name}</span>
      </div>
    </div>
  );
};

export default StepNameComponent;
