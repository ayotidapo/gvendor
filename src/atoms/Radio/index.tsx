import React from 'react';
import './radio.scss';
import { Field } from 'formik';

interface Props {
	className?: string;
	title?: string;
	value?: string;
	name: string;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	checked?: boolean;
	validate?: (val: string) => void;
	formik?: boolean;
}
const Radio: React.FC<Props> = props => {
	const { className = '', name, value, title, formik, ...rest } = props;
	return (
		<label className={`radio ${className}`}>
			{formik ? (
				<Field
					name={name}
					type='radio'
					value={value}
					validate={props.validate}
				/>
			) : (
				<input type='radio' value={value} name={name} {...rest} />
			)}
			<span className='radio_mirror' />
			<span className='title'>{title}</span>
		</label>
	);
};

export default Radio;
