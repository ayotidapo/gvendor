import React from 'react';
import { Icon } from '@/atoms/icon/icon';
import './metric.scss';

interface Props {
	title: string;
	value: string | React.ReactNode;
	iconDesc?: string;
	loading?: boolean;
}

const MetricCard: React.FC<Props> = props => {
	const loadingText = (
		<em className='text-[10px] font-extralight'>loading...</em>
	);
	const { title, value, iconDesc, loading } = props;
	return (
		<article className='order_metric_card'>
			<div className='flex justify-between text-baseCol'>
				{title}
				<span className='info' data-desc={iconDesc}>
					<Icon id='info' height={24} width={24} />
				</span>
			</div>
			<div className='text-black text-2xl font-geist font-semibold'>
				{loading ? loadingText : value}
			</div>
		</article>
	);
};

export default MetricCard;
