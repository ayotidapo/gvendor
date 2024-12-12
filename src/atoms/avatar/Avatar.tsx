import React from 'react';

interface Props {
	name?: string | undefined;
	image?: string;
}

export const Avatar: React.FC<Props> = ({ image, name }) => {
	let text = '';

	if (name !== undefined) {
		const payload = name?.split(' ');
		text = payload[0].charAt(0) + payload[1].charAt(0);
	}

	return (
		<div
			className='
      h-8 w-8
      rounded-full
      flex items-center justify-center
      bg-black text-white
      text-sm
      '
		>
			{image !== undefined ? (
				<img src={image} alt={name} className='h-full w-full' />
			) : (
				text.toLocaleUpperCase()
			)}
		</div>
	);
};
