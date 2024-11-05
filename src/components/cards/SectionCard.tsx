import React from 'react';

interface SectionCardProps {
	header: React.ReactNode;
	content: React.ReactNode;
}

const SectionCard: React.FC<SectionCardProps> = ({ header, content }) => {
	return (
		<div
			style={{ boxShadow: '0px 0px 50px 5px #00000008' }}
			className='bg-white rounded-xl p-6 border border-divider-gray'
		>
			<div className='mb-6'>{header}</div>
			<div>{content}</div>
		</div>
	);
};

export default SectionCard;
