'use client';

import React, { ChangeEvent, ReactNode, useState } from 'react';
import cx from 'classnames';
import { Icon } from '../icon/icon';
import './input.scss';

export const Input = ({
	type = 'text',
	title = '',
	name,
	value = '',
	placeholder,
	onChange,
	onBlur = () => {},
	hasIcon,
	iconSvg = '',
	iconDimension = 20,
	inputClass = '',
	className = '',
	errors = '',
	autoComplete = 'off',
	readOnly = false,
	rows = 3,
	extra,
	...inputProps
}: {
	type?: string;
	title?: string;
	name: string;
	value?: string;
	placeholder?: string;
	onChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
	onBlur?: (
		e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
	) => void;
	hasIcon?: boolean;
	iconSvg?: string;
	iconDimension?: number;
	inputClass?: string;
	className?: string;
	errors?: string;
	rows?: number;
	autoComplete?: 'off' | 'on';
	readOnly?: boolean;
	extra?: ReactNode;
	autoFocus?: boolean;
}) => {
	const [showPassword, setShowPassword] = useState<boolean>(false);

	return (
		<div className='input_wrapper'>
			{title && <span className='mb-2 text-sm'>{title}</span>}

			{hasIcon && (
				<Icon
					id={iconSvg}
					width={iconDimension}
					height={iconDimension}
					className='min-w-fit absolute left-4'
				/>
			)}
			{type === 'textarea' ? (
				<textarea
					name={name}
					value={value}
					placeholder={placeholder}
					onChange={onChange}
					onBlur={onBlur}
					autoComplete={autoComplete}
					readOnly={readOnly}
					className={cx(`input ${className}`, { hasIcon })}
					rows={rows}
				/>
			) : (
				<input
					type={type === 'password' && showPassword ? 'text' : type}
					name={name}
					value={value}
					placeholder={placeholder}
					onChange={onChange}
					onBlur={onBlur}
					autoComplete={autoComplete}
					readOnly={readOnly}
					className={cx(`input ${className}`, { hasIcon })}
					{...inputProps}
				/>
			)}
			{extra && extra}
			{type === 'password' && (
				<button
					onClick={() => {
						setShowPassword(!showPassword);
					}}
					type='button'
				>
					<Icon
						id={showPassword ? 'hide' : 'show'}
						width={24}
						height={24}
						className='min-w-fit'
					/>
				</button>
			)}

			{errors && (
				<span
					className='
          text-sm text-danger
          block p-2 font-normal
          '
				>
					{errors}
				</span>
			)}
		</div>
	);
};
