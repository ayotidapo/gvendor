import React from 'react';
import { Icon } from '@/atoms/icon/icon';
import './metric.scss';

interface Props {
	title: string;
	value: string | React.ReactNode;
	iconDesc?: string;
}

const MetricCard: React.FC<Props> = props => {
	const { title, value, iconDesc } = props;
	return (
		<article className='order_metric_card'>
			<div className='flex justify-between text-baseCol'>
				{title}
				<span className='info' data-desc={iconDesc}>
					<Icon id='info' height={24} width={24} />
				</span>
			</div>
			<div className='text-black text-2xl font-geist font-semibold'>
				{value}
			</div>
		</article>
	);
};

export default MetricCard;
