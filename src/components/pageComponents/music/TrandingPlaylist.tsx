import Container from "@/components/common/container/Container";
import Heading from "@/components/ui/heading";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import image from "@/assets/images/img.png";
import image1 from "@/assets/images/img2.png";
import image2 from "@/assets/images/img3.png";
import image3 from "@/assets/images/img4.png";
import Card from "@/components/Card/Card";

const tabNames = [
  "top-50",
  "ViralHits",
  "EditorsPicks",
  "Freshnew",
  "BestPlaylist",
  "Mostreecent",
];

const tabData = [
  [
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
  ],
  [
    {
      id: 1,
      imageUrl: image3.src,
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
      imageUrl: image.src,
      artistName: "Helen Khilar",
      title: "Love me babe",
    },
    {
      id: 4,
      imageUrl: image2.src,
      artistName: "Helen Khilar",
      title: "Love me babe",
    },
  ],
  [
    {
      id: 1,
      imageUrl: image2.src,
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
      imageUrl: image3.src,
      artistName: "Helen Khilar",
      title: "Love me babe",
    },
    {
      id: 4,
      imageUrl: image.src,
      artistName: "Helen Khilar",
      title: "Love me babe",
    },
  ],
  [
    {
      id: 1,
      imageUrl: image3.src,
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
      imageUrl: image.src,
      artistName: "Helen Khilar",
      title: "Love me babe",
    },
    {
      id: 4,
      imageUrl: image2.src,
      artistName: "Helen Khilar",
      title: "Love me babe",
    },
  ],
  [
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
  ],
  [],
];

const TrandingPlaylist = () => {
  return (
    <Container>
      <Heading
        type="primary"
        heading="Trending playlist"
        linkText="See all trending playlist"
        route="/"
      >
        popular playlists meticulously crafted by our talented community
        members.
      </Heading>

      <Tabs defaultValue="top-50" className="w-full justify-between my-10">
        <TabsList className="flex justify-between">
          {tabNames.map((tab) => (
            <TabsTrigger key={tab} value={tab}>
              {tab}
            </TabsTrigger>
          ))}
        </TabsList>

        {tabNames.map((tab, index) => (
          <TabsContent key={tab} value={tab}>
            {tabData[index] && tabData[index].length > 0 ? (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 my-10">
                {tabData[index].map((music: any) => (
                  <Card
                    album={music.album}
                    key={music.id}
                    imageUrl={music.imageUrl}
                    artistName={music.artistName}
                    title={music.title}
                    type={music}
                  />
                ))}
              </div>
            ) : (
              <p>No data available for {tab}</p>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </Container>
  );
};

export default TrandingPlaylist;
