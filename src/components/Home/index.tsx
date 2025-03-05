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

const HomePage: React.FC = () => {
	const {
		orders,
		isSuccess,
		loading,
		totalOrders = '',
		totalSales = '',
	} = useSelector(state => state?.orders);
	const dispatch = useDispatch();

	const router = useRouter();
	const [metrics, setMetrics] = useState<ObjectData>({});

	const path = usePathname();
	const { qString, /*page,*/ status, search } = useApiSearchQuery(5); //will need page later when pagnation is done

	useEffect(() => {
		onGetAllMetrics();
	}, []);

	useEffect(() => {
		dispatch(getOrders(qString));
	}, [qString]);

	const onGetAllMetrics = () => {
		Fetch(`/order/all?status=NEW`).then(r => {
			setMetrics(metrics => ({
				...metrics,
				totalNewOrders: r?.data?.totalOrders,
				totalNewSales: r?.data?.totalSales,
			}));
		});
		Fetch(`/order/all?status=ONGOING`).then(r => {
			setMetrics(metrics => ({
				...metrics,
				totalProcessingOrders: r?.data?.totalOrders,
				totalProcessingSales: r?.data?.totalSales,
			}));
		});
	};

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
						title='Total Sales '
						value={
							<>
								<span className='font-medium'>&#8358;</span>
								{totalSales.toLocaleString()}
							</>
						}
					/>
					<MetricCard
						title='Total Orders '
						value={`${totalOrders.toLocaleString() || 0} Orders`}
					/>
					<MetricCard
						title='New Orders '
						value={`${metrics?.totalNewOrders || 0} orders`}
					/>
					<MetricCard
						title='Processing Orders '
						value={`${metrics?.totalProcessingOrders || 0} orders`}
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
					<h2 className='empty__state'>No Order found</h2>
				)}
				{len > 0 && !loading && (
					<section className='orders_wrapper'>
						{orders.map((order: IOrder, i) => (
							<article
								onClick={() => router.push(`/orders/${order?._id}`)}
								className={`order_card ${orderStatus[order?.status]}`}
								key={i}
							>
								<div className='flex justify-between text-black subpixel-antialiased'>
									Orders #15285057
								</div>
								<div className='my-2'>₦{order?.price.toLocaleString()}</div>
								<span className='text-sm'>5 mins ago</span>
								<hr className='my-5' />
								<div className='flex justify-between text-sm mt-auto mb-5'>
									<span>Order status</span>

									<Tag
										title={orderStatus[status]?.toLowerCase()}
										className='capitalize'
									/>
								</div>
								<SimpleBtn className='set_status'>Set as processing</SimpleBtn>
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
