import React from 'react';
import { Icon } from '@/atoms/icon/icon';
import './metric.scss';

interface Props {
	title: string;
	value: string | React.ReactNode;
}

const MetricCard: React.FC<Props> = props => {
	const { title, value } = props;
	return (
		<article className='order_metric_card'>
			<div className='flex justify-between text-baseCol'>
				{title}
				<Icon
					id='info'
					height={24}
					width={24}
					className='hover:cursor-pointer'
				/>
			</div>
			<span className='text-black text-2xl font-geist font-semibold'>
				{value}
			</span>
		</article>
	);
};

export default MetricCard;
