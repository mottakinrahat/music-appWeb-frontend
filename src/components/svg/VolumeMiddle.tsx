"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const VolumeMiddle = () => {
  const pathname = usePathname();
  const [showControl, setShowControl] = useState(true);
  useEffect(() => {
    if (pathname.startsWith("/music/")) {
      setShowControl(true);
    } else {
      setShowControl(false);
    }
  }, [pathname]);

  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="volume_up">
        <mask
          id="mask0_2383_6852"
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="24"
          height="24"
        >
          <rect id="Bounding box" width="24" height="24" fill="#D9D9D9" />
        </mask>
        <g mask="url(#mask0_2383_6852)">
          {/* Volume level reduced to 50% by removing the outermost wave */}
          <path
            id="volume_up_2"
            d="M3 14.9996V8.99961H7L12 3.99961V19.9996L7 14.9996H3ZM14 15.9996V7.94961C14.7833 8.31628 15.3958 8.86628 15.8375 9.59961C16.2792 10.3329 16.5 11.1329 16.5 11.9996C16.5 12.8496 16.2792 13.6371 15.8375 14.3621C15.3958 15.0871 14.7833 15.6329 14 15.9996ZM10 8.84961L7.85 10.9996H5V12.9996H7.85L10 15.1496V8.84961Z"
            fill={showControl ? "white" : "#262626"}
          />
        </g>
      </g>
    </svg>
  );
};

export default VolumeMiddle;
