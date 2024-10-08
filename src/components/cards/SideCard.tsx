import React from 'react';

interface SideCardProps {
	header: React.ReactNode;
	content: React.ReactNode;
}

const SideCard: React.FC<SideCardProps> = ({ header, content }) => {
	return (
		<div className='bg-off-white rounded-xl p-6'>
            <div>{header}</div>
            <div className='grid grid-flow-row
					grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
					gap-10'>
                <div>
                    {content}
                </div>
                <div>
                    {content}
                </div>
            </div>
		</div>
	);
};

export default SideCard;