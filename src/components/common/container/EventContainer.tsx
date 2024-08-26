import EventCard from "@/components/Card/EventCard";
import Heading from "@/components/ui/heading";
import React from "react";
import Container from "./Container";

interface EventContainerInterface {
  data: Array<any>;
  heading?: string;
  linkText?: string;
  linkRoute: string | "/";
  children?: string;
  bgGray: boolean;
}
const EventContainer: React.FC<EventContainerInterface> = ({
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
        <div className="flex flex-col justify-between items-center lg:flex-row gap-6 my-10">
          {data?.slice(0, 3).map((event: any, idx) => (
            <EventCard
              key={idx}
              className={""}
              eventRoute={"/"}
              imageUrl={event?.imageUrl}
              isNotify={event?.isNotify}
              title={event?.title}
            ></EventCard>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default EventContainer;
