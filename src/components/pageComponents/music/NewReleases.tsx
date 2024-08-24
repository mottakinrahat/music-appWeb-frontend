import Card from "@/components/Card/Card";
import Container from "@/components/common/container/Container";
import Heading from "@/components/ui/heading";

const NewReleases = ({ tracks }: any) => {
  return (
    <Container bgGray={true}>
      <Heading type="primary" heading={"New release"}>
        Get your ears on the hottest new tracks, from chart-topping anthems to
        underground gems bubbling up from the scene.
      </Heading>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 my-10">
        {tracks
          .concat(tracks, tracks, tracks)
          ?.map((music: any, idx: number) => (
            <Card
              musicRoute={`/music/${music?.id}`}
              key={idx}
              imageUrl={music.imageUrl ? music.imageUrl : music.artwork}
              artistName={music.artist}
              title={music.title}
              type={music}
            ></Card>
          ))}
      </div>
    </Container>
  );
};

export default NewReleases;
