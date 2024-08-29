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

const ToggleMenu = () => {
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
          className={`block w-6 h-0.5 bg-black transition-transform duration-300 ${
            isOpen ? "rotate-45 translate-y-[0.65rem]" : "translate-y-1.5"
          }`}
        ></span>
        <span
          className={`block w-6 h-0.5 bg-black transition-opacity duration-300 ${
            isOpen ? "opacity-0" : ""
          }`}
        ></span>
        <span
          className={`block w-6 h-0.5 bg-black transition-transform duration-300 ${
            isOpen ? "-rotate-45 -translate-y-4" : "-translate-y-1.5"
          }`}
        ></span>
      </button>

      {/* Adjust Drawer to use state */}
      <Drawer open={isOpen} onOpenChange={setIsOpen} direction="left">
        <DrawerContent className="w-[70%] max-w-md h-screen">
          <DrawerHeader>
            <DrawerTitle>
              <Logo />
            </DrawerTitle>
            <DrawerDescription>
              <span className="space-y-3 block mt-5">
                <Routes />
              </span>
              <div className="mt-3">
                <Link href="/login">
                  <div className="hover:font-semibold my">Login/Sign up</div>
                </Link>
              </div>
            </DrawerDescription>
          </DrawerHeader>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default ToggleMenu;
