'use client';

import React, { useEffect, useState } from 'react';
import cx from 'classnames';
import './edit.scss';
import { SimpleBtn } from '@/atoms/buttons/Button';
import { Icon } from '@/atoms/icon/icon';

import { PhoneField } from '@/atoms/PhoneInput';
import { useFormikContext } from 'formik';
import { ObjectData } from '@/utils/interface';

interface Props {
	title?: string;
	nonEditable?: boolean;
	deactivate?: boolean;
	name: string;
	ctaName?: string;
	cta?: () => void;
	submitting?: boolean;
	onChange: (value: string) => void;
	onBlur: (e: React.FocusEvent<HTMLElement, Element>) => void;
}
const EditPhoneBox: React.FC<Props> = props => {
	const {
		submitting,
		ctaName = 'Request change',
		name,
		title,
		nonEditable,
		deactivate,
		onBlur,
		onChange,
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

			<PhoneField
				name={name}
				onChange={onChange}
				onBlur={onBlur}
				className={cx({ non_edit: isNonEdit })}
				noEdit={isNonEdit}
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

export default EditPhoneBox;
