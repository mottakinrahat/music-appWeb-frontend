import React from "react";
import { Controller, useFormContext} from "react-hook-form";

type Option = {
  value: string;
  label: string;
};

type DSelectProps = {
  name:string;
  label?: string;
  options: Option[];
  className?: string;
  required?: boolean;
  // Additional props specific to Select component
  [key: string]: any;
};

const DSelect =({
  name,
  label,
  options,
  className = "",
  required = false,
  ...props
}:DSelectProps ) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name as string}
      render={({ field, fieldState: { error } }) => (
        <div className={`mb-4 ${className}`}>
          {label && (
            <label htmlFor={name as string} className="block mb-2">
              {label}
            </label>
          )}
          <select
            {...field}
            {...props}
            required={required}
            className={`border h-10 rounded ${error ? 'border-red-500' : 'border-gray-300'} ${className}`}
          >
            <option value="" disabled>Select an option</option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}    
          </select>
          {error && <span className="text-red-500 text-sm mt-1">{error.message}</span>}
        </div>
      )}
    />
  );
};

export default DSelect;
