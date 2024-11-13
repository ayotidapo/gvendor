import { formatCurrency, formatNumber } from '@/helpers';
import React from 'react';
import { Icon } from '../icon/icon';
import { PlusIcon, MinusIcon } from '@heroicons/react/24/outline';

interface PercentageCardProps {
	count: number;
	text: string;
	icon?: string;
	isCurrency: boolean;
	percentageChange?: number;
	percentageText?: string;
}

const PercentageCard: React.FC<PercentageCardProps> = ({
	count,
	text,
	icon,
	isCurrency,
	percentageChange,
	percentageText,
}) => {
	const isIncrease = percentageChange && percentageChange > 0;

	return (
		<div
			style={{ boxShadow: '0px 0px 50px 5px #00000008' }}
			className='bg-white border-[0.5px] border-[#EAEAEA] p-4 rounded-md flex items-center justify-between'
		>
			<div className='space-y-2'>
				<p className='text-sm text-secondary-black'>{text}</p>
				<p className='text-2xl font-normal'>
					{isCurrency ? formatCurrency(count) : formatNumber(count)}
				</p>
				{percentageChange !== undefined && (
					<div className='flex items-center text-sm'>
						{isIncrease ? (
							<PlusIcon className='w-4 h-4 text-green-500' />
						) : (
							<MinusIcon className='w-4 h-4 text-red-500' />
						)}
						<span
							className={`ml-1 ${isIncrease ? 'text-green-500' : 'text-red-500'}`}
						>
							{Math.abs(percentageChange)}%
						</span>
						<span className='ml-1 text-gray-500'>{percentageText}</span>
					</div>
				)}
			</div>
			{icon !== undefined && (
				<div className='text-gray-200'>
					<Icon svg={icon} height={35} width={35} />
				</div>
			)}
		</div>
	);
};

export default PercentageCard;
