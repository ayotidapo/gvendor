import Toggle from '@/atoms/Toggle';
import TimeInput from '@/molecules/TimeInput';
import { ErrorMessage, useFormikContext } from 'formik';
import React, { useEffect, useState } from 'react';

interface Props {
	day: string;
	checked?: boolean;
	defaultChecked?: boolean;
	index: number;
}
type Value = string | null;
const WorkingDays: React.FC<Props> = props => {
	const { day, checked, index: i, ...rest } = props;
	const { values, errors, touched, dirty, setFieldValue, setFieldTouched } =
		useFormikContext<Record<string, any>>();
	const bool = day === 'sunday' ? false : true;
	const [showDay, setShowDay] = useState(bool);

	// useEffect(() => {
	// 	if (!showDay) return;
	// 	if (Object.keys(errors).length > 0) {
	// 		setFieldTouched(`availableHours[${i}].openingTime`, true);
	// 		setFieldTouched(`availableHours[${i}].closingTime`, true);
	// 	}
	// }, [errors]);
	console.log({ errors, touched, values, dirty });

	const onSetValue = (field: string, value: Value) => {
		setFieldValue(field, value);
	};
	return (
		<section className='opening_days'>
			<div className='flex  mt-2'>
				<div className='min-w-[90px] capitalize mr-5'>{day}</div>
				<div className='flex items-center w-[120px] gap-4'>
					<Toggle
						name={`availableHours[${i}].open`}
						value={day}
						onChange={e => {
							setShowDay(showDay => !showDay);
							if (e.target.checked) {
								setFieldValue(`availableHours[${i}].open`, e.target?.value);
							} else {
								setFieldValue(`availableHours[${i}].open`, '');
							}
						}}
						defaultChecked={bool}
						{...rest}
					/>
					<span className=' -translate-y-0.5'>
						{showDay ? 'Open' : 'Closed'}
					</span>
				</div>
			</div>
			{showDay && (
				<div className='combine_input'>
					<div className='w-full'>
						<TimeInput
							name={`availableHours[${i}].openingTime`}
							value={values.availableHours[i].openingTime}
							onChange={(val: Value) =>
								onSetValue(`availableHours[${i}].openingTime`, val)
							}
						/>
					</div>
					<div className='mt-4'>to</div>
					<div className='w-full'>
						<TimeInput
							name={`availableHours[${i}].closingTime`}
							value={values.availableHours[i].closingTime}
							onChange={(val: Value) =>
								onSetValue(`availableHours[${i}].closingTime`, val)
							}
						/>
					</div>
				</div>
			)}
		</section>
	);
};

export default WorkingDays;
