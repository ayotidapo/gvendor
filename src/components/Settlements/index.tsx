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
import { getSettlements } from '@/redux/apis/settlements';
import LoadingPage from '@/molecules/LoadingPage';

const SettlementPage = () => {
	const { docs, isError, isSuccess, total, loading } = useSelector(
		state => state?.settlements
	);
	const router = useRouter();

	const dispatch = useDispatch();
	const path = usePathname();

	const { qString, page, status, search } = useApiSearchQuery(12);

	useEffect(() => {
		dispatch(getSettlements(qString));
	}, [qString]);

	const onSetStatus = (status: string) => {
		router.push(`${path}?status=${status}&page=1&search=${search}`);
	};

	const onTextChange = (searchValue: string) => {
		router.push(`${path}?status=${status}&page=1&search=${searchValue}`);
	};

	const len = docs?.length;
	return (
		<div className='settlements'>
			<div className='page-title_div '>
				<h2 className='title'>Settlements</h2>
			</div>
			<section className='metric_cards_wrapper'>
				<MetricCard
					title='Total Earnings'
					value={`₦${total?.toLocaleString()}`}
				/>
			</section>
			<div className='filter_div'>
				<SearchFilter onTextChange={onTextChange} />
				<StatusFilter
					onSetStatus={onSetStatus}
					status={status}
					states={settlementStatus}
				/>
			</div>
			{loading && <LoadingPage className='py-5 ' />}
			{len < 1 && !loading && (
				<h2 className='empty__state'>No Settlement found</h2>
			)}
			{len > 0 && !loading && (
				<section>
					<SettlementTable settlements={docs} />
				</section>
			)}
		</div>
	);
};

export default SettlementPage;
