import Container from "@/components/common/container/Container";
import React from "react";
import bgImage from "@/assets/etc/png/Rectangle87.png";
import image1 from "@/assets/etc/png/Vector-1.png";
import image2 from "@/assets/etc/png/Vector.png";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const LimitedOffer = () => {
  return (
    <Container>
      <div
        style={{
          backgroundImage: `url(${bgImage.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="relative w-full p-5 md:p-10 lg:p-0 flex text-white justify-center items-center"
      >
        <Image
          alt={image2.src}
          src={image2}
          height={image2.height}
          width={image2.width}
          style={{ width: "auto", height: "125px", objectFit: "cover" }}
          className="absolute top-0 left-0 hidden lg:block"
        />
        <Image
          alt={image1.src}
          src={image1}
          height={image1.height}
          width={image1.width}
          style={{ width: "auto", height: "420px", objectFit: "cover" }}
          className="hidden lg:block"
        />
        <div className="lg:-ml-16">
          <h3 className="text-2xl font-normal">Limited time offer</h3>
          <h2 className="text-3xl md:text-5xl font-bold mt-6 mb-10 md:leading-snug">
            Sign up now and get 3 MONTH FREE
          </h2>
          <div className="flex flex-wrap gap-6">
            <Button variant={"secondary"}>Join Now</Button>
            <Button variant={"outline"}>Discover more</Button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default LimitedOffer;
