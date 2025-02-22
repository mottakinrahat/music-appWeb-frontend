"use client";
import SocialLogin from "@/components/common/socialLogin/SocialLogin";
import DCheckbox from "@/components/forms/DCheckbox";
import DForm from "@/components/forms/DForm";
import DInput from "@/components/forms/DInput";
import { Button } from "@/components/ui/button";
import { useRegisterMutation } from "@/redux/api/authApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React from "react";
import { FaApple, FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { toast, Toaster } from "sonner";
import { z } from "zod";

const signupSchema = z
  .object({
    firstName: z
      .string()
      .nonempty("First name is required")
      .min(2, "First name must be at least 2 characters long"),
    lastName: z
      .string()
      .nonempty("Last name is required")
      .min(2, "Last name must be at least 2 characters long"),
    email: z
      .string()
      .nonempty("Email is required")
      .email("Invalid email address"),
    password: z
      .string()
      .nonempty("Password is required")
      .min(8, "Password must be at least 8 characters long")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      ),
    confirmPassword: z.string().nonempty("Confirm Password is required"),
    rememberPassword: z.boolean().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password and Confirm Password must be the same.",
    path: ["confirmPassword"],
  });

const SignupPage: React.FC = () => {
  const [register, { isLoading, error }] = useRegisterMutation();
  const defaultValues = {};
  const router = useRouter();

  const handleSubmit = async (data: any) => {
    // console.log(data);
    const { confirmPassword, ...rest } = data;

    try {
      const res = await register(rest).unwrap();
      if (res.success) {
        toast.success("Account created successfully");
        router.push("/plans");
      }
    } catch (error: unknown) {
      // Type assertion for the error object
      const errorData = (error as { data?: { message?: string } })?.data;

      // Check if errorData and errorMessage are defined before using them
      if (errorData?.message) {
        const errorMessage = errorData.message.toUpperCase();
        toast.error(errorMessage);
      } else {
        toast.error("An unknown error occurred.");
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col max-w-xl mx-auto items-center justify-center">
      <Toaster position="bottom-center" />
      <DForm
        resolver={zodResolver(signupSchema)}
        className="flex flex-col gap-5 w-full p-4"
        onSubmit={handleSubmit}
        defaultValues={defaultValues}
      >
        <h1 className="text-[#262626] md:text-5xl  text-xl sm:text-2xl font-semibold">
          Create an account
        </h1>
        <p className="font-semibold md:text-base leading-6 text-sm">
          Already have an account?<span className="text-accent"> Log in </span>
        </p>

        <div className="flex items-start justify-between gap-5">
          <DInput
            defaultValue={"Test First Name"}
            labelTextColor="#262626"
            name="firstName"
            label="First Name"
            placeholder="Enter your first name"
          />
          <DInput
            defaultValue={"Test Last Name"}
            labelTextColor="#262626"
            name="lastName"
            label="Last Name"
            placeholder="Enter your last name"
          />
        </div>
        {/* Email */}
        <DInput
          defaultValue={""}
          labelTextColor="#262626"
          name="email"
          label="Email"
          placeholder="Enter your email"
        />
        {/* Password */}
        <DInput
          defaultValue={"@1111aA1111"}
          labelTextColor="#262626"
          name="password"
          label="Password"
          placeholder="Enter your password"
          type="password"
        />
        <DInput
          defaultValue={"@1111aA1111"}
          labelTextColor="#262626"
          name="confirmPassword"
          label="Confirm Password"
          placeholder="Enter your password"
          type="password"
        />
        {/* Submit Button */}
        <Button type="submit" variant="default">
          Sign up
        </Button>

        {/* Divider */}
        <div className="flex items-center mb-5 justify-center">
          <div className="flex-grow h-[1px] bg-gradient-to-r to-black from-white"></div>
          <p className="mx-4">or</p>
          <div className="flex-grow h-[1px] bg-gradient-to-r from-black to-white"></div>
        </div>
      </DForm>

      {/* Social Logins */}
      <div className="w-full space-y-5 p-4">
        <SocialLogin
          icon={<FcGoogle />}
          text="Continue with Google"
          className="flex w-full items-center px-4 py-2 bg-[#F2F2F2] rounded-lg justify-center text-black font-semibold"
        />

        <SocialLogin
          icon={<FaFacebook />}
          text="Continue with Facebook"
          className="flex w-full items-center px-4 py-2 bg-[#1877F2] rounded-lg justify-center text-white font-semibold"
        />

        <SocialLogin
          icon={<FaApple />}
          text="Continue with Apple"
          className="flex w-full items-center px-4 py-2 bg-black rounded-lg justify-center text-white font-semibold"
        />
      </div>

      <p className="text-[#4C4C4C] mt-5 p-4 text-sm md:text-base">
        By clicking &quot;Sign up&quot; above, you acknowledge that you have
        read and you agree to our General{" "}
        <span className="font-semibold">Terms and Conditions</span> and have
        read and acknowledge the{" "}
        <span className="font-semibold">Privacy policy.</span>
      </p>
    </div>
  );
};

export default SignupPage;
