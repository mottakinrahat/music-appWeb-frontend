import React from "react";

interface SocialLoginProps {
  icon: React.ReactNode; 
  text: string; 
  className?: string;
  name?: string; 
  [key: string]: any; 
}

const SocialLogin: React.FC<SocialLoginProps> = ({ icon, text, name, ...rest }) => {
  return (
    <button
      name={name}
      {...rest}
    >
      <span className="mr-2">{icon}</span>
      {text}
    </button>
  );
};

export default SocialLogin;
