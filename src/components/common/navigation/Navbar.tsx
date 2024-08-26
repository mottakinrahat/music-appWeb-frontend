import React, { useState, useEffect } from "react";
import Logo from "../logo/Logo";
import Routes from "./routes";
import { Button } from "@/components/ui/button";
import ToggleMenu from "./ToggleMenu";
import Link from "next/link";
import AlertCard from "@/components/Card/AlertCard";
import ToastCard from "@/components/Card/ToastCard";
import { Toaster } from "@/components/ui/sonner";
import { MdOutlineCancel } from "react-icons/md";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";

interface NavInterface {
  blur?: boolean; // blur the background image? default is false.
}

const Navbar = ({ blur }: NavInterface) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is stored in localStorage and set state
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
    }

    // Listen for localStorage changes
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
        blur ? "bg-white/10" : "bg-navigation"
      } py-3 md:py-5 lg:py-7`}
    >
      <Toaster position="bottom-center" />
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
        {/* Responsive Navigation */}
        <div className="lg:hidden">
          <ToggleMenu />
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
