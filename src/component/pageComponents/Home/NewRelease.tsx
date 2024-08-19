import Card from "@/component/Card/Card";
import Container from "@/components/common/container/Container";
import Heading from "@/components/ui/heading";
import * as React from "react";
import image from "@/assets/images/img.png";
import image1 from "@/assets/images/img2.png";
import image2 from "@/assets/images/img3.png";
import image3 from "@/assets/images/img4.png";
import SingleLineMusicCardContainer from "@/components/common/container/SingleLineMusicCardContainer";

interface NewReleaseProps {}

const NewRelease: React.FunctionComponent<NewReleaseProps> = () => {
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
    <SingleLineMusicCardContainer
      data={data}
      heading={"New Release"}
      linkText={"See all new releases"}
      linkRoute={"/"}
    >
      Get your ears on the hottest new tracks, from chart-topping anthems to
      underground gems bubbling up from the scene.
    </SingleLineMusicCardContainer>
  );
};

export default NewRelease;
