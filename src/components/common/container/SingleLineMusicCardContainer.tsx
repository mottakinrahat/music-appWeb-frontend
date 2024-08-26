import Heading from "@/components/ui/heading";
import Container from "./Container";
import Card from "@/components/Card/Card";
// import { Url } from "url";

interface SingleLineCardContainerInterFace {
  data: Array<any>;
  heading?: string;
  linkText?: string;
  linkRoute?: string;
  children?: string;
  bgGray: boolean;
  singleLine?: boolean;
  album?: boolean;
}

const SingleLineMusicCardContainer: React.FC<
  SingleLineCardContainerInterFace
> = ({
  data,
  heading,
  linkText,
  linkRoute,
  singleLine,
  children,
  bgGray,
  album,
}) => {
  return (
    <Container bgGray={bgGray} className={`${bgGray && ""}`}>
      <Heading
        type="primary"
        heading={heading}
        linkText={linkText}
        route={linkRoute}
      >
        {children}
      </Heading>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 my-10">
        {singleLine
          ? data
              ?.slice(0, 4)
              ?.map((music: any, idx) => (
                <Card
                  album={album ? music.album : ""}
                  key={idx}
                  imageUrl={music.imageUrl}
                  artistName={music.artistName}
                  title={music.title}
                  type={music}
                ></Card>
              ))
          : data?.map((music: any, idx) => (
              <Card
                album={album ? music.album : ""}
                key={idx}
                imageUrl={music.imageUrl ? music.imageUrl : music.artwork}
                artistName={music.artistName}
                title={music.title}
                type={music}
              ></Card>
            ))}
      </div>
    </Container>
  );
};

export default SingleLineMusicCardContainer;
