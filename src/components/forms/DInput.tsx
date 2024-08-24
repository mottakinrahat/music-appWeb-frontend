
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Label } from "../ui/label";
import { cn } from "@/lib/utils";
import { Input } from "../ui/input";

type DInputProps = {
  name: string;
  label?: string;
  type?: string;
  className?: string;
  props?: any;
  defaultValue?: any;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  labelTextColor?: "text-black" | "text-white";
};

const DInput = ({
  name,
  required = false,
  disabled = false,
  label,
  type = "text",
  defaultValue,
  className,
  labelTextColor = "text-black",
  ...props
}: DInputProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      defaultValue={defaultValue}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <div className={` w-full `}>
          {label && (
            <Label
              htmlFor={name}
              className={cn(labelTextColor, "block mb-2 text-lg w-full")}
            >
              {label}
            </Label>
          )}
          <Input
            {...field}
            {...props}
            id={name}
            disabled={disabled}
            required={required}

            type={type}
            className={` ${error ? "border-red-500" : "border-gray-300 w-full flex"
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

export default DInput;
