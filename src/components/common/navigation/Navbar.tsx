import React from "react";
import Logo from "../logo/Logo";
import Routes from "./routes";
import { Button } from "@/components/ui/button";
import ToggleMenu from "./ToggleMenu";

interface NavInterface {
  blur?: boolean; // blur the background image? default is false.
}

const Navbar = ({ blur }: NavInterface) => {
  return (
    <nav
      className={`${
        blur ? "bg-white/10" : "bg-navigation"
      } py-3 md:py-5 lg:py-7 `}
    >
      <div className="container flex justify-between flex-wrap items-center">
        <div>
          <Logo />
        </div>
        <div>
          <ul
            className={`flex gap-10 ${
              blur ? "text-white" : "text-base"
            } max-lg:hidden`}
          >
            <Routes />
          </ul>
        </div>
        <div className="max-lg:hidden">
          <Button variant={"default"}>Login/Sign up</Button>
        </div>
        {/* Responsive Navigation */}
        <div className="lg:hidden">
          <ToggleMenu />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
