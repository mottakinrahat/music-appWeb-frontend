import Card from "@/components/Card/Card";
import Container from "@/components/common/container/Container";
import Heading from "@/components/ui/heading";
import songImg from "@/assets/etc/png/song.jpg";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import Loading from "@/app/(withCommonLayout)/music/loading";

const NewReleases = ({ tracks }: any) => {
  // console.log(tracks);
  if (tracks.length <= 0) return <Loading />;
  return (
    <Container bgGray={true}>
      <Heading type="primary" heading={"New release"}>
        Get your ears on the hottest new tracks, from chart-topping anthems to
        underground gems bubbling up from the scene.
      </Heading>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 my-10">
        {tracks
          .concat(tracks, tracks)
          .slice(0, 16)
          ?.map((music: any, idx: number) => (
            <Card
              musicId={`${music?._id}`}
              key={idx}
              imageUrl={
                music.imageUrl
                  ? music.imageUrl
                  : music.artwork
                  ? music.artwork
                  : songImg.src
              }
              artistName={music.artist ? music.artist : music.songArtist}
              title={music.title ? music.title : music.songName}
              type={music}
            ></Card>
          ))}
      </div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
            <PaginationLink href="#">2</PaginationLink>
            <PaginationLink href="#">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </Container>
  );
};

export default NewReleases;
