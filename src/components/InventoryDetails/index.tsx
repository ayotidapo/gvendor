'use client';

import { SimpleBtn } from '@/atoms/buttons/Button';
import { Icon } from '@/atoms/icon/icon';

import React from 'react';
import './inventory-details.scss';
import Tag from '@/atoms/Tag';
import Image from 'next/image';

import EditInputBox from '@/molecules/EditInputBox';
import UnderReviewTable from '../Inventory/UnderReviewTable';

const InventoryDetailsPage = () => {
	return (
		<div className='inventory_details'>
			<section className='flex flex-col'>
				<div className='page-title_div'>
					<h2 className='title'>Jollof Rice and 6 Chicken Wings</h2>
					<div className='btn_div'>
						<SimpleBtn className='ellips'>
							<Icon id='ellipsis' width={20} height={20} />
						</SimpleBtn>
					</div>
				</div>

				<span className='text-xl my-1.5'>₦78,600.00</span>
				<span className='my-1'>
					<span className='text-black'>92</span> items in stock{' '}
					<span className='mx-1.5 mr-2'>•</span>
					<span className='text-black'>1029</span> units sold
					<span className='mx-1.5 mr-2'>•</span>
					<Tag title='Active' className='completed' />
				</span>
			</section>

			<section className='xx:w-full md:w-[75%]'>
				<h2 className='text-xl text-black my-8 mb-6 subpixel-antialiased'>
					Items Images
				</h2>
				<div className=' grid grid-cols-[repeat(auto-fill,minmax(140px,1fr))] gap-2.5 gap-y-6'>
					<div className='relative h-[140px] w-[140px]  rounded-lg overflow-hidden'>
						<Image
							src='/assets/image68.png'
							fill
							alt=''
							className=' object-cover'
						/>
					</div>
					<div className='relative h-[140px] w-[140px]  rounded-lg overflow-hidden'>
						<Image
							src='/assets/image68.png'
							fill
							alt=''
							className=' object-cover'
						/>
					</div>
					<div className='relative h-[140px] w-[140px] rounded-lg overflow-hidden'>
						<Image
							src='/assets/image68.png'
							fill
							alt=''
							className=' object-cover'
						/>
					</div>
				</div>
				<h2 className='text-xl text-black mt-10 mb-6 subpixel-antialiased'>
					Items Details
				</h2>
				<EditInputBox title='Item name' />
				<EditInputBox
					title='Item description'
					type='textarea'
					rows={5}
					textarea
				/>
				<EditInputBox title='Price' />
				<EditInputBox title='Item Category' />
			</section>
			<h2 className='text-xl text-black my-8 mb-6 subpixel-antialiased'>
				Variants
			</h2>
			<section>
				<UnderReviewTable />
			</section>
		</div>
	);
};

export default InventoryDetailsPage;
