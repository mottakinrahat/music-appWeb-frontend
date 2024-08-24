import LandingMusicCard from "@/components/Card/LandingMusicCard";
import image from "@/assets/images/img.png";
import image1 from "@/assets/images/img2.png";
import image2 from "@/assets/images/img3.png";
import image3 from "@/assets/images/img4.png";
import Container from "@/components/common/container/Container";

const TopCharts = () => {
  const data = [
    {
      id: 1,
      imageUrl: image.src,
      artistName: "Helen Khilar",
      title: "Love me babe",
      album: "The Run Way",
    },
    {
      id: 2,
      imageUrl: image1.src,
      artistName: "Helen Khilar",
      title: "Love me babe",
      album: "The Run Way",
    },
    {
      id: 3,
      imageUrl: image2.src,
      artistName: "Helen Khilar",
      title: "Love me babe",
      album: "The Run Way",
    },
    {
      id: 4,
      imageUrl: image3.src,
      artistName: "Helen Khilar",
      title: "Love me babe",
      album: "The Run Way",
    },
  ];

  return (
    <Container>
      <div className="grid grid-cols-2 gap-2">
        {data?.map((music, idx) => (
          <LandingMusicCard
            key={idx}
            artist={music.artistName}
            artwork={music.imageUrl}
            id={music.id}
            title={music.title}
            album={music.album}
          />
        ))}
      </div>
    </Container>
  );
};

export default TopCharts;
