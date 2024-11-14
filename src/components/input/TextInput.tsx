'use client';
import React, { FC, useState } from 'react';

import { Icon } from '../icon/icon';

interface TextProps {
	type: string;
	name: string;
	placeholder?: string;
	extraClass?: string;
	value?: string | string[];
	errors?: string;
	id?: string;
	required?: boolean;
	onChange?: (
		e:
			| React.ChangeEvent<HTMLInputElement>
			| React.ChangeEvent<HTMLTextAreaElement>
	) => void;
	onBlur?: (
		e:
			| React.FocusEvent<HTMLInputElement>
			| React.ChangeEvent<HTMLTextAreaElement>
	) => void;
	disabled?: boolean;
	pattern?: string;
	title?: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	props?: any;
}

const TextInput: FC<TextProps> = ({
	type,
	name,
	placeholder,
	extraClass,
	value,
	onChange,
	id,
	onBlur,
	errors,
	required,
	disabled,
	pattern,
	title,
	...props
}) => {
	const [showText, setShowText] = useState<boolean>(false);

	const className = `
	block w-full ${type !== 'textarea' && 'h-12 sm:h-14'}
	${type === 'textarea' && 'py-4'}
	rounded-md border-0
	py-2 px-4 text-gray-900 shadow-sm ring-inset
	ring-default-gray placeholder:text-gray-400
	ring-1 focus:ring-inset focus:ring-dark-gray
	text-sm sm:text-base sm:leading-6 resize-none ${extraClass}
	`;
	console.log({ value });
	return (
		<div className='relative'>
			{type === 'textarea' ? (
				<textarea
					id={id}
					name={name}
					value={value}
					className={`${className} ${errors && 'focus:ring-red ring-red'}`}
					placeholder={placeholder}
					rows={5}
					onChange={onChange}
					onBlur={onBlur}
					disabled={disabled}
				/>
			) : (
				<input
					id={id}
					type={showText ? 'text' : (type ?? 'text')}
					name={name}
					value={value}
					className={`${className} ${errors && 'focus:ring-red ring-red'}`}
					placeholder={placeholder}
					onChange={onChange}
					onBlur={onBlur}
					required={required}
					disabled={disabled}
					pattern={pattern}
					title={title}
					{...props}
				/>
			)}
			{type === 'password' && (
				<Icon
					onClick={() => setShowText(!showText)}
					className='absolute right-4 top-[30%] cursor-pointer'
					svg={showText ? 'hide' : 'show'}
				/>
			)}

			{errors && <div className={`text-red text-xs mt-2 pl-2 `}>{errors}</div>}
		</div>
	);
};

export default TextInput;
