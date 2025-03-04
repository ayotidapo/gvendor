'use client';
import React from 'react';
import Image from 'next/image';
import './order-item.scss';
import { IOrderItem } from '@/redux/reducers/order_details';

interface Props {
	item: IOrderItem;
	totalAmount: number;
}

const OrderItem: React.FC<Props> = ({ item }) => {
	return (
		<article className='order_item'>
			<div className='relative w-[140px] h-[140px]'>
				<Image src='/assets/image68.png' alt='order-img' fill />
			</div>

			<div className='flex-1 px-5'>
				<div className='flex justify-between xx:flex-col md:flex-row'>
					<span className='dt'>{item.name}</span>

					<span>Quantity: {item.quantity}</span>
				</div>
				<span className='mt-2 block'>₦{item?.price?.toLocaleString()}</span>
				{/* <div className='dl'>
					<span className='dt'>Side meal</span>
					<span>French fries</span>
				</div>
				<div className='dl'>
					<span className='dt'>Beverages</span>
					<span>French fries</span>
				</div> */}
				<div className='dl'>
					<span className='dt'>Extra options:</span>
					{item.comboItems?.map((combo, i) => (
						<div className='flex justify-between' key={i}>
							<span>Chicken pie (Qty: {combo.quantity})</span>{' '}
							<div>₦{combo?.price?.toLocaleString()}</div>
						</div>
					))}
				</div>
			</div>
			<hr className='w-full mt-2.5' />
		</article>
	);
};

export default OrderItem;
