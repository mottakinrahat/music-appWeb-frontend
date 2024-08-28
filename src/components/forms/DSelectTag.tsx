import * as React from "react";
import { useState, useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Check } from "lucide-react";
import { GoPlus } from "react-icons/go";

type Option = {
  value: string;
  label: string;
};

type DSelectProps = {
  name: string;
  label?: string;
  options: Option[];
  className?: string;
  required?: boolean;
  placeholder?: string;
  defaultValue?: Option[];
  [key: string]: any;
};

const DSelectTag = ({
  name,
  label,
  options,
  className = "",
  required = false,
  placeholder = "Select an option",
  defaultValue = [],
  ...props
}: DSelectProps) => {
  const { control, setValue, clearErrors, getValues, trigger } =
    useFormContext();
  const [selectedTags, setSelectedTags] = useState<Option[]>(defaultValue);
  const [currentValue, setCurrentValue] = useState<string>("");

  useEffect(() => {
    if (defaultValue.length) {
      setSelectedTags(defaultValue);
      setValue(name, defaultValue);
    }
  }, [defaultValue, name, setValue]);

  const handleAddTag = () => {
    const selectedOption = options.find(
      (option) => option.value === currentValue
    );
    if (
      selectedOption &&
      !selectedTags.some((tag) => tag.value === currentValue)
    ) {
      const newTags = [...selectedTags, selectedOption];
      setSelectedTags(newTags);
      setValue(name, newTags);
      setCurrentValue("");
      clearErrors(name); // Clear error when adding a valid tag
      trigger(name); // Trigger validation to ensure errors are up-to-date
    }
  };

  const handleRemoveTag = (value: string) => {
    const updatedTags = selectedTags.filter((tag) => tag.value !== value);
    setSelectedTags(updatedTags);
    setValue(name, updatedTags);
    clearErrors(name); // Clear error when removing a tag
    trigger(name); // Trigger validation to ensure errors are up-to-date
  };

  const filteredOptions = options.filter(
    (option) => !selectedTags.some((tag) => tag.value === option.value)
  );
  const allOptionsSelected =
    options.length > 0 && selectedTags.length === options.length;

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={[]}
      render={({ field, fieldState: { error } }) => (
        <div className={`mb-4 ${className}`}>
          {label && (
            <label htmlFor={name} className="block mb-2">
              {label} {required && <span className="text-red-500">*</span>}
            </label>
          )}
          <div className="flex items-center space-x-2">
            <Select
              {...field}
              value={currentValue}
              onValueChange={(value) => setCurrentValue(value)}
              {...props}
              disabled={allOptionsSelected}
            >
              <SelectTrigger
                className={`w-full ${
                  error ? "border-red-500" : "border-gray-300"
                }`}
                aria-label={label}
              >
                <SelectValue
                  placeholder={
                    allOptionsSelected ? "All selected" : placeholder
                  }
                />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>{label}</SelectLabel>
                  {filteredOptions.map((option) => (
                    <SelectItem
                      key={option.value}
                      value={option.value}
                      disabled={selectedTags.some(
                        (tag) => tag.value === option.value
                      )}
                    >
                      <div className="flex items-center">
                        {selectedTags.some(
                          (tag) => tag.value === option.value
                        ) && <Check className="mr-2 h-4 w-4 text-primary" />}
                        <span>{option.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            <button
              type="button"
              onClick={handleAddTag}
              className={`p-2 h-[40px] flex items-center justify-center w-[40px] bg-white text-white rounded-md border`}
              aria-label="Add Tag"
              disabled={allOptionsSelected}
            >
              <GoPlus className="text-black" />
            </button>
          </div>
          {error && (
            <span className="text-red-500 text-sm mt-1">{error.message}</span>
          )}

          <div className="mt-2 flex flex-wrap gap-2">
            {selectedTags.map((tag) => (
              <span
                key={tag.value}
                className="inline-flex items-center px-3 py-2 transition text-sm font-medium border border-[#00CCD0] text-[#00CCD0] bg-white rounded-full"
              >
                {tag.label}
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag.value)}
                  className="ml-2 text-red-500 transition hover:text-red-700"
                  aria-label={`Remove ${tag.label}`}
                >
                  X
                </button>
              </span>
            ))}
          </div>
        </div>
      )}
    />
  );
};

export default DSelectTag;
