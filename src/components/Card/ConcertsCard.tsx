import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaRegBell } from "react-icons/fa";
import { FaBell } from "react-icons/fa6";
import { GoLocation } from "react-icons/go";
import { Url } from "url";

interface ConcertCardInterface {
  className?: string;
  imageUrl: string;
  eventRoute?: Url | "/";
  title: string;
  isNotify: boolean;
}

const ConcertsCard: React.FC<ConcertCardInterface> = ({
  className,
  imageUrl,
  eventRoute,
  title,
  isNotify,
}) => {
  return (
    <div className={`rounded-lg w-full max-w-md ${className ? className : ""}`}>
      {/* Image Container */}
      <div className="relative w-fit drop-shadow  mb-4">
        {imageUrl ? (
          <div className="rounded-xl relative cursor-pointer overflow-hidden group">
            <div className="relative h-fit w-full">
              {" "}
              <Image
                src={imageUrl}
                alt={title || "Card image"}
                width={500}
                height={300}
                className="rounded-lg"
              />
            </div>
            {/* Overlay */}
            <Link href={eventRoute ? eventRoute : "/"}>
              <div className="absolute inset-0 bg-black flex justify-center items-center bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-150"></div>
            </Link>

            <div className="absolute w-12 h-12 flex justify-center items-center backdrop-blur-sm bg-white/10 rounded-lg top-6 right-6">
              <button
                className="text-background text-xl"
                aria-label="Mark as favorite"
              >
                {isNotify ? <FaBell /> : <FaRegBell />}
              </button>
            </div>
          </div>
        ) : (
          <div className="h-full w-full bg-gray-200  flex items-center justify-center">
            No Image
          </div>
        )}
      </div>

      {/* Card Content */}

      <div>
        <h2 className="text-2xl flex-1 font-semibold mb-2">{title}</h2>
        <div className="text-textPrimary text-base ">January 4, 5 p.m. PT</div>
      </div>
    </div>
  );
};

export default ConcertsCard;
