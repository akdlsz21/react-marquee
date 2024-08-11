import React from "react";
import "./styles/index.css";

interface Props extends React.HTMLProps<HTMLDivElement> {
  children: React.ReactNode;
  cb: () => void;
}

function Marquee({ children, cb, ...rest }: Props) {
  return (
    <div {...rest}>
      <div className="marquee-left" onAnimationEnd={cb} style={{}}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

export default Marquee;
