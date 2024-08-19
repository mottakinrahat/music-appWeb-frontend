import { Button } from "@/components/ui/button";
import OutlineButton from "@/components/ui/outlineButton";

const Banner = () => {
  return (
    <section className="container flex">
      {/* Banner Action */}
      <div>
        <h1 className="text-6xl font-bold">
          Revolutionize the way you{" "}
          <strong className="text-secondary">experience</strong> music
        </h1>
        <p>
          Discover a universe of sound that ignites your passions and fuels your
          creativity. Explore millions of songs, from chart-topping hits to
          underground gems, and lose yourself in a sonic adventure.
        </p>
        <OutlineButton>Join Now</OutlineButton>
      </div>
      {/* Banner image part */}
      <div></div>
    </section>
  );
};

export default Banner;
