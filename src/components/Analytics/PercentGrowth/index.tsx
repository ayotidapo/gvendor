import React from 'react';
import { Icon } from '@/atoms/icon/icon';
import './perc-growth.scss';

interface Props {
	amount: string;
	desc?: string;
	className?: string;
}

const PercentGrowth: React.FC<Props> = props => {
	const { amount, desc, className = '' } = props;
	return (
		<div className={`perc_growth ${className}`}>
			<span className='mt-1 mb-2'>{amount?.toLocaleString()}</span>
			<span className='perc_desc'>
				<Icon
					id={desc ? 'arrow_up' : ''}
					width={10}
					height={10}
					className='mr-1'
				/>

				{desc}
			</span>
		</div>
	);
};

export default PercentGrowth;
