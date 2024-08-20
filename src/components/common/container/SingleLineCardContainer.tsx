import Heading from "@/components/ui/heading";
import Container from "./Container";
import Card from "@/component/Card/Card";
import { Url } from "url";

interface SingleLineCardContainerInterFace {
  data: Array<any>;
  heading?: String;
  linkText?: String;
  linkRoute?: Url | "/";
  children?: String;
  bgGray: boolean;
  cardType: "music" | "artist";
}

const SingleLineMusicCardContainer: React.FC<
  SingleLineCardContainerInterFace
> = ({ data, heading, linkText, linkRoute, children, bgGray, cardType }) => {
  return (
    <div>
      <Container bgGray={bgGray} className={`${bgGray && "py-20"}`}>
        <Heading
          type="primary"
          heading={heading}
          linkText={linkText}
          route={linkRoute}
        >
          {children}
        </Heading>
        <div className="grid grid-cols-4 gap-6 my-10">
          {data.map((music: any) => (
            <Card
              key={music.id}
              imageUrl={music.imageUrl}
              artistName={music.artisName}
              title={music.title}
              type={cardType ? cardType : music}
            ></Card>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default SingleLineMusicCardContainer;
