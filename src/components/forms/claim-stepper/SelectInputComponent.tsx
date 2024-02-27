// SelectInputComponent.tsx
import React from 'react';
import { FormField, FormControl, FormLabel, FormItem, FormMessage} from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface SelectInputComponentProps {
  name: string;
  countries: { id: string; name: string }[];
  control: any; // Add the control prop
  loading: boolean; 
  // Add more props as needed
}

const SelectInputComponent: React.FC<SelectInputComponentProps> = ({ name, countries, control, loading }) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{name}</FormLabel>
          <Select
            disabled={loading}
            onValueChange={field.onChange}
            value={field.value}
            defaultValue={field.value}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue
                  defaultValue={field.value}
                  placeholder={`Select ${name}`}
                />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {countries.map((country) => (
                <SelectItem key={country.id} value={country.id}>
                  {country.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default SelectInputComponent;
