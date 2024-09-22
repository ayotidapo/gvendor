'use client';

import React, { useEffect } from 'react';
import PageWrapper from '@/containers/PageWrapper';
import Search from '@/components/input/Search';
import { format } from 'date-fns';
import Button from '@/components/buttons/Button';
import CountCard from '@/components/cards/CountCard';
import SectionCard from '@/components/cards/SectionCard';
import { Header } from '@/components/typography/Header';
import ButtonCard from '@/components/cards/ButtonCard';
import LineChart from '@/components/charts/LineChart';
import { TableComponent } from '@/components/table/Table';
import { CountCardContainer } from '@/containers/CountCardWrapper';
import Dropdown from '@/components/input/dropdown';
import { Icon } from '@/components/icon/icon';
import {
	useGetAllTransactionsQuery,
	useGetCustomerReportQuery,
	useGetDailyTransactionsChartQuery,
} from '@/redux/transactions/transactions.slice';
import { formatCurrency } from '@/helpers';


const Sales: React.FC = () => {
	const { data: dailyTransaction } = useGetDailyTransactionsChartQuery();
	const {
		data: transactionData,
		isSuccess,
		isLoading,
	} = useGetAllTransactionsQuery();
	const { data: customerReport} = useGetCustomerReportQuery()

	useEffect(() => {
		console.log(customerReport);
	}, [customerReport]);

	const labels = dailyTransaction?.data.map(item => item.day);
	const values1 = dailyTransaction?.data.map(item => item.total);

	return (
		<PageWrapper pageHeader='Sales'>
			<div className='flex flex-col md:flex-row gap-4 items-center justify-between mb-10'>
				<div className='w-full md:w-auto md:max-w-[400px]'>
					<Search placeholder='Search sales' />
				</div>
				<div className='w-full md:w-auto flex space-x-4'>
					<div>
						<Button label='Today' name='outline' arrow />
					</div>
					<div>
						<Button download label='Export CSV' name='outline' />
					</div>
				</div>
			</div>
			<CountCardContainer>
				<div className='grid grid-cols-1 space-y-7 max-w-lg gap-0'>
					<ButtonCard
						count={0}
						text={'WALLET BALANCE'}
						isCurrency={false}
						label={'Withdraw'}
						href='/sales/withdraw'
					/>

					<CountCard count={0} text={'SALES(TODAY)'} isCurrency={false} />
				</div>
			</CountCardContainer>
			<div className='pt-6'>
				<SectionCard
					header={
						<div className=''>
							<Header header={'Sales Chart Today'} />
						</div>
					}
					content={
						<div className='pt-6'>
							<LineChart responsive labels={labels} data={values1} />
						</div>
					}
				/>
			</div>
			<div className='pt-6'>
				<Header className='pb-4' header={'Transaction Breakdown'} />
				<TableComponent
					headers={[
						'ORDER ID',
						'PAYMENT METHOD',
						'AMOUNT',
						'DATE AND TIME',
						' ',
					]}
					rows={(transactionData?.data.transactions || []).map(
						transactions => ({
							id: transactions._id,
							content: [
								transactions._id,
								transactions.type,
								`${formatCurrency(transactions.amount)}`,
								`${format(transactions.createdAt, 'yyyy-mm-dd h:mm:a')}`,
								<Dropdown
									key={`${transactions._id}-controls`}
									menuButton={
										<Icon svg='ellipses' height={18} width={18} className='' />
									}
									onClickMenuItem={() => {}}
									menuItems={[
										{
											name: (
												<button className='disabled:opacity-30 w-full text-left'>
													Request delivery
												</button>
											),
											value: '',
										},
									]}
								/>,
							],
						})
					)}
					name='categories-table'
					loading={false}
					isEmpty={false}
				/>
			</div>
		</PageWrapper>
	);
};

export default Sales;
