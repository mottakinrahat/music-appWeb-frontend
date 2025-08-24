import React from "react";
import Image from "next/image";
import Banner from "@/assets/profile/banner.png";
import { UpdateCoverPhoto } from "./UpdateCoverPhoto";
import { UpdateProfilePicture } from "./UpdateProfilePicture";
import { MdOutlineStarBorderPurple500 } from "react-icons/md";
import Link from "next/link";

interface ProfileHeaderProps {
  firstName: string;
  lastName: string;
  imageUrl?: string;
  id: number | string;
  role?: string;
  contact?: string;
  address?: string;
  memberType: string;
  designation: string;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  id,
  firstName,
  lastName,
  address,
  contact,
  imageUrl,
  role,
  memberType,
  designation,
}) => {
  return (
    <div className="relative py-5 sm:py-14 md:py-5 lg:py-10 overflow-hidden">
      <div className="absolute w-full h-full left-1/2 -translate-x-1/2 top-0 md:bottom-0  z-[-1]">
        <Image
          style={{ width: "auto", height: "auto" }}
          height={Banner.height}
          width={Banner.width}
          src={Banner}
          alt="Cover photo"
          priority
          className="w-full mx-auto object-cover"
        />
      </div>
      <div className="container flex flex-col md:flex-row justify-center items-center gap-10 md:justify-between">
        <div className="flex gap-4">
          <UpdateProfilePicture
            firstName={firstName}
            lastName={lastName}
            imageUrl={imageUrl}
          />
          <div className="flex items-center">
            <div className="grid gap-4">
              <p className="text-5xl font-semibold">
                {firstName} {lastName}
              </p>
              <div className="bg-[rgba(217,17,141,0.08)] flex items-center gap-2 font-semibold h-fit w-fit text-secondary rounded-full py-2 px-4">
                <MdOutlineStarBorderPurple500 className="border-2 rounded-full text-lg border-secondary" />{" "}
                {memberType}
              </div>
              <div className="text-textPrimary">
                *Unlock your potential: Upgrade to{" "}
                <Link
                  className="text-textSecondary font-semibold underline"
                  href={"/plans"}
                >
                  {" "}
                  premium
                </Link>
              </div>
            </div>
            <div className="h-full w-px bg-[#E6E6E6] mx-2"></div>
            <div>
              <p className="text-base font-semibold">{designation}</p>
              <p>{contact}</p>
              <p>{address}</p>
            </div>
          </div>
        </div>
        <UpdateCoverPhoto />
      </div>
    </div>
  );
};

export default ProfileHeader;
