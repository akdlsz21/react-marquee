import React, { useCallback, useEffect, useRef, useState } from "react";
import "./styles/index.css";

interface Props extends React.HTMLProps<HTMLDivElement> {
  children: React.ReactNode;
  cb: () => void;
}

function ExperimentalMarquee({ children, ...rest }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  const [isMounted, setIsMounted] = useState(false);
  const [multiplier, setMultiplier] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const [marqueeWidth, setMarqueeWidth] = useState(0);

  //   console.log(containerWidth, marqueeWidth);

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
            ? Math.ceil(containerWidth / marqueeWidth)
            : 1
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

  useEffect(() => {
    console.log("first");
    // if (!isMounted) return;
    calculateWidth();
  }, [isMounted]);

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

  //   useEffect(() => {
  //     setIsMounted(true);
  //   }, []);
  console.log(multiplier);
  //   if (!isMounted) return null;
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
