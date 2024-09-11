"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Container from "../container/Container";
import logo from "@/assets/logo/logo_2.png";
import FooterEnd from "./FooterEnd";
import { usePathname } from "next/navigation";

const Footer: React.FC = () => {
  const [showFooter, setShowFooter] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    if (pathname.startsWith("/music/")) {
      setShowFooter(false);
    } else if (pathname.startsWith("/offline/")) {
      setShowFooter(false);
    } else {
      setShowFooter(true);
    }
  }, [pathname]);
  if (showFooter) {
    return (
      <div>
        <Container bgGray className=" text-textPrimary ">
          <div className=" mx-auto flex max-md:justify-center flex-wrap">
            {/* First Section */}
            <div className="w-full md:w-1/2 sm:py-4 max-sm:flex justify-center">
              <div className="flex flex-col max-sm:justify-center max-sm:items-center max-w-sm mb-4">
                <Image
                  src={logo} // Replace with actual logo path
                  alt="Logo"
                  width={200}
                  height={200}
                  style={{ height: "auto", width: "150px", objectFit: "cover" }}
                  className="mb-4 max-sm:scale-75"
                />
                <p className="text-textPrimary max-sm:text-center">
                  Discover a universe of sound that ignites your passions and
                  fuels your creativity. Explore millions of songs, from
                  chart-topping hits to underground gems, and lose yourself in a
                  sonic adventure.
                </p>
              </div>
            </div>

            {/* Second Section */}
            <div className="w-full md:w-1/2 mt-5 sm:mt-0 max-sm:text-center sm:p-4 flex flex-wrap">
              <div className="w-1/2 mb-4">
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="/home"
                      className="text-textPrimary transition hover:text-textSecondary"
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-textPrimary transition hover:text-textSecondary"
                      href="/music"
                    >
                      Music
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-textPrimary transition hover:text-textSecondary"
                      href="/sounds"
                    >
                      Sounds
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-textPrimary transition hover:text-textSecondary"
                      href="/talents"
                    >
                      Talents
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-textPrimary transition hover:text-textSecondary"
                      href="/vr-conserts"
                    >
                      VR Conserts
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-textPrimary transition hover:text-textSecondary"
                      href="/blog"
                    >
                      Blog
                    </Link>
                  </li>
                </ul>
              </div>
              {/* Other links */}
              <div className="w-1/2 mb-4">
                <ul className="space-y-2">
                  <li>
                    <Link
                      className="text-textPrimary transition hover:text-textSecondary"
                      href="/about"
                    >
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-textPrimary transition hover:text-textSecondary"
                      href="/terms"
                    >
                      Terms & Conditions
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-textPrimary transition hover:text-textSecondary"
                      href="/privacy-policy"
                    >
                      Privacy policy
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-textPrimary transition hover:text-textSecondary"
                      href="/cookie"
                    >
                      Cookie policy
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Container>
        <hr />
        <div className="bg-section">
          <FooterEnd />
        </div>
      </div>
    );
  } else return <></>;
};

export default Footer;
