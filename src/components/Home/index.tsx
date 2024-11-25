import React from 'react';
import './home.scss';

import { Icon } from '@/atoms/icon/icon';
import { Input } from '@/atoms/input/Input';
import { SimpleBtn } from '@/atoms/buttons/Button';
import MetricCard from '@/molecules/MetricCard';
import Tag from '@/atoms/Tag';
import Link from 'next/link';

const HomePage: React.FC = () => {
	return (
		<>
			<div className='homepage'>
				<div className='page-title_div '>
					<h2 className='title'>Home</h2>
				</div>
				<section className='metric_cards_wrapper'>
					<MetricCard
						title='Total Sales (Today)'
						value={
							<>
								<span className='font-medium'>&#8358;</span>21,490,000.00
							</>
						}
					/>
					<MetricCard title='Total Orders (Today)' value='91 Orders' />
					<MetricCard title='New Orders (Today)' value='25 orders' />
					<MetricCard title='Processing Orders (Today)' value='49 Orders' />
				</section>
				<div className='filter_div'>
					<span className='text-xl subpixel-antialiased flex-1 text-black'>
						Recent Orders
					</span>
					<Input
						name='search'
						value=''
						hasIcon
						iconSvg='search'
						className='search'
						placeholder='Search'
					/>
					<SimpleBtn className='filter'>
						<Icon id='sortp' className='mr-2' />
						<span>Sort by: Processing</span>
					</SimpleBtn>
				</div>
				<section className='orders_wrapper'>
					<article className='order_card processing'>
						<div className='flex justify-between text-black subpixel-antialiased'>
							Orders #15285057
						</div>
						<div className='my-2'>₦83,500.00</div>
						<span className='text-sm'>5 mins ago</span>
						<hr className='my-5' />
						<div className='flex justify-between text-sm mt-auto mb-5'>
							<span>Order status</span>
							<Tag title='Processing' />
						</div>
						<SimpleBtn className='set_status'>Set as processing</SimpleBtn>
					</article>
					<article className='order_card completed'>
						<div className='flex justify-between text-black subpixel-antialiased'>
							Orders #15285057
						</div>
						<div className='my-2'>₦83,500.00</div>
						<span className='text-sm'>5 mins ago</span>
						<hr className='my-5' />
						<div className='flex justify-between text-sm mt-auto mb-5'>
							<span>Order status</span>
							<Tag title='Processing' />
						</div>
						<SimpleBtn className='set_status'>Set as processing</SimpleBtn>
					</article>
					<article className='order_card new'>
						<div className='flex justify-between text-black subpixel-antialiased'>
							Orders #15285057
						</div>
						<div className='my-2'>₦83,500.00</div>
						<span className='text-sm'>5 mins ago</span>
						<hr className='my-5' />
						<div className='flex justify-between text-sm mt-auto mb-5'>
							<span>Order status</span>
							<Tag title='Processing' />
						</div>
						<SimpleBtn className='set_status'>Set as processing</SimpleBtn>
					</article>
					<article className='order_card completed'>
						<div className='flex justify-between text-black subpixel-antialiased'>
							Orders #15285057
						</div>
						<div className='my-2'>₦83,500.00</div>
						<span className='text-sm'>5 mins ago</span>
						<hr className='my-5' />
						<div className='flex justify-between text-sm mt-auto mb-5'>
							<span>Order status</span>
							<Tag title='Processing' />
						</div>
						<SimpleBtn className='set_status'>Set as processing</SimpleBtn>
					</article>
					<article className='order_card'></article>
					<article className='order_card'></article>
					<article className='order_card'></article>
				</section>
			</div>
			<div className='text-base my-4 flex justify-center text-black'>
				<Link href='/orders' className='inline-flex items-center'>
					See more{' '}
					<Icon id='caret-right' width={15} height={15} className='ml-1' />
				</Link>
			</div>
		</>
	);
};

export default HomePage;
