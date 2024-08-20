import Heading from "@/components/ui/heading";
import { Url } from "next/dist/shared/lib/router/router";
import React from "react";
import Container from "./Container";
import ConcertsCard from "@/component/Card/ConcertsCard";

interface BlogContainerInterface {
  data: Array<any>;
  heading?: string;
  linkText?: string;
  linkRoute: Url | "/";
  children?: string;
  bgGray: boolean;
}
const BlogContainer: React.FC<BlogContainerInterface> = ({
  data,
  bgGray,
  heading,
  linkRoute,
  linkText,
  children,
}) => {
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

export default BlogContainer;
