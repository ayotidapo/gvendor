'use client';

import PageWrapper from '@/containers/PageWrapper';
import ShipmentInfo from './ShipmentInfo';
import { format } from 'date-fns';
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
	const getType = (status: string) => {
		if (status.toLocaleLowerCase() === 'delivered' || status.toLocaleLowerCase() === 'completed') {
			return 'success';
		}
		return 'warn';
	}
	return (
		<PageWrapper pageHeader=''>
			<div className='flex item-center justify-center'>
				<div className='grid grid-cols-2'>
					<Header header={`Order #${orderData?.data?.orderNumber}`} />
					<Status type={getType(orderData?.data?.status ?? 'pending')} text={orderData?.data?.status ?? 'pending'} />
					{orderData?.data?.createdAt ? <span>Date: {format(new Date(orderData.data.createdAt), 'dd/MM/yyyy HH:mm')}</span> : null}
				</div>
			</div>
			<div className=''>
				<div className='mt-6 pb-10'>
					<ShipmentInfo
						status={orderData?.data?.status ?? ''}
						deliveyType={orderData?.data?.delivery.type ?? ''}
					//deliveryDate='2023-01-09'
					//estimatedDeliveryDate='2024-01-17'
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

								<div>
									<div>
										{orderData?.data?.orderitems?.map((item, index) => (
											<div
												className='relative flex flex-col lg:flex-row py-6 space-x-10'
												key={index}
											>
												<div className='flex flex-col md:flex-row w-full'>
													<div className='flex w-full flex-col mt-4 lg:mt-0'>
														<div className='flex flex-col md:flex-row md:justify-between'>
															<div>
																<div
																	className={`mb-1 text-lg`}
																>
																	{item.name}
																</div>
																<div
																	className={`text-lg font-bold`}
																>
																	{formatCurrency(item.price)}
																</div>
															</div>
															<div className='text-sm my-3 sm:my-1'>
																Quantity: {item.quantity}
															</div>
														</div>
														<div>
															{item.variants && item.variants.length > 0 && (
																<div className='text-md mt-2'>
																	{item.variants.map((variant, index) => (
																		<>
																			<p className='font-bold text-black'>
																				{variant.variantId.name}
																			</p>
																			<div
																				className='font-normal text-secondary-black'
																				key={index}
																			>
																				{variant.value}
																			</div>
																		</>
																	))}
																</div>
															)}
															{item.comboItems && item.comboItems.length > 0 && (
																<div className='flex flex-col text-md mt-2'>
																	<p className='font-bold'>Extra Options</p>
																	{item.comboItems.map((comboItem, index) => (
																		<div
																			className='font-normal flex justify-between text-secondary-black'
																			key={index}
																		>
																			{comboItem.name} (Qty: {comboItem.quantity})
																			<span>
																				{formatCurrency(comboItem.price)}
																			</span>
																		</div>
																	))}
																</div>
															)}
														</div>
													</div>
												</div>
											</div>
										))}
									</div>

								</div>

								{/*<div className='text-secondary-black pt-2'>
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
								</div>*/}
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
