'use client';
import React, { useEffect } from 'react';

import './transaction.scss';
import { SimpleBtn } from '@/atoms/buttons/Button';
import MetricCard from '@/molecules/MetricCard';
import TransactionsTable from './TransactionsTable';
import SearchFilter from '@/molecules/SearchFilter';
import { usePathname, useRouter } from 'next/navigation';
import useApiSearchQuery from '@/customHooks/useApiSearchQuery';
import { useDispatch } from '@/redux/hooks';
import { getTransactions } from '@/redux/apis/transactions';

const TransactionPage = () => {
	const path = usePathname();
	const router = useRouter();
	const dispatch = useDispatch();
	const { constructApiQuery, page, status, search } = useApiSearchQuery(12);

	const onTextChange = (searchValue: string) => {
		router.push(`${path}?status=${status}&page=${page}&search=${searchValue}`);
	};

	useEffect(() => {
		let qString = constructApiQuery();

		dispatch(getTransactions(qString));
	}, [page, status, search]);
	return (
		<div className='transactions'>
			<div className='page-title_div'>
				<h2 className='title'>Transactions</h2>
				<div className='btn_div'>
					<SimpleBtn className='set_as'>Export</SimpleBtn>
				</div>
			</div>

			<div className='metric_cards_wrapper'>
				<MetricCard title='Total Sales' value='₦149,720,000.00' />
			</div>
			<div className='w-[372px] my-12'>
				<SearchFilter onTextChange={onTextChange} />
			</div>
			<section>
				<TransactionsTable />
			</section>
		</div>
	);
};

export default TransactionPage;
