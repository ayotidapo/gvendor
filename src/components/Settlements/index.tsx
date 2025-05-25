'use client';
import React, { useEffect, useState } from 'react';
import { Form, Formik } from 'formik';
import MetricCard from '@/molecules/MetricCard';
import * as Yup from 'yup';
import SettlementTable from './SettlementTable';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from '@/redux/hooks';
import useApiSearchQuery from '@/customHooks/useApiSearchQuery';
import { usePathname } from 'next/navigation';
import SearchFilter from '@/molecules/SearchFilter';

import {
	downloadSettlementsApi,
	getSettlements,
	sendExportToEmailApi,
} from '@/redux/apis/settlements';
import LoadingPage from '@/molecules/LoadingPage';
import Pagination from '@/molecules/Pagination';
import { SimpleBtn } from '@/atoms/buttons/Button';
import Modal from '@/atoms/Modal';
import './settlement.scss';
import { Icon } from '@/atoms/icon/icon';

import { toast } from 'react-toastify';
import FilterModal from './FilterModal';
import StatusFilter from '@/molecules/StatusFilter';
import { settlementStatus } from '@/utils/data';
import Radio from '@/atoms/Radio';
import ExportModal from './ExportModal';

const validationSchema = (active: string) =>
	Yup.object({
		startDate: Yup.string().test(
			'sDate-valid',
			'Start date is required',
			value => {
				if (active === 'range' && !value) return false;
				return true;
			}
		),
		endDate: Yup.string().test('sDate-valid', 'End date is required', value => {
			if (active === 'range' && !value) return false;
			return true;
		}),
		status: Yup.string().required('Select status'),
		filter: Yup.string().test('filter', 'Period is required', value => {
			if (active === 'period' && !value) return false;
			return true;
		}),
		action: Yup.string().required('Select an option'),
	});

const SettlementPage = () => {
	const { docs, isFetching, total, totalRevenue, loading } = useSelector(
		state => state?.settlements
	);
	const { businessName } = useSelector(state => state?.vendor);

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
	const [actionQuery, setActionQuery] = useState({ query: '', action: '' });
	const [view, setView] = useState('');
	const [exporting, setExporting] = useState(false);
	const router = useRouter();

	const dispatch = useDispatch();
	const path = usePathname();

	useEffect(() => {
		dispatch(getSettlements(qString));
	}, [qString]);

	useEffect(() => {
		const { action } = actionQuery;
		if (action) onExport();
	}, [actionQuery]);

	const onDownloadSettlement = async () => {
		const { query } = actionQuery;
		try {
			setExporting(true);
			const response = await downloadSettlementsApi(query);
			const url = window.URL.createObjectURL(response);
			const a = document.createElement('a');
			a.href = url;
			a.download = `${businessName || 'settlement-report'}.xlsx`;
			document.body.appendChild(a);
			a.click();
			a.remove();
			window.URL.revokeObjectURL(url);
			toast.success(`Report successfully downloaded to your device`);
			setView('');
		} catch (e: any) {
			toast.error(`Could not download report: ${e.message}`);
		} finally {
			setExporting(false);
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

	const onExport = async () => {
		const { action, query } = actionQuery;
		if (action === 'download') {
			return onDownloadSettlement();
		}
		try {
			setExporting(true);
			await sendExportToEmailApi(query);
			toast.success(`Report sent to mail`);
			return setView('');
		} catch (e: any) {
			toast.error(`Could not send report: ${e.message}`);
		} finally {
			setExporting(false);
		}
	};

	const onSetView = (view: string) => {
		setView(view);
	};

	const onCloseModal = () => {
		setView('');
		router.push(`/settlements`);
	};

	const onSetActive = (value: string) => {
		setActive(value);
	};

	const onSetStatus = (status: string) => {
		router.push(`${path}?status=${status}&page=1&search=${search}`);
	};

	const len = docs?.length;

	if (loading) return <LoadingPage className='py-5 ' />;

	return (
		<Formik
			initialValues={{
				startDate: startDate || '',
				endDate: endDate || '',
				status: status,
				filter: filter,
				action: '',
			}}
			onSubmit={async values => {
				const { status, startDate, endDate, filter, action } = values;
				const _status = status === 'ALL' ? '' : status;

				const sDate = startDate ? new Date(startDate)?.toISOString() : '';
				const eDate = endDate ? new Date(endDate)?.toISOString() : '';
				let query = '';
				if (active === 'range')
					query = `?status=${_status}&page=1&isCustomDateRange=true&startDate=${sDate}&endDate=${eDate}`;
				else
					query = `?status=${_status}&page=1&isCustomDateRange=false&filter=${filter}`;
				setActionQuery({ query, action });
			}}
			validationSchema={validationSchema(active)}
		>
			{({ values }) => (
				<Form>
					<div className='settlements'>
						<Modal open={view !== ''} onClose={onCloseModal} iconClose>
							{view === 'filter' && (
								<FilterModal
									businessName={businessName}
									onCloseModal={onCloseModal}
									active={active}
									onSetActive={onSetActive}
									isFetching={isFetching}
								/>
							)}
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
									onClick={() => onSetView('filter')}
									disabled={exporting}
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
			)}
		</Formik>
	);
};

export default SettlementPage;
