"use client";
import DForm from "@/components/forms/DForm";
import { z } from "zod";
const formSchema = z.object({});
import { zodResolver } from "@hookform/resolvers/zod";
import DInput from "@/components/forms/DInput";
import DCheckbox from "@/components/forms/DCheckbox";
import DFileUploader from "@/components/forms/DFileUploader";
import DSelect from "@/components/forms/DSelect";

const Login = () => {
  const defaultValues = {
    email: "fbelalhossain2072@gmail.com",
    password: "securePassword12",
  };
  const handleLogin = () => {};

  const options = [
    {
      label: "One",
      value: "One",
    },
  ];
  return (
    <div>
      <DForm resolver={zodResolver(formSchema)} onSubmit={handleLogin} defaultValues={defaultValues}>
        <DInput name="email" />
        <DCheckbox name="select" />
        <DFileUploader name="folder" />
        <DInput name="FIle" />
        <DSelect name="HEllo" options={options} />
      </DForm>
    </div>
  );
};

export default Login;
