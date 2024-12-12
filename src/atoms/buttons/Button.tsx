import { Gilroy } from '@/fonts/font';
import clsx from 'clsx';
import React, { FC } from 'react';
import { Icon } from '../icon/icon';
import './button.scss';
import {
	ArrowDown,
	ChevronDown,
	ListFilter,
	CircleHelp,
	ArrowRight,
} from 'lucide-react';
import classNames from 'classnames';

type ButtonProps = {
	label: string;
	additionalClass?: string;
	arrow?: boolean;
	svg?: string;
	type?: 'button' | 'submit' | 'reset' | undefined;
	name?: 'primary' | 'inverted' | 'outline' | 'transparent' | 'delete';
	loading?: boolean;
	spinColor?: string;
	small?: boolean;
	disabled?: boolean;
	onClick?: () => void;
	filter?: boolean;
	download?: boolean;
	question?: boolean;
	right?: boolean;
	href?: string;
};

const Button: FC<ButtonProps> = ({
	label,
	arrow,
	question,
	right,
	type = 'button',
	onClick,
	additionalClass,
	disabled,
	name = 'primary',
	small = false,
	filter = false,
	download = false,
	href,
	loading,
}) => {
	const buttonContent = (
		<>
			{download && <ArrowDown width={24} />}
			{filter && <ListFilter width={24} />}
			{label}
			{arrow && (
				<span className=''>
					<ChevronDown width={24} />
				</span>
			)}
			{right && <ArrowRight width={24} />}
			{question && <CircleHelp width={15} />}
		</>
	);

	const buttonClasses = clsx(
		'w-full rounded-md flex gap-2 justify-center items-center relative px-3 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300 active:scale-95',
		{
			'bg-red text-white': name === 'delete',
			'bg-black text-white': name === 'primary',
			'bg-white text-secondary-black shadow-lg': name === 'inverted',
			'bg-transparent text-black': name === 'outline',
			'text-sm py-2': small,
			'py-3': !small,
			'border border-gray-100': name === 'inverted',
			'outline outline-1': name === 'outline',
			'opacity-10': disabled,
			'bg-transparent text-black border-black': name === 'transparent',
		},
		additionalClass
	);

	if (href) {
		return (
			<a href={href} className={buttonClasses}>
				{buttonContent}
			</a>
		);
	}

	return (
		<button
			type={type}
			onClick={onClick}
			disabled={disabled || loading}
			className={buttonClasses}
		>
			{buttonContent}
		</button>
	);
};

export const LinkButton: FC<ButtonProps> = ({
	label,
	arrow,
	additionalClass,
	onClick,
}) => {
	return (
		<button
			onClick={onClick}
			className={`bg-transparent underline text-dark-gray ${Gilroy.className} ${additionalClass}`}
		>
			{label}
			{arrow && (
				<span className='ml-1 mt-[0.4rem]'>
					<Icon width={8} height={13} svg='right-arrow' />
				</span>
			)}
		</button>
	);
};

interface Props {
	children: React.ReactNode;
	type?: 'submit' | 'button' | 'reset';
	onClick?: () => void;
	className?: string;
	disabled?: boolean;
}

export const SimpleBtn: React.FC<Props> = props => {
	const { type = 'submit', className = '', ...rest } = props;
	return (
		<button type={type} className={`btn ${className}`} {...rest}>
			{props.children}
		</button>
	);
};

export default Button;
