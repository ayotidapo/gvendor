import React from 'react';
import './radio.scss';

interface Props {
	className?: string;
	title?: string;
}
const Radio: React.FC<Props> = props => {
	const { className, title } = props;
	return (
		<label className={`radio ${className}`}>
			<input type='radio' />
			<span className='radio_mirror' />
			<span className='title'>{title}</span>
		</label>
	);
};

export default Radio;
