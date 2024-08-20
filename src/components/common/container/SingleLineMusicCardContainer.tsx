import Heading from "@/components/ui/heading";
import Container from "./Container";
import Card from "@/component/Card/Card";
import { Url } from "url";

interface SingleLineMusicCardContainerInterFace {
  data: Array<any>;
  heading?: String;
  linkText?: String;
  linkRoute?: Url | "/";
  children?: String;
  bgGray: boolean;
}

const SingleLineMusicCardContainer: React.FC<
  SingleLineMusicCardContainerInterFace
> = ({ data, heading, linkText, linkRoute, children, bgGray }) => {
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
              type="music"
            ></Card>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default SingleLineMusicCardContainer;
