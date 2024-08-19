import Card from "@/component/Card/Card";
import Container from "@/components/common/container/Container";
import Heading from "@/components/ui/heading";
import * as React from "react";
import image from "@/assets/images/img.png";

interface NewReleaseProps {}

const NewRelease: React.FunctionComponent<NewReleaseProps> = () => {
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
      <Card
        imageUrl={image.src}
        artistName="Jibon"
        title="Hello song"
        type="music"
      ></Card>
    </Container>
  );
};

export default NewRelease;
