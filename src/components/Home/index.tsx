'use client';

import React, { useEffect, useMemo, useState } from 'react';
import './home.scss';

import { Icon } from '@/atoms/icon/icon';
import { Input } from '@/atoms/Input/Input';
import { SimpleBtn } from '@/atoms/buttons/Button';
import MetricCard from '@/molecules/MetricCard';
import Tag from '@/atoms/Tag';
import Link from 'next/link';
import { useDispatch, useSelector } from '@/redux/hooks';
import { usePathname, useRouter } from 'next/navigation';
import { getOrders } from '@/redux/apis/orders';
import { orderStages, orderStatus } from '@/utils/data';

import Fetch from '@/utils/fetch';
import { ObjectData } from '@/utils/interface';
import LoadingPage from '@/molecules/LoadingPage';

import useApiSearchQuery from '@/customHooks/useApiSearchQuery';
import StatusFilter from '../../molecules/StatusFilter';
import SearchFilter from '@/molecules/SearchFilter';
import { IOrder } from '@/redux/reducers/orders';
import { toast } from 'react-toastify';
import { getSettlements, getSettlementsApi } from '@/redux/apis/settlements';
import Spinner from '@/atoms/spinner/Spinner';

interface Props {
	metrics: ObjectData;
}
const HomePage: React.FC<Props> = props => {
	const {
		orders,
		loading,
		totalOrders = '',
		totalSales = '',
	} = useSelector(state => state?.orders);

	const dispatch = useDispatch();

	const router = useRouter();
	const {
		totalRevenue,
		totalNewOrders,
		totalProcessingOrders,
		totalViewed,
		itemsSold,
	} = props.metrics;

	const path = usePathname();
	const { qString, /*page,*/ status, search } = useApiSearchQuery(5); //will need page later when pagnation is done

	useEffect(() => {
		dispatch(getOrders(qString));
	}, [qString]);

	const onTextChange = (searchValue: string) => {
		router.push(`${path}?status=${status}&page=1&search=${searchValue}`);
	};

	const onSetStatus = (status: string) => {
		router.push(`${path}?status=${status}&page=1&search=${search}`);
	};

	const len = orders?.length;

	return (
		<>
			<div className='homepage'>
				<div className='page-title_div '>
					<h2 className='title'>Home</h2>
				</div>
				<section className='metric_cards_wrapper'>
					<MetricCard
						iconDesc='Amount paid to your account after Good’s commission is deducted.'
						title='Total Settled Amount'
						value={
							<>
								<span className='font-medium'>&#8358;</span>
								{totalRevenue?.toLocaleString()}
							</>
						}
					/>
					<MetricCard
						title='Total Orders'
						iconDesc='Number of completed sales.'
						loading={loading}
						value={`${totalOrders?.toLocaleString() || 0} Orders`}
					/>
					<MetricCard
						title='Completed Orders'
						iconDesc='Total number of customer orders that have been successfully fulfilled.'
						value={`${totalNewOrders || 0} orders`}
					/>
					<MetricCard
						title='Processing Orders'
						iconDesc='Orders that are currently being prepared or are awaiting fulfillment.'
						value={`${totalProcessingOrders || 0} orders`}
					/>
				</section>

				<section className='metric_cards_wrapper autofit mt-8 '>
					<MetricCard
						iconDesc='Most viewed by customers. Shows high interest or demand.'
						title='Total Viewed Products'
						value={`${totalViewed?.toLocaleString() || 0} Items`}
					/>
					<MetricCard
						title='Active Product'
						iconDesc='Product bought by customers.'
						value={`${itemsSold?.toLocaleString() || 0} Items`}
					/>
				</section>

				<div className='filter_div'>
					<span className='text-xl subpixel-antialiased flex-1 text-black'>
						Recent Orders
					</span>
					<SearchFilter onTextChange={onTextChange} />
					<StatusFilter
						onSetStatus={onSetStatus}
						status={orderStatus[status]}
						states={orderStages}
					/>
				</div>
				{loading && <LoadingPage className='py-5 ' />}
				{len < 1 && !loading && (
					<h2 className='empty__state'>You haven't received any orders</h2>
				)}
				{len > 0 && !loading && (
					<section className='orders_wrapper'>
						{orders.slice(0, 5).map((order: IOrder, i) => (
							<article
								onClick={() => router.push(`/orders/${order?._id}`)}
								className={`order_card ${orderStatus[order?.status]}`}
								key={i}
							>
								<div className='flex justify-between text-black subpixel-antialiased'>
									#{order?.orderNumber}
								</div>
								<div className='my-2'>
									₦{order?.totalAmount?.toLocaleString()}
								</div>
								<span className='text-sm'>{order?.timeAgo}`</span>
								<hr className='my-5' />
								<div className='flex justify-between text-sm mt-auto mb-5'>
									<span>Order status</span>

									<Tag
										title={(
											orderStatus[order?.status] || order?.status
										)?.toLowerCase()}
									/>
								</div>
								<SimpleBtn className='set_status' disabled>
									.{/* Set as processing */}
								</SimpleBtn>
							</article>
						))}
					</section>
				)}
			</div>
			{len > 0 && (
				<div className='text-base my-4 flex justify-center text-black'>
					<Link href='/orders' className='inline-flex items-center'>
						See more{' '}
						<Icon id='caret-right' width={15} height={15} className='ml-1' />
					</Link>
				</div>
			)}
		</>
	);
};

export default HomePage;
