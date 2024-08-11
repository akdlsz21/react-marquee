import React, { useCallback, useEffect, useRef, useState } from "react";
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

  const calculateWidth = useCallback(() => {
    if (marqueeRef.current && containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const marqueeRect = marqueeRef.current.getBoundingClientRect();
      const containerWidth = containerRect.width;
      const marqueeWidth = marqueeRect.width;

      if (containerWidth && marqueeWidth) {
        setMultiplier(
          marqueeWidth < containerWidth
            ? Math.ceil(containerWidth / marqueeWidth)
            : 1
        );
      } else {
        setMultiplier(1);
      }
      console.log(marqueeWidth);
      setContainerWidth(containerWidth);
      setMarqueeWidth(marqueeWidth);
    }
  }, [containerRef]);

  useEffect(() => {
    calculateWidth();
  }, [calculateWidth, children]);

  const multiplyChildren = useCallback(
    (multiplier: number) => {
      return [...Array(multiplier >= 0 ? multiplier : 0)].map((_, i) => (
        <div key={i} className="marquee-left" ref={marqueeRef} style={{}}>
          {children}
        </div>
      ));
    },
    [children]
  );

  return (
    <div ref={containerRef} {...rest}>
      {multiplyChildren(multiplier)}
    </div>
  );
}

export default ExperimentalMarquee;
