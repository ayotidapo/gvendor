'use client';

import React, { useEffect, useState } from 'react';
import cx from 'classnames';
import './edit.scss';
import { SimpleBtn } from '@/atoms/buttons/Button';
import { Icon } from '@/atoms/icon/icon';
import { Input } from '@/atoms/input/Input';

interface Props {
	type?: 'text' | 'password' | 'textarea' | 'date';
	rows?: number;
	textarea?: boolean;
	title?: string;
	multiple?: boolean;
	nonEditable?: boolean;
}
const EditInputBox: React.FC<Props> = props => {
	const { type, rows, textarea, multiple, title, nonEditable } = props;
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
				<span className='mb-1 text-black subpixel-antialiased '>{title}:</span>

				{!multiple && (
					<>
						<SimpleBtn
							className='toggle_edit'
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
			<Input
				name='search'
				type={type}
				rows={isNonEdit ? 1 : rows}
				value='Jollof Rice and 6 Chicken Wings'
				className={cx({ non_edit: isNonEdit, textarea })}
				autoFocus={!isNonEdit}
				readOnly={isNonEdit}
			/>

			{!isNonEdit && (
				<SimpleBtn className='req_change'>Request change</SimpleBtn>
			)}
			<hr className='border-divider-gray border-[0.5px]' />
		</div>
	);
};

export default EditInputBox;

type RestrictedUser = Omit<Props, 'password' | 'email'>;
interface IProps extends Props {
	children: React.FC;
}
const EditGroupInputBox: React.FC<IProps> = props => {
	const { children } = props;

	const [isNonEdit, setIsNonEdit] = useState<boolean>(true);

	return (
		<div className='edit_'>
			<div className='flex justify-between items-center mb-10'>
				<h2 className='text-xl text-black   subpixel-antialiased'>
					Settlement Bank Account
				</h2>
				<SimpleBtn
					className='toggle_edit'
					onClick={() => setIsNonEdit(editable => !editable)}
				>
					{isNonEdit ? (
						<span className={`cursor-pointer ml-1 flex`}>
							Edit
							<Icon id='edit' width={20} height={20} />
						</span>
					) : (
						<>Cancel</>
					)}
				</SimpleBtn>
			</div>

			<div className='group_edit_div'>
				{typeof children === 'function'
					? (children as Function)({ isNonEdit })
					: children}
			</div>

			{!isNonEdit && (
				<SimpleBtn className='req_all_change'>Request change</SimpleBtn>
			)}
			<hr className='border-divider-gray border-[0.5px]' />
		</div>
	);
};

export { EditGroupInputBox };
