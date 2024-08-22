import React from "react";
import image from "@/assets/images/freelancer.png";
import image1 from "@/assets/images/freelancer2.png";
import image2 from "@/assets/images/freelancer3.png";
import image3 from "@/assets/images/freelancer4.png";
import SingleLineFreelancerCardContainer from "@/components/common/container/SingleLineFreelancerCardContainer";

const BrowseFreeLencers = () => {
  const data = [
    {
      id: 1,
      imageUrl: image.src,
      freelancerName: "Sarah Jones",
      freelancerType: "Music Producer",
      rating: 5,
    },
    {
      id: 2,
      imageUrl: image1.src,
      freelancerName: "David Lee",
      freelancerType: "Session Musician",
      rating: 5,
    },
    {
      id: 3,
      imageUrl: image2.src,
      freelancerName: "Alex Rodriguez",
      freelancerType: "Music Producer",
      rating: 5,
    },
    {
      id: 4,
      imageUrl: image3.src,
      freelancerName: "Yousuf Ali",
      freelancerType: "Song Writter",
      rating: 5,
    },
  ];
  return (
    <div>
      <SingleLineFreelancerCardContainer
        data={data}
        bgGray={false}
        heading={"Browse freelance talent"}
        linkRoute={"/"}
        linkText="See all freelencers"
      >
        Browse profiles from a diverse range of music professionals, each with
        their unique skillsets, experience levels, and areas of expertise
      </SingleLineFreelancerCardContainer>
    </div>
  );
};

export default BrowseFreeLencers;
