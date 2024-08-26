"use client";
import Container from "@/components/common/container/Container";
import DFileUploader from "@/components/forms/DFileUploader";
import DForm from "@/components/forms/DForm";
import DInput from "@/components/forms/DInput";
import DSelectTag from "@/components/forms/DSelectTag";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import signUpCreatorSchema from "./signupCreatorSchema";

const SignupCreatorComponenet: React.FC = () => {
  const defaultValues = {};
  const expertiseOptions = [
    { value: "musicProduction", label: "Music Production" },
    { value: "soundEngineering", label: "Sound Engineering" },
    { value: "mixingMastering", label: "Mixing and Mastering" },
    { value: "songwriting", label: "Songwriting" },
    { value: "composition", label: "Composition" },
    { value: "musicTheory", label: "Music Theory" },
    { value: "musicArrangement", label: "Music Arrangement" },
    { value: "vocalPerformance", label: "Vocal Performance" },
    { value: "instrumentalPerformance", label: "Instrumental Performance" },
    { value: "liveSound", label: "Live Sound" },
    { value: "musicLicensing", label: "Music Licensing" },
    { value: "musicBusiness", label: "Music Business" },
    { value: "musicEducation", label: "Music Education" },
    { value: "musicTechnology", label: "Music Technology" },
    { value: "djing", label: "DJing" },
  ];

  const dawOptions = [
    { value: "abletonLive", label: "Ableton Live" },
    { value: "logicPro", label: "Logic Pro" },
    { value: "flStudio", label: "FL Studio" },
    { value: "proTools", label: "Pro Tools" },
    { value: "cubase", label: "Cubase" },
    { value: "studioOne", label: "Studio One" },
    { value: "reason", label: "Reason" },
    { value: "garageBand", label: "GarageBand" },
    { value: "reaper", label: "Reaper" },
    { value: "audacity", label: "Audacity" },
  ];

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
            {/* Fist Name */}
            <DInput
              defaultValue={"Ruhul"}
              labelTextColor="#262626"
              name="firstName"
              label="First Name"
              placeholder="Enter your first name"
            />
            {/* Last Name */}

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

          {/* Select tag */}

          <DSelectTag
            required={true}
            name="expertise"
            label="Select your area(s) of specialty"
            options={expertiseOptions}
          />

          {/* DAW software proficiency */}

          <DSelectTag required={true} name="proficiency" label="DAW software proficiency" options={dawOptions} />
          {/* File Uploader */}

          <DFileUploader name="music" label="Do you have any sample work?" />

          {/* Portfolio Link */}

          <DInput
            defaultValue={"https://www.google.com"}
            labelTextColor="#262626"
            name="portfolio"
            label="Link to your online portfolio website"
            placeholder="ex: yourname332@mail.com"
            type="text"
          />

          {/* Password */}
          <DInput
            defaultValue={"12345678A@a"}
            labelTextColor="#262626"
            name="password"
            label="Password"
            placeholder="Enter your password"
            type="password"
          />
          {/* confirm Password */}

          <DInput
            defaultValue={"12345678A@a"}
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
        </DForm>
        <p className="text-[#4C4C4C] mt-5 p-4 text-sm md:text-base">
          By clicking &quot;Sign up&quot; above, you acknowledge that you have read and you agree to our General{" "}
          <span className="font-semibold">Terms and Conditions</span> and have read and acknowledge the{" "}
          <span className="font-semibold">Privacy policy.</span>
        </p>
      </div>
    </div>
  );
};

export default SignupCreatorComponenet;
