import React from 'react';
import Tag from '@/atoms/Tag';
import { SimpleBtn } from '@/atoms/buttons/Button';
import './settlement-details.scss';
import { Icon } from '@/atoms/icon/icon';
import OrderItem from '@/molecules/OrderItem';
import { ObjectData } from '../../utils/interface';
import { format } from 'date-fns';

const SettlementDetailsPage: React.FC<{ details: ObjectData }> = props => {
	const { details: s } = props;
	return (
		<div className='settlementdetails'>
			<section>
				<div className='page-title_div'>
					<h2 className='title'>Earnings Transaction Details</h2>
				</div>
			</section>
			<section className='dl_section'>
				<div className='dt_dd'>
					<span>Transaction ID:</span>
					<span className='text-[#050301] font-medium'>
						{s?.transactionId || 'N/A'}
					</span>
				</div>
				<div className='dt_dd'>
					<span>Order ID:</span>
					<span className='text-[#050301] font-medium'>
						#{s?.order?.orderNumber || 'N/A'}
					</span>
				</div>
				<div className='dt_dd'>
					<span>Payment reference:</span>
					<span className='text-[#050301] font-medium'>
						{s?.paymentReference || 'N/A'}
					</span>
				</div>
				<div className='dt_dd'>
					<span>Account number:</span>
					<span className='text-[#050301] font-medium'>#15285047</span>
				</div>
				<div className='dt_dd'>
					<span>Account name:</span>
					<span className='text-[#050301] font-medium'>
						{s?.order?.personalInformation?.firstName} &nbsp;
						{s?.order?.personalInformation?.lastName}
					</span>
				</div>
				<div className='dt_dd'>
					<span>Date:</span>
					<span className='text-[#050301] font-medium'>
						<td>{format(s?.createdAt, 'dd/MM/yyyy hh:mm aa')}</td>
					</span>
				</div>
				<div className='dt_dd'>
					<span>Transaction status:</span>
					<span className='text-[#050301] font-medium'>
						<Tag title={s?.status} className={s?.status} />
					</span>
				</div>
				<div className='dt_dd'>
					<span>Order Subtotal:</span>
					<span className='text-[#050301] font-medium'>
						{s?.order?.subTotal || 'N/A'}
					</span>
				</div>
				<div className='dt_dd'>
					<span>Percentage:</span>
					<span className='text-[#050301] font-medium'>
						{s?.percentage * 100}%
					</span>
				</div>
				<div className='dt_dd'>
					<span>Processing fee:</span>
					<span className='text-[#050301] font-medium'>
						{s?.processingFee || 'N/A'}
					</span>
				</div>
				<div className='dt_dd'>
					<span>Amount Settled:</span>
					<span className='text-[#050301] font-medium'>
						₦{s?.amount.toLocaleString()}
					</span>
				</div>
			</section>
		</div>
	);
};

export default SettlementDetailsPage;
//kfkfk
