import image from "@/assets/images/img.png";
import image1 from "@/assets/images/img2.png";
import image2 from "@/assets/images/img3.png";
import image3 from "@/assets/images/img4.png";
import SingleLineMusicCardContainer from "@/components/common/container/SingleLineMusicCardContainer";

const RecentlyPlayed = () => {
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
      bgGray={true}
      data={data}
      heading={"Recently played"}
      linkText={"See all recently played"}
      linkRoute={"/"}
    >
      Pickup form where you left off
    </SingleLineMusicCardContainer>
  );
};

export default RecentlyPlayed;
