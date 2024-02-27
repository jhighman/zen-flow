import React from 'react';
import { FormField, FormControl, FormLabel, FormItem, FormMessage} from "@/components/ui/form";
import { Input } from '@/components/ui/input';
import { useController } from "react-hook-form";

interface DateInputComponentProps {
  name: string;
  placeholder: string;
  control: any;
  loading: boolean;
}

const DateInputComponent: React.FC<DateInputComponentProps> = ({ name, placeholder, control, loading }) => {
  const {
    field: { ref, ...inputProps },
  } = useController({
    name,
    control,
    defaultValue: loading ? new Date().toISOString() : '', // Default value to current date if loading, otherwise empty string
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
              type="date" // Set input type to date for date input
              disabled={loading} // Disable input if loading
              {...inputProps}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default DateInputComponent;
