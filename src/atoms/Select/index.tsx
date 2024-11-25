import React from 'react';
import cx from 'classnames';
interface Option {
	label: string;
	value: string | number;
}

interface SelectProps {
	options: Option[];
	value: string | number;
	onChange: (value: string | number) => void;
	placeholder?: string;
	disabled?: boolean;
	error?: string;
	className?: string;
}

const Select: React.FC<SelectProps> = ({
	options,
	value,
	onChange,
	placeholder,
	disabled,
	className,
	error,
}) => {
	return (
		<div className='input_wrapper'>
			<select
				value={value}
				onChange={e => onChange(e.target.value)}
				disabled={disabled}
				className={cx(`input ${className}`, { err: error })}
			>
				<option value='' disabled>
					{placeholder}
				</option>
				{options.map(option => (
					<option key={option.value} value={option.value}>
						{option.label}
					</option>
				))}
			</select>
			{error && <p className='text-sm text-red-500 mt-1'>{error}</p>}
		</div>
	);
};

export default Select;
