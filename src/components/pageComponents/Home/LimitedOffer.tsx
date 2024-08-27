import React from "react";
import bgImage from "@/assets/etc/png/Rectangle87.png";
import image1 from "@/assets/logo/middle_logo.png";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import OutlineButton from "@/components/ui/outlineButton";

const LimitedOffer = () => {
  return (
    <div>
      <div
        style={{
          backgroundImage: `url(${bgImage.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="relative  w-full "
      >
        <div className="w-full max-w-[1400] py-16 px-4 lg:py-0 flex text-white md:justify-center items-center overflow-y-hidden">
          <div className="relative lg:block hidden">
            <Image
              alt={image1.src}
              src={image1}
              height={image1.height}
              width={image1.width}
              style={{ width: "auto", height: "500px", objectFit: "cover" }} // Increased height by 10%
              className="scale-125"
            />
          </div>
          <div className="lg:-ml-12 z-10">
            <h3 className="text-2xl font-normal">Limited time offer</h3>
            <h2 className="text-3xl md:text-5xl font-bold mt-4 md:mt-6 mb-6 md:mb-10 md:leading-snug">
              Sign up now and get 3 MONTH FREE
            </h2>
            <div className="flex flex-wrap gap-6">
              <Button variant="secondary">Join Now</Button>
              <OutlineButton textColor="text-white">
                Discover more
              </OutlineButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LimitedOffer;
