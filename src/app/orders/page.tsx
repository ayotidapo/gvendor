import React from 'react';
import PageWrapper from '@/containers/PageWrapper';
import { OrderPage } from '@/app/orders/new/OrderPage';

const Order: React.FC = () => {
	return (
		<PageWrapper pageHeader='Orders'>
			<div>
				<OrderPage />
			</div>
		</PageWrapper>
	);
};

export default Order;
