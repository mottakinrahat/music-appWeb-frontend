import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { Url } from "url";

interface BlogCardInterface {
  className?: string;
  imageUrl: string;
  blogRoute?: Url | "/";
  title: string;
  type: string;
  description: string;
}

const BlogCard: React.FC<BlogCardInterface> = ({
  className,
  imageUrl,
  blogRoute,
  title,
  description,
  type,
}) => {
  return (
    <div className={`rounded-lg max-w-md w-full ${className ? className : ""}`}>
      {/* Image Container */}
      <div className="relative w-fit drop-shadow  mb-4">
        {imageUrl ? (
          <div className="rounded-xl relative cursor-pointer overflow-hidden group">
            <Image
              src={imageUrl}
              alt={title || "Card image"}
              width={280}
              height={280}
              style={{ width: "100%", height: "auto", objectFit: "cover" }}
              className="rounded-lg w-full "
            />
            {/* Overlay */}
            <Link href={blogRoute ? blogRoute : "/"}>
              <div className="absolute inset-0 bg-black flex justify-center items-center bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-150"></div>
            </Link>

            <div className="absolute w-12 h-12 flex justify-center items-center backdrop-blur-sm bg-white/10 rounded-lg top-6 right-6"></div>
          </div>
        ) : (
          <div className="h-full w-full bg-gray-200  flex items-center justify-center">
            No Image
          </div>
        )}
      </div>

      {/* Card Content */}

      <div>
        <div className="bg-[rgba(217,17,141,0.08)] inline-block font-semibold text-secondary rounded-full py-2 px-4">
          {type}
        </div>
        <h2 className="text-3xl flex-1 font-semibold mb-2 mt-2">{title}</h2>
        <div className="text-textPrimary text-base ">{description}</div>
        <div>
          <button className="flex items-center justify-center text-base text-accent mt-4 gap-2">
            Read more
            <FaArrowRightLong />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
