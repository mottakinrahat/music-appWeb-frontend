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
      <div className="flex w-full">
        {/* Banner Action */}
        <div className="w-1/2 flex-1 max-w-[39rem] my-24">
          <h1 className="text-[4rem] font-bold text-textSecondary leading-[4.75rem]">
            Revolutionize the way you{" "}
            <strong className="text-secondary">experience</strong> music
          </h1>
          <p className="mb-12 mt-8 text-textPrimary max-w-[38rem]">
            Discover a universe of sound that ignites your passions and fuels
            your creativity. Explore millions of songs, from chart-topping hits
            to underground gems, and lose yourself in a sonic adventure.
          </p>
          <div className="flex gap-6">
            <Button>Join Now</Button>
            <OutlineButton>Discover more</OutlineButton>
          </div>
        </div>
        {/* Banner image part */}
        <div className="w-1/2 flex-1 relative flex justify-end ">
          <div className="bg-banner-gradient relative w-4/5 h-4/5 mt-auto rounded-t-md">
            <Image
              src={play}
              height={play.height}
              alt="Music"
              width={play.width}
              style={{ height: "auto", width: "472px" }}
              className="mx-auto -my-9"
            />
            <Image
              src={image}
              height={image.height}
              alt="Music"
              width={image.width}
              style={{ height: "auto", width: "auto" }}
              className="absolute z-10 w-full bottom-0 left-1/2 -translate-x-1/2"
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
