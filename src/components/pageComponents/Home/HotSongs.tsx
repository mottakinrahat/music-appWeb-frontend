import SingleLineMusicCardContainer from "@/components/common/container/SingleLineMusicCardContainer";
import React from "react";
import image from "@/assets/images/img.png";
import image1 from "@/assets/images/img2.png";
import image2 from "@/assets/images/img3.png";
import image3 from "@/assets/images/img4.png";

const HotSongs = () => {
  const data = [
    {
      id: 1,
      imageUrl: image.src,
      artistName: "Helen Khilar",
      title: "Love me babe",
    },
    {
      id: 2,
      imageUrl: image1.src,
      artistName: "Helen Khilar",
      title: "Love me babe",
    },
    {
      id: 3,
      imageUrl: image2.src,
      artistName: "Helen Khilar",
      title: "Love me babe",
    },
    {
      id: 4,
      imageUrl: image3.src,
      artistName: "Helen Khilar",
      title: "Love me babe",
    },
  ];
  return (
    <SingleLineMusicCardContainer
      bgGray={false}
      data={data}
      heading={"Hot songs"}
      linkText={"See all new releases"}
      linkRoute={"/"}
    >
      Embark on a sonic adventure and discover hidden gems or chart-topping
      anthems waiting to be your new favorite song.
    </SingleLineMusicCardContainer>
  );
};

export default HotSongs;
