import Link from "next/link";
import React from "react";
interface Heading {
  type: "primary" | "secondary";
  heading?: string;
  children?: React.ReactNode;
  linkText?: string;
  route?: string;
  colorText?: string;
  className?: string;
}

const Heading: React.FC<Heading> = ({
  type,
  children,
  heading,
  linkText,
  route,
  colorText,
  className,
}: Heading) => {
  if (type === "primary")
    return (
      <div
        className={`flex flex-col lg:flex-row justify-between lg:items-center gap-4 ${
          className && className
        }`}
      >
        <div className="max-w-xl">
          <h2 className="text-3xl md:text-4xl lg:text-5xl mb-4 font-semibold">
            {heading}
          </h2>
          <p className="text-textPrimary">{children}</p>
        </div>
        <div>
          <Link
            className="underline flex justify-center lg:justify-start mx-auto: text-accent font-semibold text-base"
            href={route ? route : "/"}
          >
            {linkText}
          </Link>
        </div>
      </div>
    );

  if (type === "secondary")
    return (
      <div className={`max-w-xl my-6  ${className && className}`}>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold">
          {heading} <span className="text-secondary">{colorText}</span>
        </h1>
        <p
          className={
            className ? `text-[#CDD7E8] mt-4` : "text-textPrimary mt-4"
          }
        >
          {children}
        </p>
      </div>
    );
};

export default Heading;
