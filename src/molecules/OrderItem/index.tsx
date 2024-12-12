import React from 'react';
import Image from 'next/image';
import './order-item.scss';

interface Props {}

const OrderItem: React.FC<Props> = () => {
	return (
		<article className='order_item'>
			<div className='relative w-[140px] h-[140px]'>
				<Image src='/assets/image68.png' alt='order-img' fill />
			</div>
			<div className='flex-1 px-5'>
				<div className='flex justify-between xx:flex-col md:flex-row'>
					<span className='dt'>Egg Sandwich With Side Fries</span>

					<span>Quantity: 2</span>
				</div>
				<span className='mt-2 block'>₦8,500.00</span>
				<div className='dl'>
					<span className='dt'>Side meal</span>
					<span>French fries</span>
				</div>
				<div className='dl'>
					<span className='dt'>Beverages</span>
					<span>French fries</span>
				</div>
				<div className='dl'>
					<span className='dt'>Extra options:</span>
					<div className='flex justify-between'>
						<span>Chicken pie (Qty: 2)</span> <div>₦500.00</div>
					</div>
				</div>
			</div>
			<hr className='w-full mt-2.5' />
		</article>
	);
};

export default OrderItem;
