'use client';
import { SimpleBtn } from '@/atoms/buttons/Button';
import { Icon } from '@/atoms/icon/icon';
import { Input } from '@/atoms/Input/Input';

import MetricCard from '@/molecules/MetricCard';
import React, { useEffect, useMemo } from 'react';
import './orders.scss';
import OrdersTable from './OrdersTable';
import { usePathname, useRouter } from 'next/navigation';
import { constructQuery } from '@/utils/helpers';
import { getOrders } from '@/redux/apis/orders';
import { useDispatch, useSelector } from '@/redux/hooks';
import { IFilter } from '@/utils/interface';
import StatusFilter from '@/molecules/StatusFilter';
import useApiSearchQuery from '@/customHooks/useApiSearchQuery';
import SearchFilter from '@/molecules/SearchFilter';
import LoadingPage from '@/molecules/LoadingPage';
import { orderStages } from '@/utils/data';
import Pagination from '@/molecules/Pagination';

const Orders = () => {
	const {
		orders,
		isError,
		isSuccess,
		loading,
		averageOrderValue = 0,
		totalOrders = 0,
		totalSales = 0,
	} = useSelector(state => state?.orders);

	const router = useRouter();
	const dispatch = useDispatch();
	const path = usePathname();

	const limit = 20;
	const { qString, page, status, search } = useApiSearchQuery(limit);

	useEffect(() => {
		dispatch(getOrders(qString));
	}, [qString]);

	const onSetStatus = (status: string) => {
		router.push(`${path}?status=${status}&page=1&search=${search}`);
	};

	const onTextChange = (searchValue: string) => {
		router.push(`${path}?status=${status}&page=1&search=${searchValue}`);
	};

	const len = orders?.length;

	const onPageChange = (page: { selected: number }) => {
		const { selected } = page;
		router.push(
			`${path}?status=${status}&page=${selected + 1}&search=${search}`
		);
	};
	const totalItems = totalOrders;
	return (
		<div className='orders'>
			<div className='page-title_div '>
				<h2 className='title'>Orders</h2>
			</div>
			<section className='metric_cards_wrapper'>
				<MetricCard title='Total Orders' value={`${totalOrders || 0} Orders`} />
				<MetricCard
					title='Total Order value'
					value={
						<>
							<span className='font-medium'>&#8358;</span>
							{averageOrderValue?.toLocaleString() || 0}
						</>
					}
				/>
			</section>
			<div className='filter_div'>
				<SearchFilter onTextChange={onTextChange} />
				<StatusFilter
					onSetStatus={onSetStatus}
					status={status}
					states={orderStages}
				/>
			</div>
			{loading && <LoadingPage className='py-5 ' />}
			{len < 1 && !loading && <h2 className='empty__state'>No Order found</h2>}
			{len > 0 && !loading && (
				<section>
					<OrdersTable orders={orders} />
					<Pagination
						onPageChange={onPageChange}
						page={Number(page)}
						limit={limit}
						totalItems={totalOrders}
						curItemsLen={orders?.length}
					/>
				</section>
			)}
		</div>
	);
};

export default Orders;
