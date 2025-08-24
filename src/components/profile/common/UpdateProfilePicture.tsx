"use client";
import Image from "next/image";
import PlaceHolderUser from "@/assets/profile/placeholder.png";
import { FaCamera } from "react-icons/fa";

interface UpdateProfilePictureProps {
  firstName: string;
  lastName: string;
  imageUrl?: string;
}

export const UpdateProfilePicture: React.FC<UpdateProfilePictureProps> = ({
  firstName,
  lastName,
  imageUrl,
}) => {
  const handleUpdateProfilePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log(file);
    }
  };

  return (
    <div className="absolute z-10 md:relative w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] lg:h-[144px] lg:w-[144px] -bottom-10 md:bottom-0 flex items-center group justify-center rounded-full overflow-hidden">
      <Image
        src={imageUrl ? imageUrl : PlaceHolderUser.src}
        alt={`${firstName} ${lastName}'s profile`}
        width={144}
        height={144}
        style={{ height: "auto", width: "auto", objectFit: "cover" }}
        className="rounded-full "
      />
      <label
        htmlFor="profilePhoto"
        className="absolute inset-0 flex items-center justify-center opacity-0 cursor-pointer group-hover:opacity-40 transition-opacity rounded-full bg-black"
      >
        <input
          onChange={handleUpdateProfilePhoto}
          type="file"
          className="hidden"
          name="profilePhoto"
          id="profilePhoto"
        />
        <FaCamera className="text-white  text-xl sm:text-2xl transition-opacity opacity-0 group-hover:opacity-100" />
      </label>
    </div>
  );
};
