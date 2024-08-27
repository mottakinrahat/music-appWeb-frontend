"use client";
// components/Banner.tsx
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay } from "swiper/modules";
import { Button } from "@/components/ui/button";
import OutlineButton from "@/components/ui/outlineButton";
import Image from "next/image";
import play from "@/assets/etc/banner/Play.png";
import music from "@/assets/etc/banner/Decoration.png";
import image from "@/assets/etc/banner/Image.png";

const Banner = () => {
  return (
    <div className="mx-auto max-w-[1500px]">
      <div className="max-w-[1500px] ml-2 mx-auto overflow-visible">
        <Swiper
          spaceBetween={50}
          slidesPerView={1}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop={true}
          modules={[Autoplay]}
          className=" max-lg:items-center w-full"
        >
          <SwiperSlide className="overflow-visible">
            <div className="flex flex-col xl:flex-row max-xl:items-center w-full">
              <BannerContent />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="flex flex-col xl:flex-row max-xl:items-center w-full">
              <BannerContent />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

const BannerContent = () => (
  <>
    {/* Banner Action */}
    <div className="2xl:ml-[3rem] flex-1 text-center xl:text-left max-w-[39rem] my-5 md:my-10 py-10 md:pt-20 xl:my-24">
      <h1 className="text-3xl sm:text-5xl leading-tight lg:text-[4rem] font-bold text-textSecondary lg:leading-[4.75rem]">
        Revolutionize the way you
        <span className="text-secondary inline-block">experience</span> music
      </h1>
      <p className="mb-12 mt-8 text-textPrimary max-w-[38rem]">
        Discover a universe of sound that ignites your passions and fuels your
        creativity. Explore millions of songs, from chart-topping hits to
        underground gems, and lose yourself in a sonic adventure.
      </p>
      <div className="flex justify-center flex-wrap xl:justify-normal gap-6">
        <Button>Join Now</Button>
        <OutlineButton>Discover more</OutlineButton>
      </div>
    </div>
    {/* Banner image part */}
    <div className="flex-1 max-w-3xl md:mt-48 lg:-mx-10 mt-20 relative lg:pt-24 xl:p-0 flex justify-end ">
      <div className="bg-banner-gradient relative h-[15rem] w-[15rem] min-[380px]:h-[20rem] min-[380px]:w-[20rem] md:w-[30rem] lg:w-4/5 xl:h-full mt-auto rounded-t-md">
        <Image
          src={play}
          height={play.height}
          alt="Music"
          width={play.width}
          style={{ height: "auto", width: "80%", objectFit: "cover" }}
          className="mx-auto -my-4 sm:-my-6  md:-my-9"
        />
        <Image
          src={image}
          height={image.height}
          alt="Music"
          width={image.width}
          style={{ height: "auto", width: "75%", objectFit: "cover" }}
          className="absolute xl:scale-110 bottom-0 xl:bottom-8 z-20 left-1/2 -translate-x-1/2"
        />
      </div>
      <Image
        src={music}
        height={music.height}
        alt="Music"
        width={music.width}
        style={{ width: "100%", height: "auto", objectFit: "cover" }}
        className="absolute scale-[1.20] xl:left-10 bottom-0 2xl:bottom-10 "
      />
    </div>
  </>
);

export default Banner;
