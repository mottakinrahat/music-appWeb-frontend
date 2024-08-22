import image from "@/assets/images/Card3.png";
import image1 from "@/assets/images/Card2.png";
import image2 from "@/assets/images/Card.png";
import ConcertsContainer from "@/components/common/container/ConcertsContainer";

const VRConcerts = () => {
  const data = [
    {
      id: 1,
      imageUrl: image.src,
      artisName: "Helen Khilar",
      title: "Major Festival (Pop/Rock)",
    },
    {
      id: 2,
      imageUrl: image1.src,
      artisName: "Helen Khilar",
      title: "An Evening with Joni Mitchell",
    },
    {
      id: 3,
      imageUrl: image2.src,
      artisName: "Helen Khilar",
      title: "Pulse Tour: DJ Zedd",
    },
    {
      id: 4,
      imageUrl: image1.src,
      artisName: "Helen Khilar",
      title: "Pulse Tour: DJ Zedd",
    },
  ];
  return (
    <div>
      <ConcertsContainer
        bgGray={false}
        data={data}
        linkRoute={"/"}
        heading="VR Concerts"
        linkText="See all VR Concerts"
      >
        Music enthusiasts can virtually go to the front row of a concert using a
        VR headset enough with a stable internet connection.
      </ConcertsContainer>
    </div>
  );
};

export default VRConcerts;
