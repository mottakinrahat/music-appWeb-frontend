import EventContainer from "@/components/common/container/EventContainer";

import image from "@/assets/images/Card3.png";
import image1 from "@/assets/images/Card2.png";
import image2 from "@/assets/images/Card.png";

const Events = () => {
  const data = [
    {
      id: 1,
      imageUrl: image.src,
      artistName: "Helen Khilar",
      title: "Major Festival (Pop/Rock)",
    },
    {
      id: 2,
      imageUrl: image1.src,
      artistName: "Helen Khilar",
      title: "An Evening with Joni Mitchell",
    },
    {
      id: 3,
      imageUrl: image2.src,
      artistName: "Helen Khilar",
      title: "Pulse Tour: DJ Zedd",
    },
  ];
  return (
    <div>
      <EventContainer
        bgGray={true}
        data={data}
        linkRoute={"/"}
        heading="Upcoming events"
        linkText="See all upcoming events"
      >
        Live music has the power to transport you, to create unforgettable
        memories, and to connect you with a community of passionate music
        lovers.
      </EventContainer>
    </div>
  );
};

export default Events;
