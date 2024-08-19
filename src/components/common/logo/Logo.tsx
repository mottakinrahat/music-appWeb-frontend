import React from "react";
import logo_x from "@/assets/logo/logo.png";
import logo_text from "@/assets/logo/logo_text.png";
import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href={"/"}>
      <div className="inline-block cursor-pointer">
        <div className="">
          <Image
            width={49}
            height={49}
            className="inline-block"
            style={{ height: "auto", width: "auto" }}
            src={logo_x}
            alt="Music Appweb"
          />{" "}
          <Image
            className="inline-block mt-6"
            width={100}
            height={100}
            style={{ height: "auto", width: "auto" }}
            src={logo_text}
            alt="Music Appweb"
          />
        </div>
      </div>
    </Link>
  );
};

export default Logo;
