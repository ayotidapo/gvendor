'use client';
import React, { useEffect, useState } from 'react';

import './inventory.scss';
import { SimpleBtn } from '@/atoms/buttons/Button';
import MetricCard from '@/molecules/MetricCard';
import InventoryTable from './InventoryTable';
import { Icon } from '@/atoms/icon/icon';
import UnderReviewTable from './UnderReviewTable';
import SearchFilter from '@/molecules/SearchFilter';
import StatusFilter from '@/molecules/StatusFilter';
import { getInventories } from '@/redux/apis/inventories';
import useApiSearchQuery from '@/customHooks/useApiSearchQuery';
import { usePathname, useRouter } from 'next/navigation';
import { useDispatch, useSelector } from '@/redux/hooks';
import LoadingPage from '@/molecules/LoadingPage';
import { inventoryStatus } from '@/utils/data';

const InventoryPage = () => {
	const {
		products,
		isError,
		isSuccess,
		loading,
		totalUnitsSold = 0,
		productsInStock = 0,
	} = useSelector(state => state?.inventories);

	const [show, setShow] = useState(false);
	const router = useRouter();
	const { constructApiQuery, page, status, search } = useApiSearchQuery(12);

	const dispatch = useDispatch();

	const path = usePathname();

	const onSetStatus = (status: string) => {
		router.push(`${path}?status=${status}`);
	};

	const onTextChange = (searchValue: string) => {
		router.push(`${path}?status=${status}&page=${page}&search=${searchValue}`);
	};

	useEffect(() => {
		const qString = constructApiQuery();

		dispatch(getInventories(qString));
	}, [page, status, search]);

	const len = products?.length;
	return (
		<div className='inventory'>
			<div className='page-title_div'>
				<h2 className='title'>Inventory</h2>
				<div className='btn_div'>
					<SimpleBtn className='set_as'>Add Item</SimpleBtn>
				</div>
			</div>
			<div className='metric_cards_wrapper'>
				<MetricCard
					title='Total Unit Sold'
					value={totalUnitsSold?.toLocaleString()}
				/>
				<MetricCard
					title='Items In Stock'
					value={productsInStock?.toLocaleString()}
				/>
			</div>
			<div className='filter_div'>
				<SearchFilter onTextChange={onTextChange} />
				<StatusFilter
					onSetStatus={onSetStatus}
					status={status}
					states={inventoryStatus}
				/>
			</div>
			{loading && <LoadingPage className='py-5 ' />}
			{len < 1 && !loading && (
				<h2 className='empty__state'>No Inventory found</h2>
			)}
			{len > 0 && !loading && (
				<>
					<SimpleBtn
						className='show_review'
						onClick={() => setShow(show => !show)}
					>
						Show items under review{' '}
						<Icon
							id='caret-down'
							width={12}
							height={10}
							className='ml-2 leading-8'
						/>
					</SimpleBtn>
					<section className={`under_review  mb-5 ${show ? 'show' : ''}`}>
						<UnderReviewTable />
					</section>
					<section>
						<InventoryTable products={products} />
					</section>
				</>
			)}
		</div>
	);
};

export default InventoryPage;
