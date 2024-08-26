import React, { useState, useEffect } from "react";
import Logo from "../logo/Logo";
import Routes from "./routes";
import { Button } from "@/components/ui/button";
import ToggleMenu from "./ToggleMenu";
import Link from "next/link";

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
  }, [user]); // Empty dependency array to run once on mount

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null); 

  };


  return (
    <nav className={`${blur ? "bg-white/10" : "bg-navigation"} py-3 md:py-5 lg:py-7`}>
      <div className="container flex justify-between flex-wrap items-center">
        <div>
          <Logo />
        </div>
        <div>
          <ul className={`flex gap-10 ${blur ? "text-white" : "text-base"} max-lg:hidden`}>
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
    </nav>
  );
};

export default Navbar;
