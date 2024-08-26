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
import axios from "axios";
import { loginSchema } from "./loginSchema";
import { useRouter } from "next/navigation";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import ToastCard from "@/components/Card/ToastCard";
import { Toaster } from "@/components/ui/sonner";

const Login = () => {
  const router = useRouter();
  const defaultValues = {};
  const handleLogin = (e: any) => {
    const formData = e;
    console.log(formData);
    axios
      .post("https://music-app-web.vercel.app/api/v1/auth/login", e)
      .then((res) => {
        const user = res?.data?.data?.user;
        localStorage.setItem("token", res.data.data?.token);
        localStorage.setItem("user", JSON.stringify(user));
        router.push("/");
      })
      .then(() => {
        ToastCard({
          title: "Log in successful.",
          message: "Log in has been successful.",
          icon: (
            <IoCheckmarkDoneCircleOutline className="w-6 h-6 text-green-500" />
          ),
          duration: 2000,
        });
      });
  };

  return (
    <div className=" flex items-center justify-center">
      <Toaster position="bottom-center" />
      <DForm
        resolver={zodResolver(loginSchema)}
        className="flex flex-col gap-5 w-full"
        onSubmit={handleLogin}
        defaultValues={defaultValues}
      >
        <h1 className="text-[#262626] text-5xl font-semibold ">Log in</h1>
        <p className="font-semibold text-base leading-6">
          Don&apos;t hanve an account?{" "}
          <span className="text-accent">Create an account</span>
        </p>
        {/* email */}
        <DInput
          defaultValue={"ruhul@gmail.com"}
          labelTextColor="#262626"
          name="email"
          label="Email"
          placeholder="Enter your email"
        />
        {/* Password */}
        <DInput
          defaultValue={"@1111aA1111"}
          labelTextColor="#262626"
          name="password"
          label="Password"
          placeholder="Enter your password"
          type="password"
        />
        {/* submit Button */}
        <Button
          type="submit"
          className="text-white hover:bg-accent hover:text-white bg-accent rounded-md "
        >
          Log in
        </Button>

        {/* devider */}
        <div className="flex items-center justify-center ">
          <div className="flex-grow h-[1px] bg-gradient-to-r to-black from-white"></div>
          <p className="mx-4">or</p>
          <div className="flex-grow h-[1px] bg-gradient-to-r from-black to-white"></div>
        </div>

        {/* Social Logins */}
        <div className="w-full space-y-5">
          <SocialLogin
            icon={<FcGoogle />}
            text="Continue with Google"
            className="flex w-full items-center px-4 py-2 bg-[#F2F2F2] rounded-lg justify-center text-black font-semibold"
          />

          <SocialLogin
            icon={<FaFacebook />}
            text="Continue with Facebook"
            className="flex w-full items-center px-4 py-2 bg-[#1877F2] rounded-lg justify-center text-white font-semibold"
          />

          <SocialLogin
            icon={<FaApple />}
            text="Continue with Apple"
            className="flex w-full items-center px-4 py-2 bg-black rounded-lg justify-center text-white font-semibold"
          />

          <div className="flex justify-between h-[3rem]">
            <div className="flex gap-2 ">
              <DCheckbox name="rememberPassword" label="rememberPassword" />
              <p>Remember Password</p>
            </div>
            <div>
              <p className="underline text-accent cursor-pointer">
                Forgot Password
              </p>
            </div>
          </div>
          <p className="text-[#4C4C4C]">
            By clicking &quot;Log in&quot; above, you acknowledge that you have
            read and you agree to our General{" "}
            <span className="font-semibold">Terms and Conditions</span> and have
            read and acknowledge the{" "}
            <span className="font-semibold">Privacy policy.</span>
          </p>
        </div>
      </DForm>
    </div>
  );
};

export default Login;
