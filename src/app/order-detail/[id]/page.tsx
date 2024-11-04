'use client';

import PageWrapper from '@/containers/PageWrapper';
import ShipmentInfo from './ShipmentInfo';
import { formatCurrency } from '@/helpers';
import { Header } from '@/components/typography/Header';
import { Status } from '@/components/cards/StatusTag';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import { useGetOrderDetailMutation } from '@/redux/orders/orders.slice';

const OrderDetails = () => {
	const { id } = useParams();
	const [getOrderDetail, { data: orderData }] = useGetOrderDetailMutation();

	useEffect(() => {
		getOrderDetail(id as string);
	}, [id]);
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
						status={orderData?.data?.status ?? ''}
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
								{/*{orderData?.data?.map((item, index) => (
									<div
										key={index}
										className='grid grid-cols-3 space-y-2 pt-4 gap-5'
									>
										<div className='text-sm' key={item.name}>
											{item.name}
										</div>
										<div className='text-sm'>{item.price}</div>
										<div className='text-sm'>{item.quantity}</div>
									</div>
								))}*/}

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
					</div>

					{/*<div className='basis-1/3 space-y-6'>
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
					</div>*/}
				</div>
				<div></div>
			</div>
		</PageWrapper>
	);
};

export default OrderDetails;
