'use client';
import { ErrorMessage, Field, FieldProps, useField } from 'formik';
import PhoneInput from 'react-phone-number-input';
import React, { useState } from 'react';
import cx from 'classnames';
import './input.scss';
import { IOption } from '@/utils/interface';
import { Icon } from '../icon/icon';
import 'react-phone-number-input/style.css';

interface Props {
	name: string;
	onChange?: () => null;
	type?: string;
	iconSvg?: string;
	placeholder?: string;
	as?: 'textarea' | 'select';
	options?: IOption[];
	className?: string;
	rows?: number;
}
const Input: React.FC<Props> = props => {
	const [showPassword, setShowPassword] = useState<boolean>(false);

	const {
		name,
		type = 'text',
		iconSvg,
		as,
		placeholder,
		className = '',
		options,
		...rest
	} = props;

	const [_field, { touched, error }] = useField(name);
	const hasError = error && touched;
	const revealPassword = type === 'password' && showPassword;

	if (as === 'select') {
		return (
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
		);
	}
	return (
		<div className={`input_wrapper ${hasError ? 'err' : ''}`}>
			{iconSvg && (
				<Icon
					id={revealPassword ? iconSvg : 'show'}
					className='icon_pos'
					onClick={() => {
						setShowPassword(!showPassword);
					}}
				/>
			)}
			<Field
				name={name}
				className={cx(`input ${className}`, { iconSvg, error: hasError })}
				placeholder={placeholder}
				as={as}
				{...rest}
			/>
			<ErrorMessage name={name} component='div' className='error' />
		</div>
	);
};

export default Input;

interface IPProps extends FieldProps {
	onChange: () => void;
	onBlur: (e: React.FocusEvent<HTMLElement, Element>) => void;
	placeholder?: string;
	className?: string;
	error?: string;
}

const InputPhone: React.FC<IPProps> = ({
	field,
	form,
	error,
	onChange,
	onBlur,
	...props
}) => {
	console.log(field, 'po', onChange);
	return (
		<div className={`w-full ${error ? 'error_' : ''}`}>
			<PhoneInput
				defaultCountry='NG'
				value={field.value}
				name={field.name}
				onChange={onChange}
				onBlur={onBlur}
				international
				{...props}
			/>
			<ErrorMessage name={field.name} component='div' className='error' />
		</div>
	);
};

type PFProps = FieldProps['field'] & {
	className?: string;
	defaultCountry?: string;
	onChange: (val: any) => void;
	onBlur: (e: React.FocusEvent<HTMLElement, Element>) => void;
	placeholder?: string;
	error?: string;
};

const PhoneField: React.FC<PFProps> = ({ onChange, value, ...rest }) => {
	return (
		<Field
			component={InputPhone}
			onChange={(val: any) => onChange(val)}
			value={value}
			{...rest}
		/>
	);
};

export { PhoneField };
