import React from "react";
import logo_x from "@/assets/logo/logo.svg";
import logo_text from "@/assets/logo/logo_text.svg";
import Image from "next/image";
import Link from "next/link";
import OfflineNotification from "@/utils/offlineNotification";

const Logo = () => {
  return (
    <Link href={"/"}>
      <div className="inline-block -z-10 cursor-pointer">
        <div className="">
          <Image
            width={49}
            height={49}
            className="inline-block md:w-[49px] md:h-[49px] w-[30px] h-[20px] object-contain"
            src={logo_x}
            alt="Music Appweb"
          />{" "}
          <Image
            className="inline-block mt-6 md:w-[93px] md:h-[19px] w-[56px] h-[12px] object-contain"
            width={200}
            height={200}
            src={logo_text}
            alt="Music Appweb"
          />
        </div>
      </div>
      <OfflineNotification />
    </Link>
  );
};

export default Logo;
