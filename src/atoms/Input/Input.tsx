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
	liconSvg,
	riconSvg,
	iconDimension = 20,
	className = '',
	error = '',
	autoComplete = 'off',
	readOnly = false,
	rows = 3,

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
	liconSvg?: string;
	riconSvg?: string;
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
	const isPassword = type === 'password';
	return (
		<div className='relative mb-5'>
			<div className={`input_wrapper ${error ? 'error' : ''}`}>
				{title && <span className='mb-2 text-sm'>{title}</span>}

				{liconSvg && (
					<Icon
						id={showPassword ? 'show' : liconSvg}
						width={iconDimension}
						height={iconDimension}
						className='licon_pos'
						onClick={() => {
							if (!isPassword) return;
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
						type={showPassword ? 'text' : type}
						name={name}
						value={value}
						placeholder={placeholder}
						onChange={onChange}
						onBlur={onBlur}
						autoComplete={autoComplete}
						readOnly={readOnly}
						className={cx(`input ${className}`, { riconSvg, liconSvg, error })}
						{...inputProps}
					/>
				)}

				{riconSvg && (
					<Icon
						id={showPassword ? 'show' : riconSvg}
						width={iconDimension}
						height={iconDimension}
						className='ricon_pos'
						onClick={() => {
							if (!isPassword) return;
							setShowPassword(!showPassword);
						}}
					/>
				)}
			</div>

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
