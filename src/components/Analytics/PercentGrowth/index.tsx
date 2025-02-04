import { Icon } from '@/atoms/icon/icon';
import React from 'react';

interface Props {
	amount: string;
	desc?: string;
}
const PercentGrowth: React.FC<Props> = props => {
	return (
		<div className='flex flex-col translate-y-1'>
			<span className='mt-1 mb-2'>{props.amount?.toLocaleString()}</span>
			<span className='text-sm font-thin flex items-center text-[#1b9066]'>
				<Icon
					id={props.desc ? 'arrow_up' : ''}
					width={10}
					height={10}
					className='mr-1'
				/>

				{props.desc}
			</span>
		</div>
	);
};

export default PercentGrowth;
