import { Button } from "@/components/ui/button";
import OutlineButton from "@/components/ui/outlineButton";
import Image from "next/image";
import play from "@/assets/etc/banner/Play.png";
import music from "@/assets/etc/banner/Decoration.png";
import image from "@/assets/etc/banner/Image.png";
import Container from "@/components/common/container/Container";

const Banner = () => {
  return (
    <Container>
      <div className="flex flex-col-reverse lg:flex-row max-lg:items-center w-full">
        {/* Banner Action */}
        <div className="lg:w-1/2 flex-1 text-center md:text-left max-w-[39rem] my-5 md:my-10 lg:my-24">
          <h1 className="text-5xl leading-tight lg:text-[4rem] font-bold text-textSecondary lg:leading-[4.75rem]">
            Revolutionize the way you
            <span className="text-secondary inline-block">experience</span>{" "}
            music
          </h1>
          <p className="mb-12 mt-8 text-textPrimary max-w-[38rem]">
            Discover a universe of sound that ignites your passions and fuels
            your creativity. Explore millions of songs, from chart-topping hits
            to underground gems, and lose yourself in a sonic adventure.
          </p>
          <div className="flex justify-center md:justify-normal gap-6">
            <Button>Join Now</Button>
            <OutlineButton>Discover more</OutlineButton>
          </div>
        </div>
        {/* Banner image part */}
        <div className="lg:w-1/2 flex-1 mt-10 md:mt-48 lg:mt-0 relative flex justify-end ">
          <div className="bg-banner-gradient  relative h-[20rem] w-[20rem] md:w-[30rem] lg:w-4/5 lg:h-4/5 mt-auto rounded-t-md">
            <Image
              src={play}
              height={play.height}
              alt="Music"
              width={play.width}
              style={{ height: "auto", width: "80%" }}
              className="mx-auto -my-9"
            />
            <Image
              src={image}
              height={image.height}
              alt="Music"
              width={image.width}
              style={{ height: "auto", width: "80%" }}
              className="absolute z-10 bottom-0 w-[100%] left-1/2 -translate-x-1/2"
            />
          </div>
          <Image
            src={music}
            height={music.height}
            alt="Music"
            width={music.width}
            style={{ height: "auto", width: "auto" }}
            className="absolute bottom-0"
          />
        </div>
      </div>
    </Container>
  );
};

export default Banner;
