import './toggle.scss';

import React from 'react';

interface Props {
	name: string;
	value: string;
	checked?: boolean;
	defaultChecked?: boolean;
	disabled?: boolean;
	fieldName?: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const Toggle: React.FC<Props> = props => {
	const { name, value, ...rest } = props;
	return (
		<label className='toggle_wrapper'>
			<input type='checkbox' value={value} className='check' {...rest} />
			<div className='toggle'>
				<span className='indicator' />
			</div>
		</label>
	);
};

export default Toggle;
