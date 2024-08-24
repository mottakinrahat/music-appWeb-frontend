import React from "react";

interface SocialLoginProps {
  icon: React.ReactNode; // This will hold the icon component
  text: string; // This will hold the text to be displayed
  // This will hold the background color
  className?: string; // Optional className for additional styling
  [key: string]: any; // To accept any additional props
}

const SocialLogin: React.FC<SocialLoginProps> = ({ icon, text, ...rest }) => {
  return (
    <button
      {...rest} // Spread any additional props here
    >
      <span className="mr-2">{icon}</span>
      {text}
    </button>
  );
};

export default SocialLogin;
