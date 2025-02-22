"use client";
import React from "react";
import Logo from "../logo/Logo";
import DForm from "@/components/forms/DForm";
import { z } from "zod";

// Import flag images

import LanguageSelector from "./LanguageSelector";

const navSchema = z.object({});

const handleSubmit = () => {};

const LogInSignUpNav: React.FC = () => {
  return (
    <div className="container py-3 md:py-5 lg:py-7">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div>
          <Logo />
        </div>
        {/* DropDown */}
        <div>
          <DForm onSubmit={handleSubmit} resolver={navSchema}>
            {/* Dropdown Country */}
            <div>
              <LanguageSelector />
            </div>
          </DForm>
        </div>
      </div>
    </div>
  );
};

export default LogInSignUpNav;
