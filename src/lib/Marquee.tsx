import React from 'react';

interface Props {
	children: React.ReactNode;
}
function Marquee({ children }: Props) {
	return <div>{children}</div>;
}

export default Marquee;
