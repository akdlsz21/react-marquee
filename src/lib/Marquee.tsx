import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import "./marquee.css";

interface Props extends React.HTMLProps<HTMLDivElement> {
  speed?: number;
  cb: () => void;
  children: React.ReactNode;
}

function Marquee({ speed = 50, children, ...rest }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const childrenRef = useRef<HTMLDivElement>(null);

  const [childrenWidth, setChildrenWidth] = useState(0);
  const [multiplier, setMultiplier] = useState(0);

  const calculateWidth = useCallback(() => {
    if (!(childrenRef.current && containerRef.current)) return;
    const containerWidth = containerRef.current.getBoundingClientRect().width;
    const childrenWidth = childrenRef.current.getBoundingClientRect().width;
    if (!containerWidth || !childrenWidth) {
      setMultiplier(1);
      return;
    }

    const repititions = Math.ceil(containerWidth / childrenWidth);
    setMultiplier(repititions);
    setChildrenWidth(childrenWidth);
  }, []);

  useLayoutEffect(() => {
    calculateWidth();
  }, [calculateWidth]);

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => calculateWidth());
    if (!containerRef.current) return;
    resizeObserver.observe(containerRef.current);
    return () => {
      resizeObserver.disconnect();
    };
  }, [calculateWidth]);

  useEffect(() => {
    calculateWidth();
  }, [calculateWidth, children]);

  const duration = useMemo(() => {
    return (childrenWidth * multiplier) / speed;
  }, [childrenWidth, multiplier, speed]);

  const multiplyChildren = useCallback(
    (multiplier: number) => {
      return [...Array(multiplier >= 0 ? multiplier : 0)].map((_, i) => (
        <div key={i} className="marquee-children">
          {children}
        </div>
      ));
    },
    [children]
  );

  return (
    <div ref={containerRef} {...rest}>
      <div
        className="marquee-left"
        style={{ animationDuration: `${duration}s` }}
      >
        <div className="marquee-children" ref={childrenRef}>
          {children}
        </div>
        {multiplyChildren(multiplier - 1)}
      </div>
      <div
        className="marquee-left"
        style={{ animationDuration: `${duration}s` }}
      >
        {multiplyChildren(multiplier)}
      </div>
    </div>
  );
}

export default Marquee;
