'use client';
import React, { useState } from 'react';

import './inventory.scss';
import { SimpleBtn } from '@/atoms/buttons/Button';
import MetricCard from '@/molecules/MetricCard';
import { Input } from '@/atoms/input/Input';
import InventoryTable from './InventoryTable';
import { Icon } from '@/atoms/icon/icon';
import UnderReviewTable from './UnderReviewTable';

const InventoryPage = () => {
	const [show, setShow] = useState<boolean>(false);
	return (
		<div className='inventory'>
			<div className='page-title_div'>
				<h2 className='title'>Inventory</h2>
				<div className='btn_div'>
					<SimpleBtn className='set_as'>Add Item</SimpleBtn>
				</div>
			</div>
			<div className='metric_cards_wrapper'>
				<MetricCard title='Total Unit Sold' value='7,764' />
				<MetricCard title='Items In Stock' value='673' />
			</div>
			<div className='filter_div'>
				<Input
					value=''
					name=''
					hasIcon
					iconSvg='search'
					className='search'
					placeholder='Search'
				/>
				<SimpleBtn className='filter'>
					<Icon id='sortp' className='mr-2' />
					<span>Sort by: All</span>
				</SimpleBtn>
			</div>
			<SimpleBtn className='show_review' onClick={() => setShow(show => !show)}>
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
				<InventoryTable />
			</section>
		</div>
	);
};

export default InventoryPage;
