import LandingMusicCard from "@/components/Card/LandingMusicCard";
import image from "@/assets/images/img.png";
import image1 from "@/assets/images/img2.png";
import image2 from "@/assets/images/img3.png";
import image3 from "@/assets/images/img4.png";
import Container from "@/components/common/container/Container";
import Heading from "@/components/ui/heading";

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
    {
      id: 5,
      imageUrl: image2.src,
      artistName: "Helen Khilar",
      title: "Love me babe",
      album: "The Run Way",
    },
    {
      id: 6,
      imageUrl: image1.src,
      artistName: "Helen Khilar",
      title: "Love me babe",
      album: "The Run Way",
    },
    {
      id: 7,
      imageUrl: image3.src,
      artistName: "Helen Khilar",
      title: "Love me babe",
      album: "The Run Way",
    },
    {
      id: 8,
      imageUrl: image2.src,
      artistName: "Helen Khilar",
      title: "Love me babe",
      album: "The Run Way",
    },
  ];

  return (
    <Container bgGray>
      <Heading
        type="primary"
        route="/"
        linkText="See all of top chart"
        heading={`Top charts: Top ${data.length} tracks`}
      >
        Dive into the heart of what{"'"}s trending with our Top 100 chart.
      </Heading>
      <div className="grid grid-cols-1 sm:grid-cols-2 mt-10 gap-x-4">
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
