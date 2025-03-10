import { ChangeEvent, FC, ReactNode } from 'react';

export interface CheckProps {
	type?: string;
	name: string;
	checked?: boolean;
	label: ReactNode;
	reverse?: boolean;
	onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
	extraClass?: string;
}

const CheckboxInput: FC<CheckProps> = ({
	name,
	label,
	checked,
	onChange,
	extraClass,
	reverse = false,
	type = 'checkbox',
}) => {
	return (
		<div
			className={`relative flex items-start ${reverse && 'flex-row-reverse'} ${extraClass}`}
		>
			<div className='flex h-6 items-center'>
				<input
					onChange={onChange}
					checked={checked}
					name={name}
					type={type}
					className='h-4 w-4 rounded border-dark-gray text-primary text-dark-gray focus:ring-dark-gray'
				/>
			</div>
			<div className={`${reverse ? 'mr-2' : 'ml-3'} text-sm leading-6`}>
				<label htmlFor={name} className=' text-gray-900'>
					{label}
				</label>
			</div>
		</div>
	);
};

export default CheckboxInput;
