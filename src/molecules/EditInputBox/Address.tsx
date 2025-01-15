'use client';

import React, { useEffect, useState } from 'react';
import cx from 'classnames';
import './edit.scss';
import { SimpleBtn } from '@/atoms/buttons/Button';
import { Icon } from '@/atoms/icon/icon';
import { Input } from '@/atoms/Input/Input';
import LocationInput from '../LocationInput';
import AddressInput from '@/atoms/common/AddressInput';
import { IAddress, ObjectData } from '@/utils/interface';

interface Props {
	title?: string;
	value?: string;
	nonEditable?: boolean;
	deactivate?: boolean;
	error: string;
	ctaName?: string;
	cta?: () => void;
	onSelectLocation: (address: IAddress) => void;
	onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
	onChange: (value: string) => void;
	submitting?: boolean;
}
const EditAddressBox: React.FC<Props> = props => {
	const {
		submitting,
		ctaName = 'Request change',
		title,
		nonEditable,
		value,
		deactivate,
		error,
		onSelectLocation,
		cta,
	} = props;
	const non_Editable = nonEditable === undefined ? true : nonEditable;

	const [isNonEdit, setIsNonEdit] = useState<boolean | undefined>(
		nonEditable ?? true
	);
	useEffect(() => {
		setIsNonEdit(non_Editable);
	}, [non_Editable]);

	return (
		<div className='edit_'>
			<div className='flex justify-between items-center'>
				{title && (
					<span className='mb-1 text-black subpixel-antialiased '>
						{title}:
					</span>
				)}

				{!deactivate && (
					<>
						<SimpleBtn
							className='toggle_edit'
							type='button'
							onClick={() => setIsNonEdit(isNonEdit => !isNonEdit)}
						>
							{isNonEdit ? (
								<span className='cursor-pointer ml-1 flex'>
									Edit
									<Icon id='edit' width={20} height={20} />
								</span>
							) : (
								<>Cancel</>
							)}
						</SimpleBtn>
					</>
				)}
			</div>

			<LocationInput
				onSelectLocation={onSelectLocation}
				disabled={isNonEdit}
				className={cx({ non_edit: isNonEdit })}
				value={value}
				error={error}
				onChange={props.onChange}
				onBlur={props.onBlur}
			/>

			{!isNonEdit && (
				<SimpleBtn className='req_change' disabled={submitting} onClick={cta}>
					{ctaName}
				</SimpleBtn>
			)}
			<hr className='hr' />
		</div>
	);
};

export default EditAddressBox;
