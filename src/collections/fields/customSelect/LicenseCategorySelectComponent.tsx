import * as React from 'react';
import { SelectInput, useField } from 'payload/components/forms';
import licenseCategories from './licenseCategories.json'; // Import your local JSON data

export const LicenseCategorySelectComponent: React.FC<{ path: string }> = ({ path }) => {
  const { value, setValue } = useField<string>({ path });

  // Use the imported licenseCategories as options
  const options = licenseCategories.map((category) => ({
    label: category.label,
    value: category.value,
  }));

  return (
    <div>
      <label className='field-label'>
        License Category
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
