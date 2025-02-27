'use client';

import { SimpleBtn } from '@/atoms/buttons/Button';
import { Icon } from '@/atoms/icon/icon';

import React from 'react';
import './inventory-details.scss';
import Tag from '@/atoms/Tag';
import Image from 'next/image';

import EditInputBox from '@/molecules/EditInputBox';
import UnderReviewTable from '../Inventory/UnderReviewTable';
import DropDown from '@/atoms/DropDown';
import { setStages } from '@/utils/data';
import { IInventoryDetails } from '@/redux/reducers/inventory_details';
import { ObjectData } from '@/utils/interface';

interface Props {
	details: IInventoryDetails;
}

const InventoryDetailsPage: React.FC<Props> = ({ details }) => {
	return (
		<div className='inventory_details'>
			<section className='flex flex-col'>
				<div className='page-title_div'>
					<h2 className='title'>{details?.name}</h2>
					<div className='btn_div opacity-[0.02]'>
						<DropDown
							className='x_dropdown'
							component={
								<SimpleBtn className='ellips'>
									<Icon id='ellipsis' width={20} height={20} />
								</SimpleBtn>
							}
						>
							<div className='w-[220px] flex flex-col p-4 gap-4 text-left'>
								<span role='button' onClick={() => {}}>
									Remove from sale
								</span>
								<span role='button' onClick={() => {}}>
									delete
								</span>
							</div>
						</DropDown>
					</div>
				</div>

				<span className='text-xl my-1.5'>
					₦{details?.price?.toLocaleString()}
				</span>
				<span className='my-1'>
					<span className='text-black'>{details?.inStockQuantity}</span> items
					in stock <span className='mx-1.5 mr-2'>•</span>
					<span className='text-black'>{details?.totalUnitsSold}</span> units
					sold
					<span className='mx-1.5 mr-2'>•</span>
					<Tag
						title={details?.isActive ? 'active' : 'inactive'}
						className={details?.isActive ? 'completed' : 'new'}
					/>
				</span>
			</section>

			<section className='xx:w-full md:w-[75%]'>
				<h2 className='text-xl text-black my-8 mb-6 subpixel-antialiased'>
					Items Images
				</h2>
				<div className=' grid grid-cols-[repeat(auto-fill,minmax(140px,1fr))] gap-2.5 gap-y-6'>
					{/* <div className='relative h-[140px] w-[140px]  rounded-lg overflow-hidden'>
						
						<img src='/assets/image68.png' alt='' />
					</div> */}
					{details?.images?.map((img: string, i: number) => (
						<div
							className='relative h-[140px] w-[140px]  rounded-lg overflow-hidden'
							key={i}
						>
							<Image
								src={img}
								fill
								alt={`img-${i + 1}`}
								className=' object-cover'
							/>
						</div>
					))}
				</div>
				<h2 className='text-xl text-black mt-10 mb-6 subpixel-antialiased'>
					Items Details
				</h2>
				<EditInputBox
					title='Item name'
					name='name'
					value={details?.name}
					deactivate
				/>
				<EditInputBox
					title='Item description'
					name='description'
					type='textarea'
					rows={5}
					textarea
					value={details?.description}
					deactivate
				/>
				<EditInputBox
					title='Price'
					name='price'
					value={details?.price?.toLocaleString()}
					deactivate
				/>
				<EditInputBox
					title='Item Category'
					name='category'
					value={details?.category?.name}
					deactivate
				/>
			</section>
			{details?.variants?.length > 0 && (
				<>
					<h2 className='text-xl text-black my-8 mb-6 subpixel-antialiased'>
						Variants
					</h2>
					<section className='table_wrapper'>
						<UnderReviewTable variants={details?.variants} />
					</section>
				</>
			)}
		</div>
	);
};

export default InventoryDetailsPage;
