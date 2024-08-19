import React from "react";

const Section: React.FunctionComponent<any> = ({ children, className }) => {
  return (
    <section className={`container my-20 ${className}`}>{children}</section>
  );
};

export default Section;
