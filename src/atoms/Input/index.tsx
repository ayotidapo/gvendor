'use client';
import { ErrorMessage, Field, useField } from 'formik';

import React, { useState } from 'react';
import cx from 'classnames';
import './input.scss';
import { IOption } from '@/utils/interface';
import { Icon } from '../icon/icon';
import 'react-phone-number-input/style.css';

interface Props {
	name: string;
	onChange?: (e: any) => void;
	type?: string;
	liconSvg?: string;
	riconSvg?: string;
	placeholder?: string;
	as?: 'textarea' | 'select';
	options?: IOption[];
	className?: string;
	rows?: number;
	readOnly?: boolean;
}
const Input: React.FC<Props> = props => {
	const [showPassword, setShowPassword] = useState<boolean>(false);

	const {
		name,
		type = 'text',
		liconSvg,
		riconSvg,
		as,
		placeholder,
		className = '',
		options,
		...rest
	} = props;

	const [_field, { touched, error }] = useField(name);
	const hasError = error && touched;
	const isPassword = type === 'password';
	if (as === 'select') {
		return (
			<div className='relative mb-5'>
				<div className={`input_wrapper ${hasError ? 'err' : ''}`}>
					<Field
						name={name}
						className={cx(`input ${className}`, { error: hasError })}
						as={as}
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
		<div className='relative mb-5'>
			<div className={`input_wrapper ${hasError ? 'err' : ''}`}>
				{liconSvg && (
					<Icon
						id={showPassword ? 'show' : liconSvg}
						className='licon_pos'
						onClick={() => {
							if (!isPassword) return;
							setShowPassword(!showPassword);
						}}
					/>
				)}
				<Field
					name={name}
					className={cx(`input ${className}`, {
						riconSvg,
						liconSvg,
						error: hasError,
					})}
					placeholder={placeholder}
					as={as}
					{...rest}
				/>
				{riconSvg && (
					<Icon
						id={showPassword ? 'show' : riconSvg}
						className='licon_pos'
						onClick={() => {
							if (!isPassword) return;
							setShowPassword(!showPassword);
						}}
					/>
				)}

				<ErrorMessage name={name} component='div' className='error' />
			</div>
		</div>
	);
};

export default Input;
