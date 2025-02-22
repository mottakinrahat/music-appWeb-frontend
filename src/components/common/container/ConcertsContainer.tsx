import Heading from "@/components/ui/heading";
import React from "react";
import Container from "./Container";
import ConcertsCard from "@/components/Card/ConcertsCard";

interface ConcertContainerInterface {
  data: Array<any>;
  heading?: string;
  linkText?: string;
  linkRoute: string;
  children?: string;
  bgGray: boolean;
}
const ConcertsContainer: React.FC<ConcertContainerInterface> = ({
  data,
  bgGray,
  heading,
  linkRoute,
  linkText,
  children,
}) => {
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 my-10">
          {data.map((event: any, idx) => (
            <ConcertsCard
              key={idx}
              className={""}
              eventRoute={"/"}
              imageUrl={event?.imageUrl}
              isNotify={event?.isNotify}
              title={event?.title}
            ></ConcertsCard>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default ConcertsContainer;
