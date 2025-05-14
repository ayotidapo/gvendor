import React, { useState } from 'react';
import Input from '@/atoms/Input';
import Select from '@/atoms/Input/Select';
import Modal from '@/atoms/Modal';
import { SimpleBtn } from '@/atoms/buttons/Button';
import { periodFilter, settlementFilter } from '@/utils/data';
import { Icon } from '@/atoms/icon/icon';
import { useSelector } from '@/redux/hooks';
import { useSearchParams } from 'next/navigation';

interface Props {
	isFetching?: boolean;
	active: string;
	onSetActive: (value: string) => void;
	onCloseModal: (status: boolean) => void;
}

const FilterModal: React.FC<Props> = props => {
	const { businessName } = useSelector(state => state?.vendor);
	const { isFetching, active, onSetActive, onCloseModal } = props;

	return (
		<div className='export_wrapper'>
			<div className='flex justify-between md:items-center xx:items-start'>
				<h2 className='headings'>{`Export ${businessName} Settlements`}</h2>
				<Icon
					id='close'
					width={32}
					height={32}
					className='cursor-pointer'
					onClick={() => onCloseModal(false)}
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
						/>
					</div>
					<div className='w-full'>
						<div className='mt-7 mb-1 text-[#555555] font-medium'>End date</div>
						<Input
							name='endDate'
							type='date'
							onClick={e => e.currentTarget.showPicker()}
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
			<SimpleBtn className='proceed' disabled={isFetching}>
				Proceed
			</SimpleBtn>
		</div>
	);
};

export default FilterModal;
