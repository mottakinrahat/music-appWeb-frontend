import Heading from "@/components/ui/heading";
import { Url } from "next/dist/shared/lib/router/router";
import React from "react";
import Container from "./Container";
import BlogCard from "@/component/Card/BlogCard";

interface ConcertContainerInterface {
  data: Array<any>;
  heading?: string;
  linkText?: string;
  linkRoute: Url | "/";
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
          {data?.slice(0, 4).map((blog: any, idx) => (
            <BlogCard
              description={blog?.description}
              type={blog?.type}
              key={idx}
              className={""}
              blogRoute={"/"}
              imageUrl={blog?.imageUrl}
              title={blog?.title}
            ></BlogCard>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default ConcertsContainer;
