import React from 'react';
import { format } from 'date-fns';
import Input from '@/atoms/Input';
import Radio from '@/atoms/Radio';
import Select from '@/atoms/Input/Select';
import { SimpleBtn } from '@/atoms/buttons/Button';
import { periodFilter, settlementFilter } from '@/utils/data';
import { Icon } from '@/atoms/icon/icon';
import { ErrorMessage, useFormikContext } from 'formik';
import { ObjectData } from '@/utils/interface';

interface Props {
	isFetching?: boolean;
	active: string;
	businessName?: string;
	onSetActive: (value: string) => void;
	onCloseModal: (status: boolean) => void;
}

const FilterModal: React.FC<Props> = props => {
	const { setFieldValue, values } = useFormikContext();
	const { isFetching, active, onSetActive, onCloseModal, businessName } = props;

	const { startDate } = values as ObjectData;
	const today = format(new Date(), 'yyyy-MM-dd');

	return (
		<div className='export_wrapper'>
			<div className='flex justify-between md:items-center xx:items-start'>
				<h2 className='headings'>{`Export ${businessName} Settlements`}</h2>
				<Icon
					id='close'
					width={32}
					height={32}
					className='cursor-pointer hidden'
					//onClick={() => onCloseModal(false)}
				/>
			</div>
			<div className='toggle__div'>
				<SimpleBtn
					type='button'
					className={`tog ${active === 'period' ? 'active' : ''}`}
					onClick={() => onSetActive('period')}
				>
					Period
				</SimpleBtn>
				<SimpleBtn
					type='button'
					className={`tog ${active === 'range' ? 'active' : ''}`}
					onClick={() => onSetActive('range')}
				>
					Date Range
				</SimpleBtn>
			</div>
			{active === 'range' ? (
				<div className='date__range__wrapper'>
					<div className='w-full'>
						<div className='mt-7 mb-1 text-[#555555] font-medium'>
							Start date
						</div>
						<Input
							name='startDate'
							type='date'
							onClick={e => e.currentTarget.showPicker()}
							onChange={e => {
								setFieldValue('startDate', e.target.value);
								setFieldValue('endDate', '');
							}}
							max={today}
						/>
					</div>
					<div className='w-full'>
						<div className='mt-7 mb-1 text-[#555555] font-medium'>End date</div>
						<Input
							name='endDate'
							type='date'
							onClick={e => e.currentTarget.showPicker()}
							min={startDate ? format(new Date(startDate), 'yyyy-MM-dd') : ''}
							max={today}
							disabled={!startDate}
						/>
					</div>
				</div>
			) : (
				<>
					<div className='mt-7 mb-1 text-[#555555] font-medium'>Period</div>
					<Select
						name='filter'
						options={periodFilter}
						useFormik
						placeholder='select period'
					/>
				</>
			)}
			<div className='mb-1 text-[#555555] font-medium'>Settlement</div>
			<Select
				name='status'
				options={settlementFilter}
				useFormik
				placeholder='select settlement status'
			/>
			<ErrorMessage name='action' component='div' className='error' />
			<div className='mb-5'>
				<Radio name='action' value='email' formik /> Send to Email
			</div>
			<div>
				<Radio name='action' value='download' formik /> Download as Excel
			</div>

			<SimpleBtn className='proceed' disabled={isFetching}>
				Proceed
			</SimpleBtn>
		</div>
	);
};

export default FilterModal;
