// TextInputComponent.tsx
import React from 'react';
import { FormField, FormControl, FormLabel, FormItem, FormMessage} from "@/components/ui/form";
import { Input } from '@/components/ui/input';

interface TextInputComponentProps {
  name: string;
  placeholder: string;
  control: any;
  loading: boolean; // Add the loading prop
  // Add more props as needed
}

const TextInputComponent: React.FC<TextInputComponentProps> = ({ name, placeholder, control, loading }) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{name}</FormLabel>
          <FormControl>
            <Input
              disabled={loading}
              placeholder={placeholder}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default TextInputComponent;
