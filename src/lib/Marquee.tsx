import React from 'react';

interface Props extends React.HTMLProps<HTMLDivElement> {
	children: React.ReactNode;
}

function Marquee({ children, ...rest }: Props) {
	return <div {...rest}>{children}</div>;
}

export default Marquee;
