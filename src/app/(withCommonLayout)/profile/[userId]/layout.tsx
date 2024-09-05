import Container from "@/components/common/container/Container";
import ProfileHeader from "@/components/profile/common/ProfileHeader";

import React from "react";

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ProfileHeader
        firstName=""
        id={"some id"}
        lastName="last name"
        address="address"
        contact="contact"
        imageUrl=""
      />
      <div className="flex container">
        <div>profile Side bar</div>
        {children}
      </div>
    </>
  );
};

export default ProfileLayout;
