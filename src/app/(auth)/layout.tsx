import LogInSignUpNav from "@/components/common/navigation/LogInSignUpNav";
import React from "react";

const SignUpCreator = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col  ">
      <LogInSignUpNav />
      <div className="w-full">{children}</div>
    </div>
  );
};

export default SignUpCreator;
