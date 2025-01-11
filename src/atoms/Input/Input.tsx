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
	className = '',
	error = '',
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

	className?: string;
	error?: string;
	rows?: number;
	autoComplete?: 'off' | 'on';
	readOnly?: boolean;
	extra?: ReactNode;
	autoFocus?: boolean;
}) => {
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const revealPassword = type === 'password' && showPassword;
	return (
		<div className={`input_wrapper ${error ? 'error' : ''}`}>
			{title && <span className='mb-2 text-sm'>{title}</span>}

			{hasIcon && (
				<Icon
					id={revealPassword ? iconSvg : 'show'}
					width={iconDimension}
					height={iconDimension}
					className='icon_pos'
					onClick={() => {
						setShowPassword(!showPassword);
					}}
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
					className={cx(`input ${className}`, { error })}
					rows={rows}
				/>
			) : (
				<input
					type={revealPassword ? 'text' : type}
					name={name}
					value={value}
					placeholder={placeholder}
					onChange={onChange}
					onBlur={onBlur}
					autoComplete={autoComplete}
					readOnly={readOnly}
					className={cx(`input ${className}`, { hasIcon, error })}
					{...inputProps}
				/>
			)}
			{extra && extra}

			{error && (
				<div
					className='
          text-sm text-danger
          block  py-1 font-normal
          '
				>
					{error}
				</div>
			)}
		</div>
	);
};
