'use client';

import React, { ChangeEvent, ReactNode, useState } from 'react';
import cx from 'classnames';
import { Icon } from '../icon/icon';
import './input.scss';

export const Input = ({
	type,
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
	const revealPassword = type === 'password' && showPassword;
	return (
		<div className={`input_wrapper ${errors ? 'err' : ''}`}>
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
					className={cx(`input ${className}`, { hasIcon, err: errors })}
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
					className={cx(`input ${className}`, { hasIcon, err: errors })}
					{...inputProps}
				/>
			)}
			{extra && extra}

			{errors && (
				<div
					className='
          text-sm text-danger
          block  py-1 font-normal
          '
				>
					{errors}
				</div>
			)}
		</div>
	);
};
