import React, { useCallback } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { CloudUpload, XCircle } from "lucide-react";

type DFileUploaderProps = {
  name: string;
  label?: string;
  className?: string;
  required?: boolean;
  disabled?: boolean;
  labelTextColor?: "text-black" | "text-white";
};

const DFileUploader = ({
  name,
  label,
  className,
  required = false,
  disabled = false,
  labelTextColor = "text-black",
}: DFileUploaderProps) => {
  const { control, setValue } = useFormContext();

  // Handle file drop
  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLLabelElement>) => {
      e.preventDefault();
      e.stopPropagation();

      const files = e.dataTransfer.files;
      if (files.length > 0) {
        setValue(name, files[0]);
      }
    },
    [name, setValue]
  );

  // Prevent default behavior on drag events
  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragEnter = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value, onBlur, ...field }, fieldState: { error } }) => (
        <div className={`w-full ${className}`}>
          {label && (
            <Label htmlFor={name} className={cn(labelTextColor, "block mb-2 text-lg w-full")}>
              {label}
            </Label>
          )}
          <label
            htmlFor={name}
            className={cn(
              "flex flex-col items-center justify-center px-6 py-4 border-2 border-dashed border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-500 bg-white hover:bg-gray-100",
              disabled && "opacity-50 cursor-not-allowed",
              className
            )}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
          >
            <CloudUpload className="w-8 h-8 mb-2" />
            <span className="text-center">
              Drag & Drop or <span className="underline">Upload your file</span>
            </span>
            <Input
              {...field}
              type="file"
              onChange={(e) => onChange((e.target as HTMLInputElement).files?.[0])}
              className="hidden"
              id={name}
              disabled={disabled}
              required={required}
              onBlur={onBlur}
            />
            {value && (
              <div className="flex items-center mt-2 text-sm text-gray-500">
                <span className="flex-grow">{value.name}</span>
                <button
                  type="button"
                  onMouseDown={(e) => {
                    e.stopPropagation(); // Stop propagation of mouse down event
                    // Clear the file input
                    setValue(name, null);
                    // Optionally, reset the input value
                    const fileInput = document.getElementById(name) as HTMLInputElement;
                    if (fileInput) fileInput.value = "";
                  }}
                  className="ml-2 text-red-500 hover:text-red-700"
                >
                  <XCircle className="w-4 h-4" />
                </button>
              </div>
            )}
          </label>

          {error && <span className="text-red-500 text-sm mt-1">{error.message}</span>}
        </div>
      )}
    />
  );
};

export default DFileUploader;
