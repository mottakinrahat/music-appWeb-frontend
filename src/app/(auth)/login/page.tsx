"use client";
import DForm from "@/components/forms/DForm";
import { zodResolver } from "@hookform/resolvers/zod";
import DInput from "@/components/forms/DInput";
import SocialLogin from "@/components/common/socialLogin/SocialLogin";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import { FaFacebook } from "react-icons/fa6";
import { FaApple } from "react-icons/fa";
import DCheckbox from "@/components/forms/DCheckbox";
import { loginSchema } from "./loginSchema";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useLoginMutation } from "@/redux/api/authApi";
import { Toast } from "@/components/ui/toast";
import { toast } from "@/hooks/use-toast";

const Login = () => {
  const [login, { isLoading, error }] = useLoginMutation();
  const router = useRouter();
  const defaultValues = {};
  const handleLogin = async (e: any) => {
    const formData = e;
    try {
      const res = await login(formData).unwrap();
      const user = res?.data?.user;
      localStorage.setItem("token", res.data.data?.token);
      localStorage.setItem("user", JSON.stringify(user));
      
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" flex items-center  max-w-xl mx-auto flex-col justify-center p-4">
      <DForm
        resolver={zodResolver(loginSchema)}
        className="flex flex-col gap-5 w-full"
        onSubmit={handleLogin}
        defaultValues={defaultValues}
      >
        <h1 className="text-[#262626] text-5xl font-semibold ">Log in</h1>
        <p className="font-semibold text-base leading-6">
          Don&apos;t hanve an account?{" "}
          <Link href="/create-account">
            {" "}
            <span className="text-accent">Create an account</span>
          </Link>
        </p>
        {/* {/ email /} */}
        <DInput
          defaultValue={"testuser@gmail.com"}
          labelTextColor="#262626"
          name="email"
          label="Email"
          placeholder="Enter your email"
        />
        {/* {/ Password /} */}
        <DInput
          defaultValue={"@1111aA1111"}
          labelTextColor="#262626"
          name="password"
          label="Password"
          placeholder="Enter your password"
          type="password"
        />
        {/* {/ submit Button /} */}
        <Button type="submit" className="text-white hover:bg-accent hover:text-white bg-accent rounded-md ">
          Log in
        </Button>

        {/* {/ devider /} */}
        <div className="flex items-center justify-center ">
          <div className="flex-grow h-[1px] bg-gradient-to-r to-black from-white"></div>
          <p className="mx-4">or</p>
          <div className="flex-grow h-[1px] bg-gradient-to-r from-black to-white"></div>
        </div>

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
              <p className="underline text-accent cursor-pointer">Forgot Password</p>
            </div>
          </div>
          <p className="text-[#4C4C4C]">
            By clicking &quot;Log in&quot; above, you acknowledge that you have read and you agree to our General{" "}
            <span className="font-semibold">Terms and Conditions</span> and have read and acknowledge the{" "}
            <span className="font-semibold">Privacy policy.</span>
          </p>
        </div>
      </DForm>
    </div>
  );
};

export default Login;
