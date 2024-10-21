import { Recoleta } from '@/fonts/font';
import clsx from 'clsx';
import { format } from 'date-fns';
import { useState, useEffect } from 'react';
import { CheckCircle2, Clock3Icon } from 'lucide-react';

const ShipmentInfo = ({
	status,
	deliveyType,
	deliveryDate,
	estimatedDeliveryDate,
	showHeader = true,
}: {
	status: string;
	deliveyType: string;
	deliveryDate?: string;
	estimatedDeliveryDate?: string;
	showHeader?: boolean;
}) => {
	const deliverySteps = [
		{
			name: 'CREATED',
			value: 'Order placed',
			writeUp: 'Your order details have been received.',
			done: false,
		},
		{
			name: 'PROCESSING',
			value: 'Processing',
			writeUp: 'Your order is being organized.',
			done: false,
		},
		{
			name: 'PREPARING_TO_SHIP',
			value: 'Preparing to send',
			writeUp: 'Delivery driver is picking up your package.',
			done: false,
		},
		{
			name: 'SHIPPED',
			value: 'Sent',
			writeUp: 'Your package is on its way to you.',
			done: false,
		},
		{
			name: 'DELIVERED',
			value: 'Delivered',
			done: false,
			writeUp: 'Your package has been delivered.',
		},
	];

	const pickupSteps = [
		{
			name: 'CREATED',
			value: 'Order placed',
			writeUp: 'Your order details have been received.',
			done: false,
		},
		{
			name: 'PROCESSING',
			value: 'Processing',
			writeUp: 'Your order is being organized.',
			done: false,
		},
		{
			name: 'PREPARING_TO_SHIP',
			value: 'Preparing for pickup',
			writeUp: 'Your package is heading to the pickup center.',
			done: false,
		},
		{
			name: 'SHIPPED',
			value: 'Ready for pickup',
			writeUp: 'Your package is ready for pickup',
			done: false,
		},
		{
			name: 'DELIVERED',
			value: 'Picked Up',
			writeUp: 'Your package has been picked up.',
			done: false,
		},
	];
	const [percentage, setPercentage] = useState(0);
	const [steps, setSteps] = useState(
		deliveyType === 'PICKUP' ? pickupSteps : deliverySteps
	);
	const [currentStepIndex, setCurrentStepIndex] = useState(0);

	useEffect(() => {
		const index = steps.findIndex(step => step.name === status);
		setCurrentStepIndex(index + 1);
		const updatedSteps = steps.map((step, i) => {
			if (i <= index || status === 'DELIVERED') {
				return { ...step, done: true };
			}
			return step;
		});
		setSteps(updatedSteps);
		setPercentage(index === 4 ? 100 : (index / steps.length) * 100 + 10);
	}, [status]);

	return (
		<div>
			{showHeader && (
				<h5 className={`${Recoleta.className} text-xl font-extrabold mb-2`}>
					Delivery information
				</h5>
			)}
			<p className='text-sm'>
				{deliveryDate && (
					<div>
						Delivered on {format(new Date(deliveryDate), 'eeee MMM do')}
					</div>
				)}
				{estimatedDeliveryDate && !deliveryDate && (
					<div>
						This item will arrive on{' '}
						{format(new Date(estimatedDeliveryDate), 'eeee MMM do')}
					</div>
				)}
			</p>
			<div className='w-full mt-4'>
				<div className='w-full mb-4'>
					<div
						className='h-2 rounded-lg bg-[#449400]'
						style={{ width: `${percentage}%` }}
					></div>
				</div>
				<div className='max-w-screen overflow-scroll flex flex-col no-scrollbar text-default-gray mt-4'>
					<div className='flex flex-row space-x-4 justify-between md:space-x-8 text-xs'>
						{steps.map((step, i) => (
							<div
								key={i}
								className={clsx('p-3 rounded-lg min-w-[12rem] w-48', {
									'bg-[#ecf3e1]': step.done,
									'border-2 border-black bg-white':
										status === step.name && !step.done,
									'border border-default-gray-3':
										status !== step.name &&
										!step.done &&
										i !== currentStepIndex,
									'border border-default-gray': i === currentStepIndex,
								})}
							>
								<div className='flex justify-between items-start'>
									<p className='font-bold text-black'>{step.value}</p>
									<div>
										{step.done ? (
											<CheckCircle2
												stroke='#ecf3e1'
												fill='#449400'
												className='h-6 w-6'
											/>
										) : (
											<Clock3Icon
												className={`h-5 w-5 ${
													status === step.name
														? 'text-black'
														: 'text-default-gray'
												}`}
											/>
										)}
									</div>
								</div>

								<p className='text-sm text-secondary-black'>{step.writeUp}</p>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ShipmentInfo;
