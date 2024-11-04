import Button from '@/components/buttons/Button';
import Switch from '@/components/switch/Switch';
import { Header } from '@/components/typography/Header';
import {
	useGetProfileQuery,
	useUpdateProfileMutation,
} from '@/redux/profile/profile.slice';
import { useEffect, useState } from 'react';

const WorkhoursPage = () => {
	const { data: profile } = useGetProfileQuery();
	const [updateProfile] = useUpdateProfileMutation();

	const [availableHours, setAvailableHours] = useState<{
		[key: string]: { open: boolean; openingTime: string; closingTime: string };
	}>({});

	useEffect(() => {
		if (profile) {
			setAvailableHours(profile.availableHours);
		}
	}, [profile]);

	return (
		<div className='pt-6'>
			<span>
				<Header header={'Set standard hours'} />
			</span>
			<span className='block mt-2'>
				Configure the standard hours of operation for this business
			</span>
			<div className='mt-6'>
				{profile?.availableHours
					? Object.entries(availableHours).map(([day, availableHours]) => (
							<div
								key={day}
								className='grid min-h-14 grid-cols-3 sm:grid-cols-4 lg:grid-cols-7 gap-4 items-center mb-4 border-b border-default-gray-2 pb-4 lg:border-transparent'
							>
								<p className='font-bold capitalize'>{day}</p>
								<div className='flex items-center space-x-2'>
									<Switch
										enabled={availableHours.open}
										setEnabled={value => {
											setAvailableHours(prevHours => ({
												...prevHours,
												[day]: {
													...prevHours[day],
													open: value,
												},
											}));
										}}
									/>
									<span>{availableHours.open ? 'Open' : 'Closed'}</span>
								</div>
								{availableHours.open && (
									<div className='col-span-3 flex space-x-4 items-center'>
										<TimeInput
											value={availableHours.openingTime}
											onChange={value => {
												setAvailableHours(prevHours => ({
													...prevHours,
													[day]: {
														...prevHours[day],
														openingTime: value,
													},
												}));
											}}
										/>
										<span>To</span>
										<TimeInput
											value={availableHours.closingTime}
											onChange={value => {
												setAvailableHours(prevHours => ({
													...prevHours,
													[day]: {
														...prevHours[day],
														closingTime: value,
													},
												}));
											}}
										/>
									</div>
								)}
							</div>
						))
					: null}
			</div>

			<div className='mt-6 w-[143px]'>
				<Button
					onClick={() => {
						// loop through availableHours and remove opening time and closing time if open is false
						const updatedHours = Object.entries(availableHours).reduce(
							(acc, [day, hours]) => {
								if (!hours.open) {
									return {
										...acc,
										[day]: {
											open: false,
										},
									};
								} else {
									return {
										...acc,
										[day]: hours,
									};
								}
							},
							{}
						);
						updateProfile({ availableHours: updatedHours });
					}}
					label={'Save Schedule'}
				/>
			</div>
		</div>
	);
};

const TimeInput = ({
	value,
	onChange,
}: {
	value: string;
	onChange: (value: string) => void;
}) => {
	return (
		<input
			onChange={e => onChange(e.target.value)}
			value={value}
			type='time'
			className='bg-transparent border border-default-gray rounded-lg p-4 text-secondary-black md:w-52 md:h-14'
		/>
	);
};

export default WorkhoursPage;
