import { Checkbox } from "@/components/ui/checkbox";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

type DCheckboxProps = {
  name: string;
  id?: string;
  label?: string;
  className?: string;
  required?: boolean;
};

const DCheckbox = ({
  name,
  id,
  className,
  ...props
}: DCheckboxProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <div className={`mb-4 ${className}`}>
          
          <Checkbox
            id={id || name}
            {...props}
            {...field}
            checked={field.value || false}
            onCheckedChange={(checked) => field.onChange(checked)}
          />
          {error && (
            <span className="text-red-500 text-sm mt-1">{error.message}</span>
          )}
        </div>
      )}
    />
  );
};

export default DCheckbox;
