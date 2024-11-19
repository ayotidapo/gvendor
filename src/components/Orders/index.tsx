import { SimpleBtn } from '@/atoms/buttons/Button';
import { Icon } from '@/atoms/icon/icon';
import { Input } from '@/atoms/input/Input';
import PageWrapper from '@/containers/PageWrapper';
import MetricCard from '@/molecules/MetricCard';
import React from 'react';
import './orders.scss';
import OrdersTable from './OrdersTable';

const Orders = () => {
	return (
		<PageWrapper>
			<div className='orders'>
				<div className='page-title_div '>
					<h2 className='title'>Orders</h2>
				</div>
				<section className='metric_cards_wrapper'>
					<MetricCard title='Total Orders' value='4 Orders' />
					<MetricCard
						title='Average Order value'
						value={
							<>
								<span className='font-medium'>&#8358;</span>107,267.00
							</>
						}
					/>
				</section>
				<div className='filter_div'>
					<Input
						name=''
						hasIcon
						iconSvg='search'
						className='search'
						placeholder='Search'
					/>
					<SimpleBtn className='filter'>
						<Icon id='sortp' className='mr-2' />
						<span>Sort by: Processing</span>
					</SimpleBtn>
				</div>
				<section>
					<OrdersTable />
				</section>
			</div>
		</PageWrapper>
	);
};

export default Orders;
