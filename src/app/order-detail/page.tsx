'use client';

import PageWrapper from '@/containers/PageWrapper';
import ShipmentInfo from './ShipmentInfo';
import { formatCurrency } from '@/helpers';
import { Header } from '@/components/typography/Header';
import { Status } from '@/components/cards/StatusTag';

const data = [
	{
		name: 'Jollof rice and 6 Chicken',
		price: '₦48,500.00',
		quantity: '5',
	},
	{
		name: 'Wireless headphone with noise cancellation',
		price: '₦48,500.00',
		quantity: '1',
	},
];

const OrderDetails = () => {
	return (
		<PageWrapper pageHeader=''>
			<div className='flex item-center justify-center'>
				<div className='grid grid-cols-2'>
					<Header header={'Order #15285047'} />
					<Status type={'success'} text={'Fulfilled'} />
					<span>Date: 14/08/2023</span>
					<span> 3:01PM</span>
				</div>
			</div>
			<div className=''>
				<div className='mt-6 pb-10'>
					<ShipmentInfo
						status={'PROCESSING'}
						deliveyType={'PROCESSING'}
						deliveryDate='2023-01-09'
						estimatedDeliveryDate='2024-01-17'
					/>
				</div>
				<hr />
				<div className='flex flex-col pt-10 md:flex-row gap-10'>
					<div className='basis-2/3'>
						{/* Product Details */}
						<div className='bg-white border border-[#EAEAEA] shadow-sm p-4 rounded-md'>
							<div>
								<div>
									<Header header={'Product Details'} />
								</div>
								{data.map((item, index) => (
									<div key={index} className='grid grid-cols-3 space-y-2 pt-4 gap-5'>
										<div className='text-sm' key={item.name}>
											{item.name}
										</div>
										<div className='text-sm'>{item.price}</div>
										<div className='text-sm'>{item.quantity}</div>
									</div>
								))}

								<div className='text-secondary-black pt-2'>
									<label>Color: </label>
									<span>black</span>
								</div>
								<div className='pt-2 w-full lg:w-1/3 space-y-2'>
									<div className='space-y-4 text-sm mt-3'>
										<div className='flex justify-between'>
											Subtotal
											<span className='text-secondary-black'>
												{formatCurrency('177500')}
											</span>
										</div>
										<div className='flex justify-between'>
											Delivery
											<span className='text-secondary-black'>
												{formatCurrency(400)}
											</span>
										</div>
										<div className='flex justify-between'>
											Discount
											<span className='text-secondary-black'>
												{formatCurrency(820)}
											</span>
										</div>{' '}
										<div className='flex justify-between'>
											Service fee
											<span className='text-secondary-black'>
												{formatCurrency(220)}
											</span>
										</div>
										<div className='flex justify-between pt-2 border-t border-gray-300'>
											Total
											<span className='text-secondary-black'>
												{formatCurrency(175560)}
											</span>
										</div>
									</div>
								</div>
							</div>
						</div>
						{/* Payment Method */}
						<div className='pt-10'>
							<div className='bg-white border border-[#EAEAEA] shadow-sm p-4 rounded-md'>
								<div className='grid grid-cols-2 gap-4'>
									<div className='space-y-4'>
										<Header header={'Payment Method'} />
										<span className='space-y-4'>Good Wallet</span>
										<div className='flex items-center justify-between'>
											<div>
												<label>Total:</label>
												<span> ₦175,560.00</span>
											</div>
											<div>
												<Status type={'success'} text={'paid'} />
											</div>
										</div>
									</div>
									{/* Billing Address */}
									<div className='space-y-4'>
										<Header header={'Billing Address'} />
										<div className='space-y-4'>
											<div>
												<span>Shadow Unique</span>
											</div>
											<div>
												<span>
													15 Sasegbon St, Ikeja GRA, Ikeja 101233, Lagos
												</span>
											</div>
											<div>
												<label>Phone:</label>
												<span> +2348019284726</span>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className='basis-1/3 space-y-6'>
						{/* Customer Notes */}
						<div className='bg-white border border-[#EAEAEA] shadow-sm p-4 rounded-md'>
							<div className='space-y-4'>
								<Header header={'Customer Notes'} />
								<p>
									If not home, kindly leave the package with my neighbor at
									Apartment 12B. Also, could you make sure the items are packed
									securely? Thank you!
								</p>
							</div>
						</div>

						{/* Delivery Information */}
						<div className='bg-white border border-[#EAEAEA] shadow-sm p-4 rounded-md space-y-2'>
							<div className='space-y-2'>
								<Header header={'Delivery Information'} />
								<div className='space-y-6'>
									<div>
										<span>Shadow Unique</span>
									</div>
									<div>
										<span>15 Sasegbon St, Ikeja GRA, Ikeja 101233, Lagos</span>
									</div>
									<div>
										<label>Color: </label>
										<span>black</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div></div>
			</div>
		</PageWrapper>
	);
};

export default OrderDetails;
