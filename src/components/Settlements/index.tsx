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
import Pagination from '@/molecules/Pagination';

const SettlementPage = () => {
	const { docs, isError, isSuccess, total, loading } = useSelector(
		state => state?.settlements
	);
	const router = useRouter();
	const limit = 20;
	const dispatch = useDispatch();
	const path = usePathname();

	const { qString, page, status, search } = useApiSearchQuery(limit);

	useEffect(() => {
		dispatch(getSettlements(qString));
	}, [qString]);

	const onSetStatus = (status: string) => {
		router.push(`${path}?status=${status}&page=1&search=${search}`);
	};

	const onTextChange = (searchValue: string) => {
		router.push(`${path}?status=${status}&page=1&search=${searchValue}`);
	};

	const onPageChange = (page: { selected: number }) => {
		const { selected } = page;
		router.push(
			`${path}?status=${status}&page=${selected + 1}&search=${search}`
		);
	};
	const len = docs?.length;

	if (loading) return <LoadingPage className='py-5 ' />;

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

			{len < 1 && !loading && (
				<h2 className='empty__state'>No Settlement found</h2>
			)}
			{len > 0 && !loading && (
				<section className='table_wrapper'>
					<SettlementTable settlements={docs} />
					<Pagination
						onPageChange={onPageChange}
						page={Number(page)}
						limit={limit}
						totalItems={total}
						curItemsLen={docs?.length}
					/>
				</section>
			)}
		</div>
	);
};

export default SettlementPage;
