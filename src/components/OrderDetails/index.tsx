'use client';
import React, { useEffect } from 'react';
import Tag from '@/atoms/Tag';
import { SimpleBtn } from '@/atoms/buttons/Button';
import './order-details.scss';
import { Icon } from '@/atoms/icon/icon';
import OrderItem from '@/molecules/OrderItem';
import { IOrderDetails, setOrderDetails } from '@/redux/reducers/order_details';
import { useDispatch, useSelector } from '@/redux/hooks';
import { orderStatus, setStages } from '@/utils/data';
import SettlementTable from '../Settlements/SettlementTable';
import DropDown from '@/atoms/DropDown';

interface Props {
	details: IOrderDetails;
}

const OrderDetailsPage: React.FC<Props> = ({ details }) => {
	const dispatch = useDispatch();
	const o_details = useSelector(state => state.orderDetails);

	useEffect(() => {
		dispatch(setOrderDetails(details));
	}, []);

	const { personalInformation, orderitems } = o_details;
	return (
		<div className='orderdetails'>
			<section className='flex flex-col'>
				<div className='page-title_div'>
					<h2 className='title'>Orders #{o_details?.orderNumber}</h2>
					<div className='btn_div opacity-[0.1]'>
						<SimpleBtn
							className='set_as'
							//disabled={o_details.status === 'PROCESSING'}
							disabled
						>
							Set as processing
						</SimpleBtn>
						<DropDown
							className='x_dropdown'
							component={
								<SimpleBtn className='ellips' disabled>
									<Icon id='ellipsis' width={20} height={20} />
								</SimpleBtn>
							}
						>
							{false && (
								<div className='w-[220px] flex flex-col p-4 gap-4 text-left'>
									{setStages.map(({ name, value }, i) => (
										<span role='button' onClick={() => {}} key={i}>
											{name}
										</span>
									))}
								</div>
							)}
						</DropDown>
					</div>
				</div>
				<span className='text-xl my-2.5'>
					₦{o_details?.amount?.toLocaleString()}
				</span>
				<span>
					Ordered by {personalInformation?.firstName}{' '}
					{personalInformation?.lastName}
				</span>
				<span className='my-2'>
					{o_details?.timeAgo} <span className='mx-1.5 mr-2'>•</span>
					<Tag
						title={o_details.status?.toLowerCase()}
						className={`${orderStatus[o_details.status]} capitalize`}
					/>
				</span>
				{o_details.status === 'COMPLETED' && false && (
					<span className='text-sm mt-2'>
						This order is complete, and a driver has been requested for
						delivery. If the status needs to be updated due to an error, press
						the ‘Options' button to make the change.
					</span>
				)}
			</section>
			<h2 className='mt-10 mb-7 text-xl text-black'> Order Details</h2>
			{orderitems?.map((item, i) => (
				<OrderItem totalAmount={o_details?.totalAmount} item={item} key={i} />
			))}
			<div className='mt-20'>
				<SettlementTable settlements={[]} />
			</div>
		</div>
	);
};

export default OrderDetailsPage;
