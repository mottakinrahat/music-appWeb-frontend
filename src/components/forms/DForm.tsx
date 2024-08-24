import { useState } from "react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
type DFormConfig = {
  resolver?: any;
  defaultValues?: Record<string, any>;
};

type DFormProps = {
  children: React.ReactNode;
  onSubmit: SubmitHandler<FieldValues>;
  resolver?: any;
  defaultValues?: any;
  className?: string;
} & DFormConfig;

const DForm = ({
  children,
  onSubmit,
  resolver,
  defaultValues,
  className,
}: DFormProps) => {
  const formConfig: DFormConfig = {};

  if (resolver) {
    formConfig["resolver"] = resolver;
  }

  if (defaultValues) {
    formConfig["defaultValues"] = defaultValues;
  }

  const methods = useForm(formConfig);
  const { handleSubmit, reset } = methods;

  const submit: SubmitHandler<FieldValues> = (data) => {
    onSubmit(data);
    reset();
  };

  return (
    <FormProvider {...methods}>
      <form className={className} onSubmit={handleSubmit(submit)}>
        {children}
      </form>
    </FormProvider>
  );
};

export default DForm;
