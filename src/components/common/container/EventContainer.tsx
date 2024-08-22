import EventCard from "@/component/Card/EventCard";
import Heading from "@/components/ui/heading";
import { Url } from "next/dist/shared/lib/router/router";
import React from "react";
import Container from "./Container";

interface EventContainerInterface {
  data: Array<any>;
  heading?: string;
  linkText?: string;
  linkRoute: Url | "/";
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
        <div className="grid grid-cols-3 gap-6 my-10">
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
