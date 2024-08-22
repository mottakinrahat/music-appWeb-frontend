import Heading from "@/components/ui/heading";
import { Url } from "next/dist/shared/lib/router/router";
import React from "react";
import Container from "./Container";
import ConcertsCard from "@/components/Card/ConcertsCard";
import BlogCard from "@/components/Card/BlogCard";

interface BlogContainerInterface {
  data: Array<any>;
  heading?: string;
  linkText?: string;
  linkRoute: Url | "/";
  children?: string;
  bgGray: boolean;
}
const BlogContainer: React.FC<BlogContainerInterface> = ({ data, bgGray, heading, linkRoute, linkText, children }) => {
  return (
    <div>
      <Container bgGray={bgGray} className={`${bgGray && ""}`}>
        <Heading type="primary" heading={heading} linkText={linkText} route={linkRoute}>
          {children}
        </Heading>
        <div className="grid grid-cols-4 gap-6 mt-10">
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

export default BlogContainer;
