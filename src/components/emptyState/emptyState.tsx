import { LucideCircleSlashed } from 'lucide-react';
import React from 'react';

export const EmptyState: React.FC<{ text?: string }> = ({
	text = 'Nothing to see',
}) => {
	return (
		<div
			className='
            flex flex-col gap-4
            items-center justify-center
            w-full my-10
            text-sec-black
          '
		>
			<div>
				<LucideCircleSlashed size={56} />
			</div>

			<div className='font-medium'>{text}</div>
		</div>
	);
};
