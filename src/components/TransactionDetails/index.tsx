import React from 'react';
import Tag from '@/atoms/Tag';
import { SimpleBtn } from '@/atoms/buttons/Button';
import './transaction-details.scss';
import { Icon } from '@/atoms/icon/icon';
import OrderItem from '@/molecules/OrderItem';

const TransactionDetailsPage = () => {
	return (
		<div className='transactiondetails'>
			<section>
				<div className='page-title_div'>
					<h2 className='title'>Sales Transaction Details</h2>
				</div>
			</section>
			<section className='dl_section'>
				<div className='dt_dd'>
					<span>Transaction ID:</span>
					<span className='text-[#050301] font-medium'>BI21DDC25XD2V</span>
				</div>
				<div className='dt_dd'>
					<span>Transaction ID:</span>
					<span className='text-[#050301] font-medium'>#15285047</span>
				</div>
				<div className='dt_dd'>
					<span>Order ID:</span>
					<span className='text-[#050301] font-medium'>BI21DDC25XD2V</span>
				</div>
				<div className='dt_dd'>
					<span>Payment reference:</span>
					<span className='text-[#050301] font-medium'>VYGYUFT67</span>
				</div>
				<div className='dt_dd'>
					<span>Customer name:</span>
					<span className='text-[#050301] font-medium'>David Adewumi</span>
				</div>
				<div className='dt_dd'>
					<span>Date:</span>
					<span className='text-[#050301] font-medium'>27/10/2024 2:49PM</span>
				</div>
				<div className='dt_dd'>
					<span>Payment method:</span>
					<span className='text-[#050301] font-medium'>Bank transfer</span>
				</div>
				<div className='dt_dd'>
					<span>Amount paid:</span>
					<span className='text-[#050301] font-medium'>₦95,700.00</span>
				</div>
			</section>
		</div>
	);
};

export default TransactionDetailsPage;
