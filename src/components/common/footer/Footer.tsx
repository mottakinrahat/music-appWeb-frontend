import React from "react";
import Image from "next/image";
import Link from "next/link";
import Container from "../container/Container";
import logo from "@/assets/logo/logo_2.png";

const Footer: React.FC = () => {
  return (
    <Container bgGray className=" text-textPrimary ">
      <div className="max-w-6xl mx-auto flex flex-wrap">
        {/* First Section */}
        <div className="w-full md:w-1/2 sm:p-4">
          <div className=" max-w-sm mb-4">
            <Image
              src={logo} // Replace with actual logo path
              alt="Logo"
              width={200}
              height={200}
              style={{ height: "auto", width: "150px", objectFit: "cover" }}
              className="mb-4"
            />
            <p className="text-textPrimary">
              Discover a universe of sound that ignites your passions and fuels
              your creativity. Explore millions of songs, from chart-topping
              hits to underground gems, and lose yourself in a sonic adventure.
            </p>
          </div>
        </div>

        {/* Second Section */}
        <div className="w-full md:w-1/2 sm:p-4 flex flex-wrap">
          <div className="w-1/2 mb-4">
            <ul className="space-y-2">
              <li>
                <Link
                  href="/home"
                  className="text-textPrimary hover:text-textSecondary"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  className="text-textPrimary hover:text-textSecondary"
                  href="/music"
                >
                  Music
                </Link>
              </li>
              <li>
                <Link
                  className="text-textPrimary hover:text-textSecondary"
                  href="/sounds"
                >
                  Sounds
                </Link>
              </li>
              <li>
                <Link
                  className="text-textPrimary hover:text-textSecondary"
                  href="/talents"
                >
                  Talents
                </Link>
              </li>
              <li>
                <Link
                  className="text-textPrimary hover:text-textSecondary"
                  href="/vr-conserts"
                >
                  VR Conserts
                </Link>
              </li>
              <li>
                <Link
                  className="text-textPrimary hover:text-textSecondary"
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
                  className="text-textPrimary hover:text-textSecondary"
                  href="/about"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  className="text-textPrimary hover:text-textSecondary"
                  href="/terms"
                >
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  className="text-textPrimary hover:text-textSecondary"
                  href="/privacy-policy"
                >
                  Privacy policy
                </Link>
              </li>
              <li>
                <Link
                  className="text-textPrimary hover:text-textSecondary"
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
  );
};

export default Footer;
