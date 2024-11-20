import PageWrapper from '@/containers/PageWrapper';
import React from 'react';
import './settlement.scss';
import MetricCard from '@/molecules/MetricCard';
import { Input } from '@/atoms/input/Input';
import { SimpleBtn } from '@/atoms/buttons/Button';
import { Icon } from '@/atoms/icon/icon';
import SettlementTable from './SettlementTable';

const SettlementPage = () => {
	return (
		<PageWrapper>
			<div className='settlements'>
				<div className='page-title_div '>
					<h2 className='title'>Orders</h2>
				</div>
				<section className='metric_cards_wrapper'>
					<MetricCard title='Total Earnings' value='₦149,720,000.00' />
				</section>
				<div className='filter_div'>
					<Input
						name=''
						hasIcon
						iconSvg='search'
						className='search'
						placeholder='Search'
					/>
					<SimpleBtn className='filter'>
						<Icon id='sortp' className='mr-2' />
						<span>Sort by: Successful</span>
					</SimpleBtn>
				</div>
				<section>
					<SettlementTable />
				</section>
			</div>
		</PageWrapper>
	);
};

export default SettlementPage;
