import React, { CSSProperties } from "react";

interface SectionInterface {
  children?: React.ReactNode;
  className?: string;
  props?: any;
  bgGray?: boolean;
  style?: CSSProperties;
}

const Container: React.FunctionComponent<SectionInterface> = ({
  children,
  className,
  props,
  bgGray,
  style,
}) => {
  return (
    <section
      style={style ? style : {}}
      className={`${bgGray ? "bg-section" : ""}`}
    >
      <div {...props} className={`container my-20 ${className}`}>
        {children}
      </div>
    </section>
  );
};

export default Container;
