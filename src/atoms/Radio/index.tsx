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
	type?: 'radio' | 'checkbox';
}
const Radio: React.FC<Props> = props => {
	const { className = '', type = 'radio', name, value, title, ...rest } = props;
	return (
		<label className={`radio ${className}`}>
			{rest.formik ? (
				<Field
					name={name}
					type={type}
					value={value}
					validate={props.validate}
				/>
			) : (
				<input type={type} value={value} name={name} {...rest} />
			)}
			<span className='radio_mirror' />
			<span className='title'>{title}</span>
		</label>
	);
};

export default Radio;
