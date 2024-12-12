import React from 'react';
import cx from 'classnames';
import { IOption } from '@/utils/interface';

interface Props {
	hasError?: boolean;
	name: string;
	options: IOption[];
	className?: string;
	placeholder?: string;
	error?: string;
	value?: string;
	onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Select: React.FC<Props> = props => {
	const {
		hasError,
		name,
		className = '',
		placeholder,
		error = '',
		options,
		...rest
	} = props;
	return (
		<div className={`input_wrapper ${hasError ? 'err' : ''}`}>
			<select
				name={name}
				className={cx(`input ${className}`, { error: hasError })}
				{...rest}
			>
				<option value=''>{placeholder}</option>
				{props.options?.map(option => (
					<option key={option.value} value={option.value}>
						{option.label}
					</option>
				))}
			</select>
			<div className='error'>{error}</div>
		</div>
	);
};

export default Select;
