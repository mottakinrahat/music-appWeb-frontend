"use client";
import DForm from "@/components/forms/DForm";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import DInput from "@/components/forms/DInput";
import SocialLogin from "@/components/common/socialLogin/SocialLogin";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import { FaFacebook } from "react-icons/fa6";
import { FaApple } from "react-icons/fa";
import DCheckbox from "@/components/forms/DCheckbox";
import { formSchema } from "./loginSchema";

const Login = () => {
  const defaultValues = {};
  const handleLogin = (e: any) => {
    console.log(e);
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <DForm
        resolver={zodResolver(formSchema)}
        className="flex flex-col gap-5 max-w-xl mx-auto"
        onSubmit={handleLogin}
        defaultValues={defaultValues}
      >
        <h1 className="text-[#262626] text-5xl font-semibold ">Log in</h1>
        <p className="font-semibold text-base leading-6">
          Don&apos;t hanve an account? <span className="text-accent">Create an account</span>
        </p>
        {/* email */}
        <DInput labelTextColor="#262626" name="email" label="Email" placeholder="Enter your email" />
        {/* Password */}
        <DInput labelTextColor="#262626" name="password" label="Password" placeholder="Enter your password" />
        {/* submit Button */}
        <Button type="submit" className="text-white hover:bg-accent hover:text-white bg-accent rounded-md ">
          Log in
        </Button>

        {/* devider */}
        <div className="flex items-center justify-center ">
          <div className="flex-grow h-[1px] bg-gradient-to-r to-black from-white"></div>
          <p className="mx-4">or</p>
          <div className="flex-grow h-[1px] bg-gradient-to-r from-black to-white"></div>
        </div>

        {/* google Login */}

        <SocialLogin
          icon={<FcGoogle />}
          text="Login with Google"
          className="flex items-center px-4 py-2 bg-[#F2F2F2] rounded-lg justify-center text-black font-semibold"
        />

        {/* Facebook Login */}

        <SocialLogin
          icon={<FaFacebook />}
          text="Login with Facebook"
          className="flex items-center px-4 py-2 bg-[#1877F2] rounded-lg justify-center text-white font-semibold"
        />

        {/* Apple Login  */}

        <SocialLogin
          icon={<FaApple />}
          text="Login with Facebook"
          className="flex items-center px-4 py-2 bg-black rounded-lg justify-center text-white font-semibold"
        />

        <div className="flex justify-between h-[3rem]">
          <div className="flex gap-2 ">
            <DCheckbox name="rememberPassword" label="rememberPassword" />
            <p>Remember Password</p>
          </div>
          <div>
            <p className="underline text-accent cursor-pointer">Forgot Password</p>
          </div>
        </div>
        <p className="text-[#4C4C4C]">
          By clicking &quot;Log in&quot; above, you acknowledge that you have read and you agree to our General{" "}
          <span className="font-semibold">Terms and Conditions</span> and have read and acknowledge the{" "}
          <span className="font-semibold">Privacy policy.</span>
        </p>
      </DForm>
    </div>
  );
};

export default Login;
