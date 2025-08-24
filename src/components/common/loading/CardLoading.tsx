// components/SkeletonCard.tsx

import React from "react";

const CardLoading: React.FC = () => {
  return (
    <div className="animate-pulse flex flex-col space-y-4 bg-gray-300 p-4 rounded-lg">
      <div className="bg-gray-400 h-40 w-full rounded"></div>{" "}
      {/* Image placeholder */}
      <div className="h-4 bg-gray-400 rounded w-3/4"></div>{" "}
      {/* Title placeholder */}
      <div className="h-3 bg-gray-400 rounded w-1/2"></div>{" "}
      {/* Artist name placeholder */}
    </div>
  );
};

export default CardLoading;
