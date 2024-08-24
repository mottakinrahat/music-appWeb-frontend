"use client";
import DForm from "@/components/forms/DForm";
import { z } from "zod";
const formSchema = z.object({});
import { zodResolver } from "@hookform/resolvers/zod";
import DInput from "@/components/forms/DInput";
import DCheckbox from "@/components/forms/DCheckbox";
import DFileUploader from "@/components/forms/DFileUploader";

const Login = () => {
  const defaultValues = {
    email: "fbelalhossain2072@gmail.com",
    password: "securePassword12",
  };
  const handleLogin = () => {};
  return (
    <div>
      <DForm resolver={zodResolver(formSchema)} onSubmit={handleLogin} defaultValues={defaultValues}>
        <h1>
          <DInput name="email" />
          <DCheckbox name="select" />
          <DFileUploader name="folder" />
        </h1>
      </DForm>
    </div>
  );
};

export default Login;
