import Heading from "@/components/ui/heading";
import React from "react";
import image1 from "@/assets/images/Image1.png";
import image2 from "@/assets/images/Image2.png";
import Image from "next/image";
import Container from "@/components/common/container/Container";

const WhoAreUse = () => {
  return (
    <Container className="flex gap-6">
      <div className="flex-1">
        <div>
          <Image
            src={image1}
            height={image1.width}
            alt="Musician"
            width={image1.height}
            style={{ height: "auto", width: "100%" }}
            className=""
          />
          <Heading type="secondary" heading={"For"} colorText={"Artists"}>
            Share your music directly with fans, keep control of your pricing,
            and build a thriving community.
          </Heading>
        </div>
      </div>
      <div className="flex-1">
        <Heading type="secondary" heading={"For"} colorText={"Artists"}>
          Share your music directly with fans, keep control of your pricing, and
          build a thriving community.
        </Heading>
        <div>
          <Image
            src={image2}
            height={image2.width}
            alt="Musician"
            width={image2.height}
            style={{ height: "auto", width: "100%" }}
            className=""
          />
        </div>
      </div>
    </Container>
  );
};

export default WhoAreUse;
