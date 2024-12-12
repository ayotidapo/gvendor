import React from 'react';
import Tag from '@/atoms/Tag';
import { SimpleBtn } from '@/atoms/buttons/Button';
import './order-details.scss';
import { Icon } from '@/atoms/icon/icon';
import OrderItem from '@/molecules/OrderItem';

const OrderDetailsPage = () => {
	return (
		<div className='orderdetails'>
			<section className='flex flex-col'>
				<div className='page-title_div'>
					<h2 className='title'>Orders #15285047</h2>
					<div className='btn_div'>
						<SimpleBtn className='set_as'>Set as processing</SimpleBtn>
						<SimpleBtn className='ellips'>
							<Icon id='ellipsis' width={20} height={20} />
						</SimpleBtn>
					</div>
				</div>
				<span className='text-xl my-2.5'>₦116,000.00</span>
				<span>Ordered by David Adewumi</span>
				<span className='my-2'>
					5 mins ago <span className='mx-1.5 mr-2'>•</span>
					<Tag title='new' className='new' />
				</span>
				<span className='text-sm mt-2'>
					This order is complete, and a driver has been requested for delivery.
					If the status needs to be updated due to an error, press the ‘Options'
					button to make the change.
				</span>
			</section>
			<h2 className='mt-10 mb-7 text-xl text-black'> Order Details</h2>
			<OrderItem />
			<OrderItem />
			<OrderItem />
			<OrderItem />
		</div>
	);
};

export default OrderDetailsPage;
