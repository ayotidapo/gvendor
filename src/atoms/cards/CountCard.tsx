import { formatCurrency, formatNumber } from '@/helpers';
import React from 'react';
import { Icon } from '../icon/icon';

interface CountCardProps {
	count: number;
	text: string;
	icon?: string;
	isCurrency: boolean;
}

const CountCard: React.FC<CountCardProps> = ({
	count,
	text,
	icon,
	isCurrency,
}) => {
	return (
		<div
			style={{ boxShadow: '0px 0px 50px 5px #00000008' }}
			className='bg-white border border-[#EAEAEA] shadow-sm p-4 rounded-md flex items-center justify-between'
		>
			<div className='space-y-2'>
				<p className='text-sm text-secondary-black'>{text}</p>
				<p className='text-2xl font-normal'>
					{isCurrency ? formatCurrency(count) : formatNumber(count)}
				</p>
			</div>
			{icon !== undefined && (
				<div className='text-gray-200'>
					<Icon id={icon} height={35} width={35} />
				</div>
			)}
		</div>
	);
};

export default CountCard;
