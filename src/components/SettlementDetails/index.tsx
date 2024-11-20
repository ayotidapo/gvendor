import React from 'react';
import Tag from '@/atoms/Tag';
import { SimpleBtn } from '@/atoms/buttons/Button';
import './settlement-details.scss';
import { Icon } from '@/atoms/icon/icon';
import OrderItem from '@/molecules/OrderItem';
import PageWrapper from '@/containers/PageWrapper';

const SettlementDetailsPage = () => {
	return (
		<PageWrapper pageHeader=''>
			<div className='settlementdetails'>
				<section>
					<div className='page-title_div'>
						<h2 className='title'>Earnings Transaction Details</h2>
					</div>
				</section>
				<section className='dl_section'>
					<div className='dt_dd'>
						<span>Transaction ID:</span>
						<span className='text-[#050301] font-medium'>BI21DDC25XD2V</span>
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
						<span>Creator's account number:</span>
						<span className='text-[#050301] font-medium'>#15285047</span>
					</div>
					<div className='dt_dd'>
						<span>Creator's account name:</span>
						<span className='text-[#050301] font-medium'>David Adewumi</span>
					</div>
					<div className='dt_dd'>
						<span>Date:</span>
						<span className='text-[#050301] font-medium'>
							27/10/2024 2:49PM
						</span>
					</div>
					<div className='dt_dd'>
						<span>Transaction status:</span>
						<span className='text-[#050301] font-medium'>
							<Tag title='Successful' className='completed' />
						</span>
					</div>
					<div className='dt_dd'>
						<span>Order amount:</span>
						<span className='text-[#050301] font-medium'>#15285047</span>
					</div>
					<div className='dt_dd'>
						<span>Goods commission (20%):</span>
						<span className='text-[#050301] font-medium'>#15285047</span>
					</div>
					<div className='dt_dd'>
						<span>Processing fee:</span>
						<span className='text-[#050301] font-medium'>Bank transfer</span>
					</div>
					<div className='dt_dd'>
						<span>Amount Settled:</span>
						<span className='text-[#050301] font-medium'>₦95,700.00</span>
					</div>
				</section>
			</div>
		</PageWrapper>
	);
};

export default SettlementDetailsPage;
