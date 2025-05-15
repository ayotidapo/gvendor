import React from 'react';
import cx from 'classnames';
import { IOption } from '@/utils/interface';
import { ErrorMessage, Field, useField, useFormik } from 'formik';

interface Props {
	hasError?: boolean;
	name: string;
	options: IOption[];
	className?: string;
	placeholder?: string;
	useFormik?: boolean;
	error?: string;
	value?: string;
	onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Select: React.FC<Props> = props => {
	const {
		name,
		className = '',
		placeholder,
		error = '',
		options,
		useFormik,
		...rest
	} = props;
	const [_, { error: hasError }] = useField(name);
	if (useFormik) {
		return (
			<div className='input__container'>
				<div className={`input_wrapper ${hasError ? 'err' : ''}`}>
					<Field
						name={name}
						as='select'
						className={cx(`input ${className}`, { error: hasError })}
						{...rest}
					>
						<option value=''>{placeholder}</option>
						{options?.map(option => (
							<option key={option.value} value={option.value}>
								{option.label}
							</option>
						))}
					</Field>
					<ErrorMessage name={name} component='div' className='error' />
				</div>
			</div>
		);
	}

	return (
		<div className='input__container'>
			<div className={`input_wrapper ${error ? 'err' : ''}`}>
				<select
					name={name}
					className={cx(`input ${className}`, { error })}
					{...rest}
				>
					<option value=''>{placeholder}</option>
					{options?.map(option => (
						<option key={option.value} value={option.value}>
							{option.label}
						</option>
					))}
				</select>
				<div className='error'>{error}</div>
			</div>
		</div>
	);
};

export default Select;
