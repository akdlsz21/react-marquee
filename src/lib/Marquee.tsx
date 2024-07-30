import React from "react";

interface Props {
  children: React.ReactNode;
}
function Marquee({ children }: Props) {
  return <div style={{ outline: "2px solid red" }}>{children}</div>;
}

export default Marquee;
