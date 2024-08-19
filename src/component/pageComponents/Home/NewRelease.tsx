import Card from "@/component/Card/Card";
import Container from "@/components/common/container/Container";
import Heading from "@/components/ui/heading";
import * as React from "react";
import image from "@/assets/images/img.png";
import image1 from "@/assets/images/img2.png";
import image2 from "@/assets/images/img3.png";
import image3 from "@/assets/images/img4.png";

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
    <Container bgGray className=" py-20">
      <Heading
        type="primary"
        heading={"New Release"}
        linkText={"See all new releases"}
      >
        Get your ears on the hottest new tracks, from chart-topping anthems to
        underground gems bubbling up from the scene.
      </Heading>
      <div className="grid grid-cols-4 gap-8 my-10">
        {data.map((music) => (
          <Card
            key={music.id}
            imageUrl={music.imageUrl}
            artistName={music.artisName}
            title={music.title}
            type="music"
          ></Card>
        ))}
      </div>
    </Container>
  );
};

export default NewRelease;
