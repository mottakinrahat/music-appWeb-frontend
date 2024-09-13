import { useEffect, useRef, useState } from "react";
import Marquee from "react-fast-marquee"; // Correct import for react-fast-marquee

const SongMarquee = ({
  songName,
  className,
}: {
  songName: string | null;
  className?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [shouldMarquee, setShouldMarquee] = useState<boolean>(false);
  const [direction, setDirection] = useState<"left" | "right">("left");

  const handleCycleComplete = () => {
    setDirection((prevDirection) =>
      prevDirection === "left" ? "right" : "left"
    );
  };
  useEffect(() => {
    if (containerRef.current && textRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      const textWidth = textRef.current.scrollWidth;
      setShouldMarquee(textWidth > containerWidth);
    }
  }, [songName]);

  return (
    <div
      className={` ${
        className && className
      } z-10 text-base md:text-xl gap-2 font-semibold mb-1 lg: text-xl sm:text-2xl`}
    >
      <div className="relative max-w-[220px] overflow-hidden">
        <span
          ref={textRef}
          style={{
            display: "inline-block",
            WebkitMaskImage:
              "-webkit-gradient(linear, left top, right top, from(rgba(0,0,0,1)), to(rgba(0,0,0,0)))",
            maskImage:
              "linear-gradient(to right, rgba(0,0,0,1) 80%, rgba(0,0,0,0) 100%)",
          }}
        >
          <Marquee
            className="marquee"
            speed={20}
            delay={5}
            pauseOnHover={true}
            gradient={false}
            loop={0}
            direction={direction}
            onCycleComplete={handleCycleComplete}
          >
            <span>{songName}</span>
          </Marquee>
        </span>
      </div>
    </div>
  );
};

export default SongMarquee;
