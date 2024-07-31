import React from "react";
import "./styles/index.css";

interface Props extends React.HTMLProps<HTMLDivElement> {
  children: React.ReactNode;
}

function Marquee({ children, ...rest }: Props) {
  return (
    <div className="marquee-left" {...rest}>
      {children}
    </div>
  );
}

export default Marquee;
