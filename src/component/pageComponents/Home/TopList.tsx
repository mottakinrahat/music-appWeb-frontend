import SingleLineCardContainer from "@/components/common/container/SingleLineMusicCardContainer";
import React from "react";
import image from "@/assets/images/img.png";
import image1 from "@/assets/images/img2.png";
import image2 from "@/assets/images/img3.png";
import image3 from "@/assets/images/img4.png";

const TopList = () => {
  const data = [
    {
      id: 1,
      imageUrl: image.src,
      artisName: "Helen Khilar",
      title: "Love me babe",
    },
    {
      id: 2,
      imageUrl: image1.src,
      artisName: "Helen Khilar",
      title: "Love me babe",
    },
    {
      id: 3,
      imageUrl: image2.src,
      artisName: "Helen Khilar",
      title: "Love me babe",
    },
    {
      id: 4,
      imageUrl: image3.src,
      artisName: "Helen Khilar",
      title: "Love me babe",
    },
  ];
  return (
    <SingleLineCardContainer
      bgGray={false}
      data={data}
      heading={"Top List"}
      linkText={"See all off top chart"}
      linkRoute={"/"}
    >
      See what music is captivating listeners around the globe and discover your
      next sonic obsession.
    </SingleLineCardContainer>
  );
};

export default TopList;
