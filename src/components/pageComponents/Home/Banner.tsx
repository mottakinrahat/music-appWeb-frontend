"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Button } from "@/components/ui/button";
import OutlineButton from "@/components/ui/outlineButton";
import Image from "next/image";
import full from "@/assets/etc/banner/full.png";
import full2 from "@/assets/etc/banner/full2.png";
import React from "react";

interface BannerContentProps {
  image: any;
  heading: any;
  content: any;
}

const bannerOneHeading = (
  <h1 className="text-[2.1rem] sm:text-5xl leading-tight lg:text-[3.7rem] font-bold text-textSecondary lg:leading-[4.75rem]">
    Revolutionize the way you{" "}
    <span className="text-secondary inline-block"> experience</span> music
  </h1>
);

const bannerOneContent = (
  <p className="mb-8 mt-6 sm:mb-12 sm:mt-8 text-textPrimary">
    Discover a universe of sound that ignites your passions and fuels your
    creativity. Explore millions of songs, from chart-topping hits to
    underground gems, and lose yourself in a sonic adventure.
  </p>
);
const bannerTwoHeading = (
  <h1 className="text-[2.1rem] sm:text-5xl leading-tight lg:text-[3.7rem] font-bold text-textSecondary lg:leading-[4.75rem]">
    Go Beyond Streaming, Start{" "}
    <span className="text-secondary inline-block"> Earning!</span>
  </h1>
);
const bannerTwoContent = (
  <p className="mb-8 mt-6 sm:mb-12 sm:mt-8 text-textPrimary">
    By musicians, for musicians, we know what matters!
  </p>
);

const Banner = () => {
  return (
    <div className="mx-auto max-w-[1400px] overflow-hidden">
      <div className="max-w-[1400px] md:max-h-[59.3rem] lg:max-h-[75rem] xl:max-h-[33.9rem] max-xl:mx-2 xl:ml-28 mx-auto overflow-visible">
        <Swiper
          spaceBetween={50}
          slidesPerView={1}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop={true}
          modules={[Autoplay]}
          className="py-0 w-full"
        >
          <SwiperSlide className="overflow-visible my-0">
            <div className="flex flex-col xl:flex-row max-xl:items-center w-full">
              <BannerContent
                heading={bannerOneHeading}
                content={bannerOneContent}
                image={full}
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="flex flex-col xl:flex-row max-xl:items-center w-full">
              <BannerContent
                heading={bannerTwoHeading}
                content={bannerTwoContent}
                image={full2}
              />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

const BannerContent: React.FC<BannerContentProps> = ({
  image,
  content,
  heading,
}) => (
  <>
    {/* Banner Action */}
    <div className=" max-w-xl text-center xl:text-left my-5 py-10 ">
      {heading}
      {content}
      <div className="flex justify-center flex-wrap xl:justify-normal gap-6">
        <Button>Join Now</Button>
        <OutlineButton>Discover more</OutlineButton>
      </div>
    </div>
    {/* Banner image part */}
    <div className=" w-full lg:-mx-10 mt-20 relative max-xl:-my-10 xl:pt-24 pt-0 p-0 flex justify-end ">
      <Image
        priority
        src={image}
        height={full.height}
        alt="full"
        width={full.width}
        style={{ width: "100%", height: "auto", objectFit: "cover" }}
        className={`xl:absolute  scale-1 -left-20 bottom-0 ${
          image === full2 ? "-bottom-20 scale-75 -top-36 -right-3" : ""
        }`}
      />
    </div>
  </>
);
// const BannerContent2 = () => (
//   <>
//     {/* Banner Action */}
//     <>
//       {/* Banner Action */}
//       <div className=" max-w-xl text-center xl:text-left my-5 py-10 ">
//         <h1 className="text-[2.1rem] sm:text-5xl leading-tight lg:text-[3.7rem] font-bold text-textSecondary lg:leading-[4.75rem]">
//           Revolutionize the way you <span className="text-secondary inline-block"> experience</span> music
//         </h1>
//         <p className="mb-8 mt-6 sm:mb-12 sm:mt-8 text-textPrimary">
//           Discover a universe of sound that ignites your passions and fuels your creativity. Explore millions of songs,
//           from chart-topping hits to underground gems, and lose yourself in a sonic adventure.
//         </p>
//         <div className="flex justify-center flex-wrap xl:justify-normal gap-6">
//           <Button>Join Now</Button>
//           <OutlineButton>Discover more</OutlineButton>
//         </div>
//       </div>
//       {/* Banner image part */}
//       <div className=" w-full lg:-mx-10 mt-20 relative max-xl:-my-10 xl:pt-24 pt-0 p-0 flex justify-end ">
//         <Image
//           src={full2}
//           height={full2.height}
//           alt="full2"
//           width={full2.width}
//           style={{ width: "100%", height: "auto", objectFit: "cover" }}
//           className="xl:absolute scale-75 -left-20 -bottom-20  "
//         />
//       </div>
//     </>
//   </>
// );

export default Banner;
