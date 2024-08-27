import React from "react";
import Link from "next/link";

const CreateAnAccount = () => {
  return (
    <div>
      <div className="max-w-xl mx-auto ">
        <div className="space-y-4 mb-6">
          <p className="text-[#262626] text-4xl font-semibold leading-none tracking-[-0.96px]">Create an account</p>
          <p className="text-[#4C4C4C] text-base font-normal leading-[22.4px]">
            Already have an account?{" "}
            <span className="text-[#00CCD0] text-base font-semibold leading-[140%] underline">Log in</span>
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {/* card 1 */}
          <Link href="/signup">
            <div className="group transition-all duration-300 flex flex-col p-6 items-start gap-4 rounded-xl border border-[#E6E6E6] text-black bg-[#F7F7F7] hover:bg-[#00CCD0] cursor-pointer">
              <p className="text-[#262626] text-2xl font-semibold leading-normal group-hover:text-white">
                Sign up as a User
              </p>
              <p className="text-[#4C4C4C] text-base font-normal leading-[22.4px] group-hover:text-white">
                Listen to music, access educational resources, and industry insights to fuel your musical journey.
              </p>
            </div>
          </Link>
          {/* card 2 */}
          <Link href="/signup-creator">
            <div className="group transition-all duration-300 flex flex-col p-6 items-start gap-4 rounded-xl border border-[#E6E6E6] text-black bg-[#F7F7F7] hover:bg-[#00CCD0] cursor-pointer">
              <p className="text-[#262626] text-2xl font-semibold leading-normal group-hover:text-white">
                Sign up as a Creator
              </p>
              <p className="text-[#4C4C4C] text-base font-normal leading-[22.4px] group-hover:text-white">
                Access tools and resources, build your portfolio, showcase your skills, and land exciting new projects.
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CreateAnAccount;
