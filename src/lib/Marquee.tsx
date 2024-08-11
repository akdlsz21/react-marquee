import React, { useCallback, useLayoutEffect, useRef, useState } from "react";
import "./styles/index.css";

interface Props extends React.HTMLProps<HTMLDivElement> {
  children: React.ReactNode;
  cb: () => void;
}

function ExperimentalMarquee({ children, ...rest }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  const [multiplier, setMultiplier] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const [marqueeWidth, setMarqueeWidth] = useState(0);

  console.log(containerWidth, marqueeWidth);

  const calculateWidth = () => {
    console.log(marqueeRef.current, containerRef.current, "asdfasd");
    if (marqueeRef.current && containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const marqueeRect = marqueeRef.current.getBoundingClientRect();
      const containerWidth = containerRect.width;
      const marqueeWidth = marqueeRect.width;
      console.log(containerWidth, marqueeWidth);
      if (containerWidth && marqueeWidth) {
        setMultiplier(
          marqueeWidth < containerWidth
            ? Math.ceil(containerWidth / marqueeWidth) + 1
            : 2
        );
      } else {
        setMultiplier(1);
      }
      console.log(marqueeWidth);
      console.log(containerWidth);
      setContainerWidth(containerWidth);
      setMarqueeWidth(marqueeWidth);
    }
  };

  useLayoutEffect(() => {
    calculateWidth();
  }, []);

  const multiplyChildren = useCallback(
    (multiplier: number) => {
      return [...Array(multiplier >= 0 ? multiplier : 0)].map((_, i) => (
        <div key={i} className="marquee-left" style={{}}>
          {children}
        </div>
      ));
    },
    [children]
  );

  return (
    <div ref={containerRef} {...rest}>
      <div className="marquee-left" ref={marqueeRef} style={{}}>
        {children}
      </div>

      {multiplyChildren(multiplier - 1)}
    </div>
  );
}

export default ExperimentalMarquee;
