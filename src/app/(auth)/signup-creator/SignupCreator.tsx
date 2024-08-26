"use client";
import Container from "@/components/common/container/Container";
import DFileUploader from "@/components/forms/DFileUploader";
import DForm from "@/components/forms/DForm";
import DInput from "@/components/forms/DInput";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { z } from "zod";

const signUpCreatorSchema = z.object({});

const SignupCreatorComponenet: React.FC = () => {
  const defaultValues = {};
  const handleSubmit = (data: any) => {
    console.log(data);
  };
  return (
    <div>
      <div className="max-w-xl mx-auto">
        <DForm
          resolver={zodResolver(signUpCreatorSchema)}
          className="flex flex-col gap-5 w-full p-4"
          onSubmit={handleSubmit}
          defaultValues={defaultValues}
        >
          <h1 className="text-[#262626] md:text-5xl text-2xl font-semibold">Create an account</h1>
          <p className="font-semibold md:text-base leading-6 text-sm">
            Already have an account?<span className="text-accent"> Log in </span>
          </p>

          <div className="flex items-start justify-between gap-5">
            <DInput
              defaultValue={"Ruhul"}
              labelTextColor="#262626"
              name="firstName"
              label="First Name"
              placeholder="Enter your first name"
            />
            <DInput
              defaultValue={"Islam"}
              labelTextColor="#262626"
              name="lastName"
              label="Last Name"
              placeholder="Enter your last name"
            />
          </div>
          {/* Email */}
          <DInput
            defaultValue={"ruhul@gmail.com"}
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

          <DFileUploader name="music" label="Do you have any sample work?" />
          {/* Submit Button */}
          <Button type="submit" variant="default">
            Sign up
          </Button>
        </DForm>
      </div>
    </div>
  );
};

export default SignupCreatorComponenet;
