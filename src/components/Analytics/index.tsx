import PageWrapper from '@/containers/PageWrapper';
import React from 'react';
import MetricCard from '@/molecules/MetricCard';
import { Icon } from '@/atoms/icon/icon';
import PercentGrowth from './PercentGrowth';
import { SimpleBtn } from '@/atoms/buttons/Button';
import './analytics.scss';

const Analytics = () => {
	return (
		<PageWrapper>
			<div className='analytics'>
				<div className='page-title_div '>
					<h2 className='title'>Analytics</h2>
				</div>
				<div className='period_filter'>
					<SimpleBtn className='active'>1 Day</SimpleBtn>
					<SimpleBtn>1 Week</SimpleBtn>
					<SimpleBtn>1 Month</SimpleBtn>
					<SimpleBtn>3 Monts</SimpleBtn>
					<SimpleBtn>6 Months</SimpleBtn>
					<SimpleBtn>1 Year</SimpleBtn>
					<SimpleBtn>Custom</SimpleBtn>
				</div>
				<section className='metric_cards_wrapper'>
					<MetricCard title='Total Sales' value={<PercentGrowth />} />
					<MetricCard title='Total Orders' value={<PercentGrowth />} />
					<MetricCard title='Total Customers' value={<PercentGrowth />} />
					<MetricCard title='Average Order Value' value={<PercentGrowth />} />
				</section>
				<div className='tabs_div'>
					<SimpleBtn className='active'>Sales (₦)</SimpleBtn>
					<SimpleBtn>Order volume</SimpleBtn>
				</div>
				<section className='graph_div'></section>
				<section className='graph_div'> </section>
			</div>
		</PageWrapper>
	);
};

export default Analytics;
