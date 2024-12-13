import React from 'react';
import options from '@/utils/nextAuthOptions';
import OrdersPage from '@/components/Orders';
import { getServerSession } from 'next-auth';

const Order: React.FC = () => {
	return <OrdersPage />;
};

export default Order;
