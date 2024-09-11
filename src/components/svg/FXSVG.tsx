import React from "react";

const FXSVG = () => {
  return (
    <svg
      className="group cursor-pointer"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2 15V9C2 5.68629 4.68629 3 8 3H16C19.3137 3 22 5.68629 22 9V15C22 18.3137 19.3137 21 16 21H8C4.68629 21 2 18.3137 2 15Z"
        stroke="current"
        className="group-hover:stroke-accent stroke-white transition"
        strokeWidth="1.5"
      />
      <path
        d="M6 15V9H11"
        stroke="current"
        className="group-hover:stroke-accent stroke-white transition"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 12H9.57143"
        stroke="current"
        className="group-hover:stroke-accent stroke-white transition"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13 15L15.5 12M15.5 12L18 9M15.5 12L13 9M15.5 12L18 15"
        stroke="current"
        className="group-hover:stroke-accent stroke-white transition"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default FXSVG;
