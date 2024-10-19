import Heading from "@/components/ui/heading";

import React from "react";
import Container from "./Container";
import BlogCard from "@/components/Card/BlogCard";

interface BlogContainerInterface {
  data: Array<any>;
  heading?: string;
  linkText?: string;
  linkRoute: string;
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
      <Container bgGray={bgGray} className={`${bgGray && ""}`}>
        <Heading
          type="primary"
          heading={heading}
          linkText={linkText}
          route={linkRoute}
        >
          {children}
        </Heading>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
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
