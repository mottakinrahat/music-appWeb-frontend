import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const AirPlay = () => {
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => setHovered(true);
  const handleMouseLeave = () => setHovered(false);

  const pathname = usePathname();
  const [showPlayer, setShowPlayer] = useState(true);

  useEffect(() => {
    // Show the player only if the path matches `/music/:id`
    if (pathname.startsWith("/music/")) {
      setShowPlayer(true);
    } else {
      setShowPlayer(false);
    }
  }, [pathname]);

  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ cursor: "pointer" }}
    >
      <path
        d="M12.3622 21.4322H6.18406C5.93248 21.4323 5.69113 21.3326 5.51306 21.1548C5.33498 20.9771 5.23475 20.736 5.23438 20.4844V2.44922C5.23437 2.32453 5.25894 2.20106 5.30667 2.08586C5.35441 1.97067 5.42437 1.866 5.51256 1.77785C5.60075 1.6897 5.70545 1.6198 5.82067 1.57212C5.93589 1.52445 6.05937 1.49994 6.18406 1.5H15.2131C15.3378 1.49994 15.4613 1.52445 15.5765 1.57212C15.6917 1.6198 15.7964 1.6897 15.8846 1.77785C15.9728 1.866 16.0428 1.97067 16.0905 2.08586C16.1382 2.20106 16.1628 2.32453 16.1628 2.44922V12.5559"
        stroke={
          hovered
            ? showPlayer
              ? "#00BBBF"
              : "#444444"
            : showPlayer
            ? "white"
            : "black"
        } // Change color on hover
        strokeWidth="0.84375"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.9852 20.2305H9.41406"
        stroke={
          hovered
            ? showPlayer
              ? "#00BBBF"
              : "#444444"
            : showPlayer
            ? "white"
            : "black"
        } // Change color on hover
        strokeWidth="0.84375"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.0885 22.4993C20.4684 22.4993 22.3977 20.57 22.3977 18.1901C22.3977 15.8102 20.4684 13.8809 18.0885 13.8809C15.7086 13.8809 13.7793 15.8102 13.7793 18.1901C13.7793 20.57 15.7086 22.4993 18.0885 22.4993Z"
        stroke={
          hovered
            ? showPlayer
              ? "#00BBBF"
              : "#444444"
            : showPlayer
            ? "white"
            : "black"
        } // Change color on hover
        strokeWidth="0.84375"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.0879 16.1172V20.2661"
        stroke={
          hovered
            ? showPlayer
              ? "#00BBBF"
              : "#444444"
            : showPlayer
            ? "white"
            : "black"
        } // Change color on hover
        strokeWidth="0.84375"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20.1606 18.1895H16.0117"
        stroke={
          hovered
            ? showPlayer
              ? "#00BBBF"
              : "#444444"
            : showPlayer
            ? "white"
            : "black"
        } // Change color on hover
        strokeWidth="0.84375"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.74414 2.79297H12.6563"
        stroke={
          hovered
            ? showPlayer
              ? "#00BBBF"
              : "#444444"
            : showPlayer
            ? "white"
            : "black"
        } // Change color on hover
        strokeWidth="0.84375"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default AirPlay;
