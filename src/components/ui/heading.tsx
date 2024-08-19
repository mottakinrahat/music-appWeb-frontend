import { Url } from "next/dist/shared/lib/router/router";
import Link from "next/link";
import React from "react";
interface Heading {
  type: "primary" | "secondary";
  heading?: String;
  children?: String;
  linkText?: String;
  route?: Url | "/";
  colorText?: String;
}

const Heading: React.FC<Heading> = ({
  type,
  children,
  heading,
  linkText,
  route,
  colorText,
}: Heading) => {
  if (type === "primary")
    return (
      <div className="flex justify-between items-center">
        <div className="max-w-xl">
          <h2 className="text-5xl mb-4 font-semibold">{heading}</h2>
          <p className="text-textPrimary">{children}</p>
        </div>
        <div>
          <Link
            className="underline text-accent font-semibold text-base"
            href={route ? route : "/"}
          >
            {linkText}
          </Link>
        </div>
      </div>
    );

  if (type === "secondary")
    return (
      <div className="max-w-xl my-6">
        <h1 className="text-5xl font-semibold">
          {heading} <span className="text-secondary">{colorText}</span>
        </h1>
        <p className="text-textPrimary mt-4">{children}</p>
      </div>
    );
};

export default Heading;
