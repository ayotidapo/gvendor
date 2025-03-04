'use client';
import React, { useEffect, useMemo, useState } from 'react';
import * as Yup from 'yup';
import './inventory.scss';
import { SimpleBtn } from '@/atoms/buttons/Button';
import { useRcfUploader } from 'files-uploader-rc';
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
import Modal from '@/atoms/Modal';
import { Form, Formik } from 'formik';
import Input from '@/atoms/Input';
import Image from 'next/image';
import ReactPaginate from 'react-paginate';
import Pagination from '@/molecules/Pagination';
import Paginationc from '@/atoms/pagination';

const AddItemSchema = Yup.object({
	itemName: Yup.string().required('name of item is required'),
	itemDescription: Yup.string().required('item description is required'),
	imageURL: Yup.string(),
	price: Yup.number().required('item price is required'),
	category: Yup.number().required('item category is required'),
	quantityInStock: Yup.number().required('quantity in stock is required'),
});

const InventoryPage = () => {
	const {
		products,
		loading,
		totalUnitsSold = 0,
		productsInStock = 0,
	} = useSelector(state => state?.inventories);
	const [showModal, setShowModal] = useState(false);

	const [show, setShow] = useState(false);
	const router = useRouter();

	const dispatch = useDispatch();
	const path = usePathname();
	const [chosenFiles, setChosenFiles] = React.useState([]);

	const limit = 20;

	const { uploading, completed, onRemoveFile, files, resObj } = useRcfUploader({
		uri: 'https://vendor-api.staging.goodthingco.xyz/api/v1/image/upload',
		inputFieldName: 'gg',
		selectedFiles: chosenFiles,
		maxNumOfFiles: 1,
		uriConfig: {},
	});

	const { qString, page, status, search } = useApiSearchQuery(limit);

	useEffect(() => {
		dispatch(getInventories(qString));
	}, [qString]);

	const onSetStatus = (status: string) => {
		router.push(`${path}?status=${status}&page=1&search=${search}`);
	};

	const onTextChange = (searchValue: string) => {
		router.push(`${path}?status=${status}&page=1&search=${searchValue}`);
	};

	const len = products?.length;
	const onSelectFile = (newFiles: any) => {
		setChosenFiles(newFiles);
	};

	const onPageChange = (page: { selected: number }) => {
		const { selected } = page;
		router.push(
			`${path}?status=${status}&page=${selected + 1}&search=${search}`
		);
	};
	const totalItems = productsInStock;

	if (loading) return <LoadingPage className='py-5 ' />;

	return (
		<div className='inventory'>
			<Modal open={showModal} onClose={() => setShowModal(false)}>
				<div className='auth__form  bg-white rounded-lg pb-10'>
					<span className='x__close' onClick={() => setShowModal(false)}>
						&times;
					</span>
					<Formik
						initialValues={{
							itemName: '',
							itemDescription: '',
							imageURL: '',
							price: 0,
							category: '',
							vendor: '',
							quantityInStock: 0,
						}}
						onSubmit={() => {}}
						validationSchema={AddItemSchema}
					>
						<Form>
							<h3 className=' text-black font-medium font-recoleta text-2xl mb-2'>
								Add Item
							</h3>

							<label className='file__label'>
								<input
									type='file'
									className='hidden'
									name='gg'
									onChange={e => onSelectFile(e.target.files)}
								/>
								<Image
									src='/assets/img-icon.png'
									alt='img-icon'
									width={52}
									height={44}
								/>
								<span className='text-[#c2c2c3] text-sm mt-2'>
									Upload item image
								</span>
							</label>
							<Input name='itemName' />
							<Input name='itemName' as='textarea' rows={4} />
							<Input name='itemName' />
							<Input name='itemName' />
							<Input name='itemName' />
							<SimpleBtn>Request to add Item</SimpleBtn>
						</Form>
					</Formik>
				</div>
			</Modal>
			<div className='page-title_div'>
				<h2 className='title'>Inventory</h2>
				<div className='btn_div opacity-[0.05]'>
					<SimpleBtn
						className='set_as '
						onClick={() => setShowModal(true)}
						disabled
					>
						Add Item
					</SimpleBtn>
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

			{len < 1 && !loading && (
				<h2 className='empty__state'>No Inventory found</h2>
			)}
			{len > 0 && !loading && (
				<>
					{false && (
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
					)}
					<section className={`under_review  mb-5 ${show ? 'show' : ''}`}>
						<UnderReviewTable variants={[]} />
					</section>
					<section className='table_wrapper'>
						<InventoryTable products={products} />
					</section>
					<Pagination
						onPageChange={onPageChange}
						page={Number(page)}
						limit={limit}
						totalItems={totalItems}
						curItemsLen={products?.length}
					/>
				</>
			)}
		</div>
	);
};

export default InventoryPage;
