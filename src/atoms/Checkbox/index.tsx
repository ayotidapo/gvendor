import React from 'react';
import './checkbox.scss';

interface Props {
	className?: string;
	title?: string;
}
const Checkbox: React.FC<Props> = props => {
	const { className, title } = props;
	return (
		<label className={`checkbox ${className}`}>
			<input type='checkbox' />
			<span className='checkbox_mirror' />
			<span className='title'>{title}</span>
		</label>
	);
};
export default Checkbox;
