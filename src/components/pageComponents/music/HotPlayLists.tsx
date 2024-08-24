import SingleLineMusicCardContainer from "@/components/common/container/SingleLineMusicCardContainer";
import React from "react";
import image from "@/assets/images/img.png";
import image1 from "@/assets/images/img2.png";
import image2 from "@/assets/images/img3.png";
import image3 from "@/assets/images/img4.png";

const HotPlayLists = () => {
  const data = [
    {
      id: 1,
      imageUrl: image.src,
      artistName: "The perfect soundtrack to thos..",
      title: "Uplifting",
    },
    {
      id: 2,
      imageUrl: image1.src,
      artistName: "The gentle sound of some of t...",
      title: "Rhythms",
    },
    {
      id: 3,
      imageUrl: image2.src,
      artistName: "An uplifting yet tasteful dinn...",
      title: "Romantic list",
    },
    {
      id: 4,
      imageUrl: image3.src,
      artistName: "Gettin' figgy with it, bana-na...",
      title: "Kitchen swag",
    },
  ];
  return (
    <SingleLineMusicCardContainer
      bgGray={false}
      data={data}
      heading={"Hot playlists"}
      linkText={"See all hot playlist"}
      linkRoute={"/"}
    >
      Get your ears on the hottest new tracks, from chart-topping anthems to
      underground gems bubbling up from the scene.
    </SingleLineMusicCardContainer>
  );
};

export default HotPlayLists;
