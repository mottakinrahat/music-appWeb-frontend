import Heading from "@/components/ui/heading";
import Container from "./Container";
import Card from "@/components/Card/Card";

interface SingleLineCardContainerInterFace {
  data: Array<any>;
  heading?: string;
  linkText?: string;
  linkRoute?: string | "/";
  children?: string;
  bgGray: boolean;
  singleLine?: boolean;
}

const SingleLineFreelancerCardContainer: React.FC<
  SingleLineCardContainerInterFace
> = ({ data, heading, linkText, linkRoute, singleLine, children, bgGray }) => {
  return (
    <div>
      <Container bgGray={bgGray} className={`${bgGray && ""}`}>
        <Heading
          type="primary"
          heading={heading}
          linkText={linkText}
          route={linkRoute}
        >
          {children}
        </Heading>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 my-10">
          {singleLine
            ? data
                ?.slice(0, 4)
                ?.map((freelancer: any, idx) => (
                  <Card
                    key={idx}
                    freelancerType={freelancer?.freelancerName}
                    freelancerName={freelancer?.freelancerType}
                    rating={freelancer?.rating}
                    imageUrl={freelancer?.imageUrl}
                    artistName={freelancer?.artistName}
                    type={"freelancer"}
                  ></Card>
                ))
            : data?.map((freelancer: any, idx) => (
                <Card
                  key={idx}
                  freelancerType={freelancer?.freelancerName}
                  freelancerName={freelancer?.freelancerType}
                  rating={freelancer?.rating}
                  imageUrl={freelancer?.imageUrl}
                  artistName={freelancer?.artistName}
                  type={"freelancer"}
                ></Card>
              ))}
        </div>
      </Container>
    </div>
  );
};

export default SingleLineFreelancerCardContainer;
