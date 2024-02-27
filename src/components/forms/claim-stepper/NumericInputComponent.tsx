import React from 'react';
import { FormField, FormControl, FormLabel, FormItem, FormMessage} from "@/components/ui/form";
import { Input } from '@/components/ui/input';
import { useController } from "react-hook-form";

interface NumericInputComponentProps {
  name: string;
  placeholder: string;
  control: any;
  loading: boolean;
}

const NumericInputComponent: React.FC<NumericInputComponentProps> = ({ name, placeholder, control, loading }) => {
  const {
    field: { ref, ...inputProps },
  } = useController({
    name,
    control,
    defaultValue: loading.toString(), // Convert loading to string for defaultValue
  });

  return (
    <FormField
      control={control}
      name={name}
      render={() => (
        <FormItem>
          <FormLabel>{name}</FormLabel>
          <FormControl>
            <Input
              ref={ref}
              placeholder={placeholder}
              type="number" // Set input type to number
              {...inputProps}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default NumericInputComponent;
