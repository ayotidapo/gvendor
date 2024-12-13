'use client';
import React, { useEffect, useMemo } from 'react';
import './settlement.scss';
import MetricCard from '@/molecules/MetricCard';

import SettlementTable from './SettlementTable';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from '@/redux/hooks';
import useApiSearchQuery from '@/customHooks/useApiSearchQuery';
import { usePathname } from 'next/navigation';
import SearchFilter from '@/molecules/SearchFilter';
import StatusFilter from '@/molecules/StatusFilter';
import { settlementStatus } from '@/utils/data';

const SettlementPage = () => {
	// const {
	// 	orders,
	// 	isError,
	// 	isSuccess,
	// 	loading,
	// 	averageOrderValue = '...',
	// 	totalOrders = '...',
	// 	totalSales = '...',
	// } = useSelector(state => state?.settlements);
	const router = useRouter();

	const dispatch = useDispatch();
	const path = usePathname();

	const { constructApiQuery, page, status, search } = useApiSearchQuery(12);

	const qString = useMemo(() => {
		return constructApiQuery();
	}, [page, status, search]);

	useEffect(() => {
		const qString = constructApiQuery();

		//dispatch(getSettlements(qString));
	}, [qString]);

	const onSetStatus = (status: string) => {
		router.push(`${path}?status=${status}`);
	};

	const onTextChange = (searchValue: string) => {
		router.push(`${path}?status=${status}&page=${page}&search=${searchValue}`);
	};

	//const len = orders?.length;
	return (
		<div className='settlements'>
			<div className='page-title_div '>
				<h2 className='title'>Settlements</h2>
			</div>
			<section className='metric_cards_wrapper'>
				<MetricCard title='Total Earnings' value='₦149,720,000.00' />
			</section>
			<div className='filter_div'>
				<SearchFilter onTextChange={onTextChange} />
				<StatusFilter
					onSetStatus={onSetStatus}
					status={status}
					states={settlementStatus}
				/>
			</div>
			<section>
				<SettlementTable />
			</section>
		</div>
	);
};

export default SettlementPage;
