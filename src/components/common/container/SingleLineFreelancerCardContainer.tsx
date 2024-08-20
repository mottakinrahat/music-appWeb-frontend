import Heading from "@/components/ui/heading";
import Container from "./Container";
import Card from "@/component/Card/Card";
import { Url } from "url";

interface SingleLineCardContainerInterFace {
  data: Array<any>;
  heading?: string;
  linkText?: string;
  linkRoute?: Url | "/";
  children?: string;
  bgGray: boolean;
}

const SingleLineFreelancerCardContainer: React.FC<
  SingleLineCardContainerInterFace
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
          {data.map((freelancer: any, idx) => (
            <Card
              key={idx}
              freelancerType={freelancer?.freelancerName}
              freelancerName={freelancer?.freelancerType}
              rating={freelancer?.rating}
              imageUrl={freelancer?.imageUrl}
              artistName={freelancer?.artisName}
              type={"freelancer"}
            ></Card>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default SingleLineFreelancerCardContainer;
