import React, { ReactNode } from 'react';

export const CountCardContainer: React.FC<{
	children: ReactNode;
	className?: string;
}> = ({ children, className }) => {
	return (
		<div
			className={`
            grid grid-flow-row 
            grid-cols-[repeat(auto-fit,_minmax(302px,1fr))]
            gap-5 my-10
            ${className}
            `}
		>
			{children}
		</div>
	);
};
