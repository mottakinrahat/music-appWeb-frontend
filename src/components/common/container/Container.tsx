import React from "react";

interface SectionInterface {
  children?: React.ReactNode;
  className?: string;
  props?: any;
  bgGray?: boolean;
}

const Container: React.FunctionComponent<SectionInterface> = ({
  children,
  className,
  props,
  bgGray,
}) => {
  return (
    <section className={`${bgGray ? "bg-section" : ""}`}>
      <div {...props} className={`container my-20 ${className}`}>
        {children}
      </div>
    </section>
  );
};

export default Container;
