import React from 'react';
import { Field } from 'formik';
import './checkbox.scss';

interface Props {
	className?: string;
	title?: string;
	value: string;
	name: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	checked?: boolean;
}
const SimpleCheck: React.FC<Props> = props => {
	const { className, title, ...rest } = props;
	return (
		<label className={`checkbox ${className}`}>
			<input type='checkbox' {...rest} />
			<span className='checkbox_mirror' />
			<span className='title'>{title}</span>
		</label>
	);
};
export default SimpleCheck;

interface ICheck {
	name: string;
	value: string;
	className?: string;
	title?: string;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Checkbox: React.FC<ICheck> = props => {
	const { className, title, ...rest } = props;
	return (
		<label className={`checkbox ${className}`}>
			<Field type='checkbox' {...rest} />
			<span className='checkbox_mirror' />
			<span className='title'>{title}</span>
		</label>
	);
};
