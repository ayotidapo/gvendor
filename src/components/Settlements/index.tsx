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
import {
	downloadSettlementsApi,
	getSettlements,
} from '@/redux/apis/settlements';
import LoadingPage from '@/molecules/LoadingPage';
import Pagination from '@/molecules/Pagination';
import { SimpleBtn } from '@/atoms/buttons/Button';
import Modal from '@/atoms/Modal';
import './settlement.scss';
import { Icon } from '@/atoms/icon/icon';
import Select from '@/atoms/Input/Select';
import Input from '@/atoms/Input';
import { toast } from 'react-toastify';
import FilterModal from './FilterModal';

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
	const [downloading, setDownloading] = useState(false);
	const router = useRouter();

	const dispatch = useDispatch();
	const path = usePathname();

	useEffect(() => {
		dispatch(getSettlements(qString));
	}, [qString]);

	useEffect(() => {
		if (isSuccess) setOpenModal(false);
	}, [isSuccess]);

	const onDownloadSettlement = async () => {
		try {
			setDownloading(true);
			await downloadSettlementsApi(qString);
		} catch (e: any) {
			toast.error(`Could not download report: ${e.message}`);
		} finally {
			setDownloading(false);
		}
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

	const onSetModal = (status: boolean) => {
		setOpenModal(status);
	};

	const onSetActive = (value: string) => {
		setActive(value);
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
				console.log({ status, startDate, endDate, filter, active });
				router.push(
					`${path}?status=${status}&page=1&isCustomDateRange=${active === 'range'}&startDate=${new Date(startDate)?.toISOString()}&filter=${filter}&endDate=${new Date(endDate)?.toISOString()}`
				);
			}}
			validationSchema={validationSchema}
		>
			<Form>
				<div className='settlements'>
					<Modal
						open={openModal}
						onClose={() => {
							onSetModal(false);
						}}
					>
						<FilterModal
							onCloseModal={onSetModal}
							active={active}
							onSetActive={onSetActive}
							isFetching={isFetching}
						/>
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
							<span
								className='status_filter_wrapper'
								role='button'
								onClick={() => setOpenModal(true)}
							>
								<Icon id='sortp' className='mr-2' />
								Filter:{' '}
								<span className='capitalize'>
									&nbsp;{status?.toLocaleLowerCase() || 'All'}
								</span>
							</span>
							<SimpleBtn
								type='button'
								className='export'
								onClick={onDownloadSettlement}
								disabled={downloading}
							>
								{downloading ? <em>Downloading...</em> : 'Export'}
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
