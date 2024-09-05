"use client";
import React from "react";
import Banner from "@/assets/profile/banner.png";
import Image from "next/image";
import PlaceHolderUser from "@/assets/profile/placeholder.png";
import { Button } from "../../ui/button";
import { FaCamera } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { useUpdateUsersProfileMutation } from "@/redux/api/userApi";

interface ProfileHeaderProps {
  firstName: string;
  lastName: string;
  imageUrl?: string;
  id: number | string;
  role?: string;
  contact?: string;
  address?: string;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  id,
  firstName,
  lastName,
  address,
  contact,
  imageUrl,
  role,
}) => {
  const dispatch = useDispatch();

  const handleUpdateProfilePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log(file);
    }
  };

  const handleUpdateCover = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; // Change this to [0] to access the first file
    if (file) {
      console.log("Cover image file:", file);
      // You can now use the file to update the cover (API call or preview)
    }
  };

  return (
    <div
      className="py-10"
      style={{
        backgroundImage: `linear-gradient(to top, rgba(217, 17, 141, 0.1), rgba(217, 17, 141, 0.1)), url(${Banner.src})`,
        backgroundPosition: "bottom center",
        backgroundSize: "100% auto",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        overflow: "hidden",
      }}
    >
      <div className="container flex justify-between items-center">
        <div>
          <div className="flex relative group rounded-full items-center justify-center overflow-hidden">
            <Image
              src={PlaceHolderUser.src}
              alt={`${firstName} ${lastName}'s profile`}
              width={144}
              height={144}
              style={{ height: "144px", width: "144px", objectFit: "cover" }}
              className="rounded-full"
            />
            <label
              htmlFor="profilePhoto"
              className="bg-black items-center justify-center flex cursor-pointer opacity-0 group-hover:opacity-40 w-full h-full border-gradient transition-opacity rounded-full absolute"
            >
              <input
                onChange={handleUpdateProfilePhoto}
                type="file"
                className="hidden"
                name="profilePhoto"
                id="profilePhoto"
              />
              <FaCamera className="text-white absolute opacity-0 group-hover:opacity-100 left-1/2 transition-opacity text-2xl -translate-x-1/2" />
            </label>
          </div>
        </div>
        {UpdateCoverPhoto()}
      </div>
    </div>
  );

  function UpdateCoverPhoto() {
    return (
      <div>
        <input
          onChange={handleUpdateCover}
          type="file"
          className="hidden"
          name="coverPhoto"
          id="coverPhoto"
        />
        <Button variant={"white"}>
          <label htmlFor="coverPhoto" className="h-full flex items-center z-10">
            Change Cover
          </label>
        </Button>
      </div>
    );
  }
};

export default ProfileHeader;
