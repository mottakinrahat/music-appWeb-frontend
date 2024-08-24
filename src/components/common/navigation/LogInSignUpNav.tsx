"use client";
import React from "react";
import Logo from "../logo/Logo";
import DForm from "@/components/forms/DForm";
import { z } from "zod";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Import flag images
import usFlag from "@/assets/flags/united-states.png";
import ukFlag from "@/assets/flags/united-kingdom.png";
import ausFlag from "@/assets/flags/australia.png";

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
              <Select defaultValue="us">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="us">
                      <Image
                        src={usFlag}
                        alt="US"
                        width={16} // Setting width to 16px
                        height={16} // Setting height to 16px
                        className="inline-block mr-2"
                      />
                      US
                    </SelectItem>
                    <SelectItem value="uk">
                      <Image src={ukFlag} alt="UK" width={16} height={16} className="inline-block mr-2" />
                      UK
                    </SelectItem>
                    <SelectItem value="aus">
                      <Image src={ausFlag} alt="AUS" width={16} height={16} className="inline-block mr-2" />
                      AUS
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </DForm>
        </div>
      </div>
    </div>
  );
};

export default LogInSignUpNav;
