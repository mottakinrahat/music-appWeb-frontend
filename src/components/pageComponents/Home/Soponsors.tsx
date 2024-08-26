import React from "react";
import Marquee from "react-fast-marquee";
import sponsor1 from "@/assets/etc/sponsor/Group.png";
import sponsor2 from "@/assets/etc/sponsor/Group-1.png";
import sponsor3 from "@/assets/etc/sponsor/Group1.png";
import sponsor4 from "@/assets/etc/sponsor/Group2.png";
import sponsor5 from "@/assets/etc/sponsor/Group3.png";
import sponsor6 from "@/assets/etc/sponsor/Group4.png";
import Image from "next/image";

const Soponsors = () => {
  const sponsors = [sponsor1, sponsor2, sponsor3, sponsor4, sponsor5, sponsor6];
  return (
    <div className="bg-section py-5 md:py-8 lg:py-10">
      <Marquee className="" pauseOnHover>
        {sponsors.map((sponsor, idx) => (
          <Image
            key={idx}
            src={sponsor}
            height={100}
            alt="Music"
            width={200}
            style={{
              height: "50px",
              width: "auto",
              margin: "0 40px ",
              objectFit: "cover",
            }}
            className="z-10"
          />
        ))}
      </Marquee>
    </div>
  );
};

export default Soponsors;
