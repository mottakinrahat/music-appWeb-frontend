import React, { useCallback, useRef } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { CloudUpload, XCircle } from "lucide-react";
import cloudUpoadImage from "@/assets/icons/cloud_upload.svg";
import Image from "next/image";

// Define the props for the DFileUploader component
type DFileUploaderProps = {
  name: string;
  label?: string;
  className?: string;
  required?: boolean;
  disabled?: boolean;
  labelTextColor?: "text-black" | "text-white";
  accept?: string;
};

// DFileUploader component
const DFileUploader = ({
  name,
  label,
  className,
  required = false,
  disabled = false,
  labelTextColor = "text-black",
  accept,
}: DFileUploaderProps) => {
  const { control, setValue } = useFormContext(); // Get control and setValue from useFormContext
  const fileInputRef = useRef<HTMLInputElement>(null); // Create a ref for the file input

  // Handle file drop event
  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLLabelElement>) => {
      e.preventDefault();
      e.stopPropagation();

      const files = e.dataTransfer.files;
      if (files.length > 0) {
        const fileList = Array.from(files);
        setValue(name, fileList); // Set the dropped files to the form state
      }
    },
    [name, setValue]
  );

  // Prevent default behavior on drag over event
  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  // Prevent default behavior on drag enter event
  const handleDragEnter = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  // Prevent default behavior on drag leave event
  const handleDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  // Reset the file input value
  const resetFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
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
              "flex flex-col items-center justify-center px-6 py-8 border-2 border-dashed border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-500 bg-white hover:bg-gray-100",
              disabled && "opacity-50 cursor-not-allowed",
              className
            )}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
          >
            {/* Display cloud upload image */}
            <Image src={cloudUpoadImage} alt="cloud upload" width={50} height={50} />

            <span className="text-center text-[#262626] font-normal mt-4">
              Drag & Drop or <span className="underline">Upload your files</span>
            </span>
            <Input
              {...field}
              type="file"
              accept={accept} // Accept only audio files
              multiple // Enable multiple file selection
              onChange={(e) => onChange(Array.from((e.target as HTMLInputElement).files || []))}
              className="hidden"
              id={name}
              disabled={disabled}
              required={required}
              onBlur={onBlur}
              ref={fileInputRef}
            />
            {value && value.length > 0 && (
              <div className="flex flex-col mt-2 text-sm text-gray-500 ">
                {value.map((file: File, index: number) => (
                  <div key={index} className="flex items-center ">
                    <span className="flex-grow">{file.name}</span>
                    <button
                      type="button"
                      onMouseDown={(e) => {
                        e.stopPropagation(); // Stop propagation of mouse down event
                        // Remove the file
                        const updatedFiles = value.filter((_: any, i: any) => i !== index);
                        setValue(name, updatedFiles);

                        // Reset the file input if no files are left
                        if (updatedFiles.length === 0) {
                          resetFileInput();
                        }
                      }}
                      className="ml-2 text-red-500 hover:text-red-700"
                    >
                      <XCircle className="w-4 h-4" />
                    </button>
                  </div>
                ))}
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
