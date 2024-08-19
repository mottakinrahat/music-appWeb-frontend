import React from "react";
import Logo from "../logo/Logo";
import Routes from "./routes";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <nav className="bg-navigation py-7">
      <div className="container flex justify-between items-center">
        <div>
          <Logo />
        </div>
        <div>
          <Routes />
        </div>
        <div>
          <Button variant={"default"}>Login/Sign up</Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
