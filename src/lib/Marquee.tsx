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

	const calculateWidth = () => {
		if (!(marqueeRef.current && containerRef.current)) return;
		const containerWidth = containerRef.current.getBoundingClientRect().width;
		const childrenWidth = marqueeRef.current.getBoundingClientRect().width;
		if (!containerWidth || !childrenWidth) {
			setMultiplier(1);
			return;
		}

		const repititions = Math.ceil(containerWidth / childrenWidth);
		setMultiplier(repititions + 1);
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
		[children],
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
