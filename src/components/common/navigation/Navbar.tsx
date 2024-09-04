"use client";
import React, { useState, useEffect } from "react";
import Logo from "../logo/Logo";
import Routes from "./routes";
import { Button } from "@/components/ui/button";
import ToggleMenu from "./ToggleMenu";
import Link from "next/link";
import AlertCard from "@/components/Card/AlertCard";
import ToastCard from "@/components/Card/ToastCard";
import { MdOutlineCancel } from "react-icons/md";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import { usePathname } from "next/navigation";

interface NavInterface {
  blur?: boolean; // blur the background image? default is false.
}

const Navbar = ({ blur = false }: NavInterface) => {
  const [user, setUser] = useState(null);

  const [showNav, setShowNav] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (pathname.startsWith("/music/")) {
      setShowNav(true);
    } else if (pathname.startsWith("/offline/")) {
      setShowNav(true);
    } else {
      setShowNav(false);
    }
  }, [pathname]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
    }

    const handleStorageChange = () => {
      const updatedUser = localStorage.getItem("user");
      if (updatedUser) {
        setUser(JSON.parse(updatedUser));
      } else {
        window.location.reload();
        setUser(null);
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const [isAlertOpen, setAlertOpen] = useState(false);

  const handleConfirm = () => {
    localStorage.removeItem("user");
    ToastCard({
      title: "Logout successful!",
      message: "Logout has been successful.",
      icon: <IoCheckmarkDoneCircleOutline className="w-6 h-6 text-green-500" />,
      duration: 2000,
    });
    setUser(null);
    setAlertOpen(false);
  };

  const handleClose = () => {
    ToastCard({
      title: "Logout cancelled.",
      message: "Logout has been cancelled.",
      icon: <IoCheckmarkDoneCircleOutline className="w-6 h-6 text-green-500" />,
      duration: 2000,
    });
    setAlertOpen(false);
  };

  const handleLogout = () => {
    setAlertOpen(true);
  };

  return (
    <nav
      className={`${
        showNav || blur
          ? "bg-white/10 fixed  z-[9999] w-full text-white"
          : "bg-navigation"
      } h-16 md:h-20 lg:h-24 flex items-center`}
    >
      <div
        className={`${
          blur || showNav ? "md:p-10 p-4  xl:px-[120px]" : "container"
        } w-full flex justify-between flex-wrap items-center`}
      >
        <div className="">
          <Logo />
        </div>
        <div>
          <div
            className={`flex gap-10 ${
              blur || showNav ? "text-white z-40" : "text-base"
            } max-lg:hidden`}
          >
            <Routes />
          </div>
        </div>
        <div className="max-lg:hidden">
          {!user ? (
            <Link href="/login">
              <Button variant={"default"}>Login/Sign up</Button>
            </Link>
          ) : (
            <Button onClick={handleLogout} variant={"default"}>
              Logout
            </Button>
          )}
        </div>
        <div className="lg:hidden">
          <ToggleMenu blur={blur} />
        </div>
      </div>

      <AlertCard
        title="Are you sure?"
        message="You will be logged out. Do you want to continue?"
        icon={<MdOutlineCancel className="w-6 h-6 text-red-500" />}
        isOpen={isAlertOpen}
        onClose={handleClose}
        onConfirm={handleConfirm}
        confirmText="Yes"
        cancelText="Cancel"
      />
    </nav>
  );
};

export default Navbar;
