"use client";
import React, { useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import Logo from "../logo/Logo";
import Routes from "./routes";
import Link from "next/link";

interface ToggleMenuProps {
  blur?: boolean;
  user?: any;
  handleLogout: () => void;
  showNav?: boolean;
}

const ToggleMenu: React.FC<ToggleMenuProps> = ({
  blur,
  user,
  handleLogout,
  showNav,
}: any) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      <button
        onClick={toggleMenu}
        className={`relative w-10 h-10 flex flex-col items-center justify-around transition-transform duration-300 ${
          isOpen ? "open" : ""
        }`}
      >
        <span
          className={`block w-6 h-0.5 ${
            blur || showNav ? "bg-white" : "bg-black"
          } transition-transform duration-300 ${
            isOpen ? "rotate-45 translate-y-[0.65rem]" : "translate-y-1.5"
          }`}
        ></span>
        <span
          className={`block w-6 h-0.5 ${
            blur || showNav ? "bg-white" : "bg-black"
          } transition-opacity duration-300 ${isOpen ? "opacity-0" : ""}`}
        ></span>
        <span
          className={`block w-6 h-0.5 ${
            blur || showNav ? "bg-white" : "bg-black"
          } transition-transform duration-300 ${
            isOpen ? "-rotate-45 -translate-y-4" : "-translate-y-1.5"
          }`}
        ></span>
      </button>

      {/* Adjust Drawer to use state */}
      <Drawer open={isOpen} onOpenChange={setIsOpen} direction="left">
        <DrawerContent className="w-[70%] z-[99999]  max-w-md h-[100%] -top-2">
          <DrawerHeader>
            <DrawerDescription>
              <span onClick={toggleMenu} className="space-y-3 block">
                <Routes />
              </span>
              <div onClick={toggleMenu} className="mt-3">
                {!user ? (
                  <Link href="/login">
                    <div className="hover:font-semibold">Login/Sign up</div>
                  </Link>
                ) : (
                  <div className="hover:font-semibold" onClick={handleLogout}>
                    Logout
                  </div>
                )}
              </div>
            </DrawerDescription>
          </DrawerHeader>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default ToggleMenu;
