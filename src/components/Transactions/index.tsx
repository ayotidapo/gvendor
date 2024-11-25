import React from 'react';

import './transaction.scss';
import { SimpleBtn } from '@/atoms/buttons/Button';
import MetricCard from '@/molecules/MetricCard';
import { Input } from '@/atoms/input/Input';
import TransactionsTable from './TransactionsTable';

const TransactionPage = () => {
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
				<Input name='search' className='search' iconSvg='search' hasIcon />
			</div>
			<section>
				<TransactionsTable />
			</section>
		</div>
	);
};

export default TransactionPage;
