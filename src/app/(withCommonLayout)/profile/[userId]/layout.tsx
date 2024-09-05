import Container from "@/components/common/container/Container";
import ProfileHeader from "@/components/profile/common/ProfileHeader";

import React from "react";

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ProfileHeader
        memberType="Free tire member"
        firstName="Jhon"
        id={"some id"}
        lastName="Doe"
        address="@john445"
        contact="Los Angeles, CA"
        imageUrl=""
        designation="Music Producer"
      />
      <div className="flex container">
        <div>profile Side bar</div>
        {children}
      </div>
    </>
  );
};

export default ProfileLayout;
