import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Textarea } from "../ui/textarea";

type DTextareaProps = {
  name: string;
  label?: string;
  className?: string;
  placeholder?: string;
  required?: boolean;
  rows?: number;
  cols?: number;
  [key: string]: any;
};

const DTextarea = ({
  name,
  label,
  className = "",
  placeholder,
  required = true,

  ...props
}: DTextareaProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <div className={`mb-4 ${className}`}>
          {label && (
            <label htmlFor={name} className="block mb-2">
              {label}
            </label>
          )}
          <Textarea
            {...field}
            {...props}
            id={name}
            placeholder={placeholder}
            className={`border p-2  ${
              error ? "border-red-500" : "border-gray-300"
            } ${className}`}
          />
          {error && (
            <span className="text-red-500 text-sm mt-1">{error.message}</span>
          )}
        </div>
      )}
    />
  );
};

export default DTextarea;
