import React from "react";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import usFlag from "@/assets/flags/united-states.png";
import ukFlag from "@/assets/flags/united-kingdom.png";
import ausFlag from "@/assets/flags/australia.png";

const LanguageSelector = () => {
  return (
    <Select defaultValue="us">
      <SelectTrigger
        id="select-lang"
        name="language"
        className="w-[180px] focus-visible:shadow-none focus-visible:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-accent"
      >
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
              style={{ width: "auto", height: "auto" }}
            />
            US
          </SelectItem>
          <SelectItem value="uk">
            <Image
              src={ukFlag}
              alt="UK"
              width={16}
              height={16}
              className="inline-block mr-2"
              style={{ width: "auto", height: "auto" }}
            />
            UK
          </SelectItem>
          <SelectItem value="aus">
            <Image
              src={ausFlag}
              alt="AUS"
              width={16}
              height={16}
              style={{ width: "auto", height: "auto" }}
              className="inline-block mr-2"
            />
            AUS
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default LanguageSelector;
