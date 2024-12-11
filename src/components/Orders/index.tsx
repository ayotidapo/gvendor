'use client';
import { SimpleBtn } from '@/atoms/buttons/Button';
import { Icon } from '@/atoms/icon/icon';
import { Input } from '@/atoms/Input/Input';

import MetricCard from '@/molecules/MetricCard';
import React, { useEffect } from 'react';
import './orders.scss';
import OrdersTable from './OrdersTable';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { constructQuery } from '@/utils/helpers';
import { getOrders } from '@/redux/apis/orders';
import { useDispatch, useSelector } from '@/redux/hooks';
import { IFilter } from '@/utils/interface';
import StatusFilter from '@/molecules/StatusFilter';
import useApiSearchQuery from '@/customHooks/useApiSearchQuery';
import SearchFilter from '@/molecules/SearchFilter';

const Orders = () => {
	const {
		orders,
		isError,
		isSuccess,
		loading,
		averageOrderValue = '...',
		totalOrders = '...',
		totalSales = '...',
	} = useSelector(state => state?.orders);
	const router = useRouter();
	const { constructApiQuery, page, status, search } = useApiSearchQuery(12);
	const sQ = useSearchParams();
	const dispatch = useDispatch();

	const path = usePathname();

	const onSetStatus = (status: string) => {
		router.push(`${path}?status=${status}`);
	};

	const onTextChange = (searchValue: string) => {
		router.push(`${path}?status=${status}&page=${page}&search=${searchValue}`);
	};

	useEffect(() => {
		let qString = constructApiQuery();

		dispatch(getOrders(qString));
	}, [page, status, search]);

	return (
		<div className='orders'>
			<div className='page-title_div '>
				<h2 className='title'>Orders</h2>
			</div>
			<section className='metric_cards_wrapper'>
				<MetricCard title='Total Orders' value={`${totalOrders} Orders`} />
				<MetricCard
					title='Average Order value'
					value={
						<>
							<span className='font-medium'>&#8358;</span>
							{averageOrderValue?.toLocaleString()}
						</>
					}
				/>
			</section>
			<div className='filter_div'>
				<SearchFilter onTextChange={onTextChange} />
				<StatusFilter onSetStatus={onSetStatus} status={status} />
			</div>
			<section>
				<OrdersTable orders={orders} />
			</section>
		</div>
	);
};

export default Orders;
