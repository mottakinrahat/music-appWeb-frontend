"use client";
import React from "react";
import { Audio } from 'react-loader-spinner';

const LoadingAnimation = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Audio
        height="100"
        width="100"
        color="#4fa94d"
        ariaLabel="audio-loading"
        wrapperStyle={{}}
        wrapperClass="wrapper-class"
        visible={true}
      />
    </div>
  );
};

export default LoadingAnimation;
