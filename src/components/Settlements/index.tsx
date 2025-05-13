'use client';
import React, { useEffect, useMemo, useState } from 'react';
import { Form, Formik } from 'formik';
import MetricCard from '@/molecules/MetricCard';
import * as Yup from 'yup';
import SettlementTable from './SettlementTable';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from '@/redux/hooks';
import useApiSearchQuery from '@/customHooks/useApiSearchQuery';
import { usePathname } from 'next/navigation';
import SearchFilter from '@/molecules/SearchFilter';
import StatusFilter from '@/molecules/StatusFilter';
import { periodFilter, settlementFilter, settlementStatus } from '@/utils/data';
import { getSettlements } from '@/redux/apis/settlements';
import LoadingPage from '@/molecules/LoadingPage';
import Pagination from '@/molecules/Pagination';
import { SimpleBtn } from '@/atoms/buttons/Button';
import Modal from '@/atoms/Modal';
import './settlement.scss';
import { Icon } from '@/atoms/icon/icon';
import Select from '@/atoms/Input/Select';
import Input from '@/atoms/Input';

const validationSchema = Yup.object({
	startDate: Yup.string(),
	endDate: Yup.string(),
	status: Yup.string(),
	filter: Yup.string(),
});

const SettlementPage = () => {
	const { docs, isSuccess, isFetching, total, totalRevenue, loading } =
		useSelector(state => state?.settlements);
	const limit = 20;

	const {
		qString,
		page,
		status,
		search,
		isCustomDateRange,
		startDate,
		endDate,
		filter,
	} = useApiSearchQuery(limit);

	const activeVal = isCustomDateRange ? 'range' : 'period';
	const [active, setActive] = useState(activeVal);
	const [openModal, setOpenModal] = useState(false);

	const router = useRouter();

	const dispatch = useDispatch();
	const path = usePathname();

	useEffect(() => {
		dispatch(getSettlements(qString));
	}, [qString]);

	useEffect(() => {
		if (isSuccess) setOpenModal(false);
	}, [isSuccess]);

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
		<Formik
			initialValues={{
				startDate: new Date(startDate),
				endDate: new Date(endDate),
				status: status,
				filter: filter,
			}}
			onSubmit={values => {
				const { status, startDate, endDate, filter } = values;
				console.log({ status, startDate, endDate, filter });
				router.push(
					`${path}?status=${status}&page=1&startDate=${new Date(startDate)?.toISOString()}&endDate=${new Date(endDate)?.toISOString()}&filter=${filter}&isCustomDateRange=${active === 'range'}`
				);
			}}
			validationSchema={validationSchema}
		>
			<Form>
				<div className='settlements'>
					<Modal
						open={openModal}
						onClose={() => {
							setOpenModal(false);
						}}
					>
						<div className='export_wrapper'>
							<div className='flex justify-between md:items-center xx:items-start'>
								<h2 className='headings'>Export Bee's store Settlements</h2>
								<Icon
									id='close'
									width={32}
									height={32}
									className='cursor-pointer'
									onClick={() => {
										setOpenModal(false);
									}}
								/>
							</div>
							<div className='toggle__div'>
								<SimpleBtn
									type='button'
									className={`tog ${active === 'period' ? 'active' : ''}`}
									onClick={() => setActive('period')}
								>
									Period
								</SimpleBtn>
								<SimpleBtn
									type='button'
									className={`tog ${active === 'range' ? 'active' : ''}`}
									onClick={() => setActive('range')}
								>
									Date Range
								</SimpleBtn>
							</div>

							{active === 'range' ? (
								<div className='date__range__wrapper'>
									<div className='w-full'>
										<div className='mt-7 mb-1 text-[#555555] font-medium'>
											Start date
										</div>
										<Input
											name='startDate'
											type='date'
											onClick={e => e.currentTarget.showPicker()}
										/>
									</div>
									<div className='w-full'>
										<div className='mt-7 mb-1 text-[#555555] font-medium'>
											End date
										</div>
										<Input
											name='endDate'
											type='date'
											onClick={e => e.currentTarget.showPicker()}
										/>
									</div>
								</div>
							) : (
								<>
									<div className='mt-7 mb-1 text-[#555555] font-medium'>
										Period
									</div>
									<Select
										name='filter'
										options={periodFilter}
										useFormik
										placeholder='select period'
									/>
								</>
							)}
							<div className='mb-1 text-[#555555] font-medium'>Settlement</div>
							<Select
								name='status'
								options={settlementFilter}
								useFormik
								placeholder='select settlement status'
							/>
							<SimpleBtn className='proceed' disabled={isFetching}>
								Proceed
							</SimpleBtn>
						</div>
					</Modal>
					<div className='page-title_div '>
						<h2 className='title'>Settlements</h2>
					</div>
					<section className='metric_cards_wrapper'>
						<MetricCard
							title='Total Amount Settled'
							iconDesc='Amount paid to your account after Good’s commission is deducted.'
							value={`₦${totalRevenue?.toLocaleString()}`}
						/>
					</section>
					<div className='filter_div'>
						<SearchFilter onTextChange={onTextChange} />
						<div className='flex items-center gap-5'>
							<StatusFilter
								onSetStatus={onSetStatus}
								status={status}
								states={settlementStatus}
							/>
							<SimpleBtn
								type='button'
								className='export'
								onClick={() => setOpenModal(true)}
							>
								Export
							</SimpleBtn>
						</div>
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
			</Form>
		</Formik>
	);
};

export default SettlementPage;
