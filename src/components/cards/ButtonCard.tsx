import { formatCurrency, formatNumber } from '@/helpers';
import React from 'react';
import { Icon } from '../icon/icon';
import Button from '../buttons/Button';

interface CountCardProps {
	count: number;
	text: string;
	label: string;
	icon?: string;
	isCurrency: boolean;
}

const CountCard: React.FC<CountCardProps> = ({
	count,
	text,
	icon,
	label,
	isCurrency,
}) => {
	return (
		<div className='bg-off-white border border-[#EAEAEA] shadow-sm p-4 rounded-md flex items-center justify-between'>
			<div className='space-y-2'>
				<p className='text-sm text-secondary-black'>{text}</p>
				<p className='text-2xl font-normal'>
					{isCurrency ? formatCurrency(count) : formatNumber(count)}
				</p>
			</div>
			{icon !== undefined && (
				<div className='text-gray-200'>
					<Icon svg={icon} height={35} width={35} />
				</div>
			)}
			<div>
				<Button label={label} />
			</div>
		</div>
	);
};

export default CountCard;
