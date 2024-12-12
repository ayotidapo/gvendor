import { Icon } from '@/atoms/icon/icon';
import React from 'react';

const PercentGrowth = () => {
	return (
		<div className='flex flex-col translate-y-1'>
			<span className='mt-1 mb-2'>
				<span className='font-medium '>&#8358;</span>21,490,000.00
			</span>
			<span className='text-sm font-thin flex items-center text-[#1b9066]'>
				<Icon id='arrow_up' width={10} height={10} className='mr-1' />
				6% increase in the past week
			</span>
		</div>
	);
};

export default PercentGrowth;
