import React, { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Label } from "../ui/label";
import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import { HiEye, HiEyeOff } from "react-icons/hi"; // Importing eye icons

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
  labelTextColor?: string;
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
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Controller
      control={control}
      defaultValue={defaultValue}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <div className="w-full relative">
          {label && (
            <Label htmlFor={name} className={cn(labelTextColor, "block mb-2 font-semibold text-lg w-full")}>
              {label}
            </Label>
          )}
          <Input
            {...field}
            {...props}
            id={name}
            disabled={disabled}
            required={required}
            type={type === "password" && !showPassword ? "password" : "text"}
            className={`${
              error ? "border-red-500" : "border-gray-300"
            } ${className} w-full flex focus-visible:shadow-none focus-visible:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-accent`}
          />
          {type === "password" && (
            <button
              type="button"
              onClick={handleTogglePassword}
              className="absolute inset-y-0 top-9 right-0 flex items-center px-3"
            >
              {showPassword ? <HiEye className="text-gray-500" /> : <HiEyeOff className="text-gray-500" />}
            </button>
          )}
          {error && <span className="text-red-500 text-sm mt-1">{error.message}</span>}
        </div>
      )}
    />
  );
};

export default DInput;
