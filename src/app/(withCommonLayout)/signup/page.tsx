import React from "react";
import SignupPage from "./component/SignupPage";
import LogInSignUpNav from "@/components/common/navigation/LogInSignUpNav";

const SignUp = () => {
  return (
    <div>
      <LogInSignUpNav />
      <SignupPage />
    </div>
  );
};

export default SignUp;
