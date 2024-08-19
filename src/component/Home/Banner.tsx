import { Button } from "@/components/ui/button";
import OutlineButton from "@/components/ui/outlineButton";

const Banner = () => {
  return (
    <section className="container flex">
      {/* Banner Action */}
      <div className="w-1/2 max-w-[39rem] my-24">
        <h1 className="text-[4rem] font-bold text-textSecondary leading-[4.75rem]">
          Revolutionize the way you{" "}
          <strong className="text-secondary">experience</strong> music
        </h1>
        <p className="mb-12 mt-8 text-textPrimary max-w-[38rem]">
          Discover a universe of sound that ignites your passions and fuels your
          creativity. Explore millions of songs, from chart-topping hits to
          underground gems, and lose yourself in a sonic adventure.
        </p>
        <div className="flex gap-6">
          <Button>Join Now</Button>
          <OutlineButton>Discover more</OutlineButton>
        </div>
      </div>
      {/* Banner image part */}
      <div className="w-1/2"></div>
    </section>
  );
};

export default Banner;
